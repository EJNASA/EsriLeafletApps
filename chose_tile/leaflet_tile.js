const gsi= L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
});
const gsi_pale= L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
});
const gsi_blank= L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
});
const gsi_photo= L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
});

const osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{  attribution: "<a href='https://openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors" }); 


TileLayers={
    "国土地理院地図":gsi,
    "国土地理院地図淡色":gsi_pale,
    "国土地理院地図黒白":gsi_blank,
    "国土地理院地図航空写真":gsi_photo,
    "openstreetmap":osm
};

const map = L.map('map', {
    minZoom: 2,
    layers:gsi
  }).setView([35.362752, 138.729858], 12);

L.control.layers(TileLayers).addTo(map);
