const apiKey="YOUR_API_KEY";
const basemapEnum = "ArcGIS:Navigation";

const map = L.map('map', {
    minZoom: 2,
    zoomControl:false
});

L.control.zoom( { position: 'topright' } ).addTo( map );

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);

// マーカーデザイン
const divIcon1 = L.divIcon({
  html: '<calcite-icon icon="number-circle-1" /></calcite-icon>',
  className: 'divicon',
  iconSize: [25,25],
  popupAnchor: [0, 0]
});

const divIcon2 = L.divIcon({
  html: '<calcite-icon icon="number-circle-2" /></calcite-icon>',
  className: 'divicon',
  iconSize: [25,25],
  popupAnchor: [0, 0]
});

function geocoder(step){
  const searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    placeholder: '住所または場所の名前を入力',
    title:'住所検索',
    collapseAfterResult:false,
    useMapBounds: false,
    providers: [L.esri.Geocoding.arcgisOnlineProvider({
      apikey: apiKey
    })]
  }).addTo(map);
  // 検索結果最上位を基本的に取得
  searchControl.on('results', function (data) {
  currentStep=step;
  if(data.results){
    coordinates = data.results[0].latlng;
    addtostoppoint(data.results[0].text);
  }    
  });
return searchControl;
}

function addtostoppoint(pointname){ // currentstep を引数に設定(optionの引数)
  if (currentStep === "start") {
    startLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
    endLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
    routeLines.clearLayers(); // 前のレイヤーがあったらクリアする
    L.marker(coordinates,{icon:divIcon1}).addTo(startLayerGroup).bindPopup(pointname); // スタート地点にマーカーを作成
    startCoords = [coordinates.lng,coordinates.lat];
    startpoint=pointname;
    currentStep = "end";
  } else {
    L.marker(coordinates,{icon:divIcon2,popup:pointname}).addTo(endLayerGroup).bindPopup(pointname); // ゴール地点にマーカーを作成
    endCoords = [coordinates.lng,coordinates.lat]; 
    endpoint=pointname;
    currentStep = "start"; 
  }

  if (startCoords && endCoords) {
    searchRoute(); // startとendができたらルート検索をかける
  }
 }

 function add_direction(str,startpoint,endpoint){
  str=str.replace("Location 1",startpoint);
  str=str.replace("Location 2",endpoint);
  str_split=str.split("<br>");
  direction=str_split[0]+"<br><hr>";
  for(i=1; i<str_split.length; i++){
    if(str_split[i].match(/[左右]|U/g)){
      str_split[i]=str_split[i].replace("左",'<br><calcite-icon icon="left" /></calcite-icon>左')
      str_split[i]=str_split[i].replace("右",'<br><calcite-icon icon="right" /></calcite-icon>右')
      str_split[i]=str_split[i].replace("U ターン",'<br><calcite-icon icon="u-turn-right" /></calcite-icon>Uターン')
    }else{
      str_split[i]='<br><calcite-icon icon="compass" /></calcite-icon>'+str_split[i];
  }
    direction+=str_split[i]+"<br><hr>";
}
  return direction;
}

//const directions=document.getElementsByTagName("calcite-accordion-item")[1];
const search=document.getElementById("geocode");
const directions=document.getElementById("direction");

 // マップ上の検索結果をリセットするために Layer Group を作成
const startLayerGroup = L.layerGroup().addTo(map);
const endLayerGroup = L.layerGroup().addTo(map);

 // マップ上の検索結果をリセットするために Layer Group for route lines を作成
const routeLines = L.layerGroup().addTo(map);

let currentStep = "start";
let startCoords, startpoint, endCoords, endpoint;

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
      console.log(response);
       routeLines.clearLayers(); // 前作ったやつを消す
       geojson=L.geoJSON(response.routes.geoJson).addTo(routeLines); // geojson 化したルートを表示
       const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br>");
       directions.innerHTML = add_direction(directionsHTML,startpoint,endpoint);
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
start_search=geocoder("start");
end_search=geocoder("end");

input_el=document.getElementsByTagName("input");

start_container=start_search.getContainer();
search.appendChild(start_container); 
end_container=end_search.getContainer();
search.appendChild(end_container); 

start_container.click();  
end_container.click();

var geocodeService = L.esri.Geocoding.geocodeService({
  apikey: apiKey 
});

// クリックした場所の位置情報を返す
map.on("click", (e) => {
  coordinates = e.latlng;
  geocodeService.reverse().latlng(coordinates).run(function (error, result) {
    if (error) {
      return;
    }
    if(result.address["Match_addr"]=="日本"){
      address=coordinates.lat+","+coordinates.lng;
    }else{
      address=result.address["Match_addr"]
    }
    addtostoppoint(address);
    if(currentStep=="start"){
      input_el[1].value=address;
    }else{
      input_el[0].value=address;
    }
  })
  
});

map.on("load",function() {
  loading=document.getElementsByTagName("calcite-loader")[0];
  loading.removeAttribute("active");
});

map.setView([35.362752, 138.729858], 12);
