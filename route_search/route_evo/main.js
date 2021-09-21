//const apiKey="YOUR_API_KEY";
const basemapEnum = "ArcGIS:Navigation";

const map = L.map('map', {
    minZoom: 2
}).setView([35.362752, 138.729858], 12);

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);

function addtostoppoint(){
  if (currentStep === "start") {
    startLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
    endLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
    routeLines.clearLayers(); // 前のレイヤーがあったらクリアする
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

const directions=document.getElementById("directions");

 // マップ上の検索結果をリセットするために Layer Group を作成
const startLayerGroup = L.layerGroup().addTo(map);
const endLayerGroup = L.layerGroup().addTo(map);

 // マップ上の検索結果をリセットするために Layer Group for route lines を作成
const routeLines = L.layerGroup().addTo(map);

let currentStep = "start";
let startCoords, endCoords;

// ルート検索の関数
function searchRoute() { 
   // arcgis-rest-js のサービスを利用するために API キーを指定
   const authentication = new arcgisRest.ApiKey({
     key: apiKey
   });
      arcgisRest
      //　ルート検索の開始
     .solveRoute({
       stops: [startCoords, endCoords], 
       endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
       authentication,
       params:{directionsLanguage:"ja"} // 使用言語を日本語に変更
       })
       // 結果の表示
     .then((response) => {
       routeLines.clearLayers(); // 前作ったやつを消す
       geojson=L.geoJSON(response.routes.geoJson).addTo(routeLines); // geojson 化したルートを表示
       console.log(response.routes.geoJson.features)
       feature=response.routes.geoJson.features[0].geometry.coordinates;
       console.log(feature.length/2|0);
       console.log(feature[feature.length/2|0]);
       fly_sen=feature[feature.length/2|0];
       map.flyTo( [fly_sen[1],fly_sen[0]], 9); // 検索後その位置に飛びたい
       // '<calcite-icon icon="arrow-bold-up" /></calcite-icon>' + このアイコンで
       const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
       directions.innerHTML = directionsHTML;
       startCoords = null; // 最後にスタート、ゴール地点の情報を消す
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
        addtostoppoint();
    }    
});

// クリックした場所の位置情報を返す
map.on("click", (e) => {
  coordinates = e.latlng;
  addtostoppoint();
});
