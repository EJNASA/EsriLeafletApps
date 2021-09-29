//const apiKey="YOUR_API_KEY";
const basemapEnum = "ArcGIS:Navigation";

const map = L.map('map', {
    minZoom: 2
}).setView([35.362752, 138.729858], 12);

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);

// ルート検索をしたい地点の取得
function addstoppoint(){
  if (currentStep === "start") {
    startLayerGroup.clearLayers(); 
    endLayerGroup.clearLayers(); 
    routeLines.clearLayers(); 
    L.marker(coordinates).addTo(startLayerGroup); // スタート地点にマーカーを作成
    startCoords = [coordinates.lng,coordinates.lat]; 
    currentStep = "end"; 
  } else {
    L.marker(coordinates).addTo(endLayerGroup); // ゴール地点にマーカーを作成
    endCoords = [coordinates.lng,coordinates.lat]; 
    currentStep = "start"; 
  }

  if (startCoords && endCoords) {
    searchRoute(); // startとendができたらルート検索をかける
  }
 }


 // Layer Group for start/end-points
const startLayerGroup = L.layerGroup().addTo(map);
const endLayerGroup = L.layerGroup().addTo(map);

 // マップ上の検索結果をリセットするために Layer Group for route lines を作成
const routeLines = L.layerGroup().addTo(map);

let currentStep = "start";
let startCoords, endCoords;

function searchRoute() {
   // Create the arcgis-rest-js authentication object to use later.
   const authentication = new arcgisRest.ApiKey({
     key: apiKey
   });
   // make the API request
   arcgisRest
     .solveRoute({
       stops: [startCoords, endCoords], 
       endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
       authentication,
       params:{directionsLanguage:"ja"} // 使用言語を日本語に変更
       })
       // 結果の表示
     .then((response) => {
       routeLines.clearLayers(); // 前回の結果をリセット
       L.geoJSON(response.routes.geoJson).addTo(routeLines); 
       const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
       directions.innerHTML = directionsHTML;
       startCoords = null; // 最後にスタート、ゴール地点の位置情報を消す
       endCoords = null;
     })
     // エラー時の表示
     .catch((error) => {
       console.error(error);
       alert("ルート検索に失敗しました");
     });
}

// 住所、場所検索
const searchControl = L.esri.Geocoding.geosearch({
    position: 'topleft',
    placeholder: '住所または場所の名前を入力',
    useMapBounds: false,
    providers: [L.esri.Geocoding.arcgisOnlineProvider({
      apikey: apiKey
    })]
}).addTo(map);
  
// 検索結果最上位を基本的に取得
searchControl.on('results', function (data) {
    if(data.results){
        coordinates = data.results[0].latlng;
        addstoppoint();
    }    
});

// クリックした場所の位置情報を返す
map.on("click", (e) => {
  coordinates = e.latlng;
  addstoppoint();
});


