// Add a DOM Node to display the text routing directions
 const directions = document.createElement("div");
 directions.id = "directions";
 //directions.innerHTML = "ルート検索をしたい場所のスタート地点とゴール地点をクリックしてください";
 document.body.appendChild(directions);

 // Layer Group for start/end-points
 const startLayerGroup = L.layerGroup().addTo(map);
 const endLayerGroup = L.layerGroup().addTo(map);

 // Layer Group for route lines
 const routeLines = L.layerGroup().addTo(map);

 let currentStep = "start";
 let startCoords, endCoords;

function updateRoute() {
   // Create the arcgis-rest-js authentication object to use later.
   const authentication = new arcgisRest.ApiKey({
     key: apiKey
   });
   console.log(startCoords);
   // make the API request
   arcgisRest
     .solveRoute({
       stops: [startCoords, endCoords], // クリックした地点でルート検索
       endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
       authentication
     })
     .then((response) => {
       // Show the result route on the map.
       console.log(response);
       routeLines.clearLayers(); // 前作ったやつを消す
       L.geoJSON(response.routes.geoJson).addTo(routeLines); // geojson 化したルートを表示
        console.log(response);
       // Show the result text directions on the map.
       const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
       directions.innerHTML = directionsHTML;
       startCoords = null; // 最後にスタート、ゴール地点の情報を消す
       endCoords = null;
     })
     .catch((error) => {
       console.error(error);
       alert("There was a problem using the route service. See the console for details.");
     });
}

 // When the map is clicked, get the coordinates, store the start or end
 // state, and pass them to the updateRoute function which calls the REST endpoint.
map.on("click", (e) => {
   const coordinates = [e.latlng.lng, e.latlng.lat];

   if (currentStep === "start") {
     startLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
     endLayerGroup.clearLayers(); // 前のレイヤーがあったらクリアする
     routeLines.clearLayers(); // 前のレイヤーがあったらクリアする
     L.marker(e.latlng).addTo(startLayerGroup); // クリックした地点の位置情報にマーカー
     startCoords = coordinates; // クリックした位置情報を格納
     currentStep = "end"; // 終わったら次のクリック時にゴール地点を設定するように変数を変更
   } else {
     L.marker(e.latlng).addTo(endLayerGroup); // currentStep フラグが end の時はクリックしたらゴール地点にマーカーを置く
     endCoords = coordinates; // クリックした位置情報を格納
     currentStep = "start"; // 終わったら次のクリック時にスタート地点を設定するように変数を変更
   }

   if (startCoords && endCoords) {
     updateRoute(); // startとendができたらルート検索をかける
   }
 });