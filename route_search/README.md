# ルート検索アプリを作成
Leaflet は、メジャーで軽量なオープンソースのマッピング JavaScript ライブラリです。Leaflet は主に地図の表示や地図内に表示されるレイヤーの処理などを得意としています。
Esri Leaflet は、Esri のロケーションサービスが使えるオープンソースの Leaflet プラグインとなっています。

今回は、Leaflet と Esri Leaflet 及び、同じくオープンソースとして開発されている ArcGIS REST JS を使ったルート検索アプリを作成します。

## API キーの作成と設定
始めに ルート検索と地名の検索の機能を使用するうえで必要となる開発者アカウントと API キーを作成します。

「[開発者アカウントの作成](https://esrijapan.github.io/arcgis-dev-resources/guide/get-dev-account/)」と「[API キーの取得](https://esrijapan.github.io/arcgis-dev-resources/guide/get-api-key/)」を参照に作成を行ってください。

「API キーの取得」が完了しましたら、以下の流れでロケーションサービスであるジオコーディングとルーティングを使用できるように設定します。

1. 開発者アカウントにログインし、ダッシュボードから API キーの設定編集ページに移動する

ダッシュボードから API キーの管理画面へ移動
[イメージ](../images/dashboard.png)

API キーの管理画面。使用する API キーの Edit API Key をクリックし、API キーの設定編集ページへ。
[イメージ](../images/editapi.png)

2. API キーで使用するロケーションサービスを設定

ページ中部の Location services の欄から Configure services をクリック
[イメージ](../images/config.png)

この中から Geocoding (not stored) と Routing にチェックを付ける
[イメージ](../images/location.png)

## マップの表示

マップを表示する際の手順を記す。EsriLeaflet を使用した HTML と JavaScrpt のコードを作成。

1. HTML 
Leaflet js と Esri Leaflet の参照を含む HTML のコードを記入

```HTML
<html>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <title>Esri Leaflet</title>

        <!-- Load Leaflet from CDN -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossorigin=""></script>

        <!-- Load Esri Leaflet from CDN -->
        <script src="https://unpkg.com/esri-leaflet@3.0.0/dist/esri-leaflet.js"></script>
        <script src="https://unpkg.com/esri-leaflet-vector@3.0.0/dist/esri-leaflet-vector.js"></script>
        <style>
            body { margin:0; padding:0; }
            #map {
                position: absolute;
                top:0;
                bottom:0;
                right:0;
                left:0;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                color: #323232;
            }
        </style>

    </head>

    <body>
        <div id="map"></div>
        <div id="directions">ルート検索をしたい場所を左の検索ボタンで入力して選んでください</div>
        <script type="text/javascript" src="main.js"></script>
    </body>

</html>
```

2. Javascript 
地図を描画するだけの JavaScript のコード

```JavaScript
const apiKey="YOUR_API_KEY";
const basemapEnum = "ArcGIS:Navigation";

const map = L.map('map', {
    minZoom: 2
}).setView([35.362752, 138.729858], 12);

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);
```

地図の描画をした様子
[イメージ](../images/map_only.png)

## 地名の検索の導入

1. HTML にリンクを貼る
2. JavaScript のコードを追加

## ルート検索の導入

1. HTML にリンクを貼る( ArcGIS REST JS )
2. JavaScript のコードを追加(クリックしたらルート検索するやつ)

## 地名検索をルート検索に反映

1. 地名検索後の挙動にルート検索の挙動を加える

## 発展形

calcite design でモダンなデザインにしていきたい的な。