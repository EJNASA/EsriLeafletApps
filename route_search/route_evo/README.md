# Calcite Design System によるデザイン
[ハンズオン](../README.md)では、ルート検索の基本的な機能を作ってきました。ここでは発展形として [Calcite Design System](https://developers.arcgis.com/calcite-design-system/) を使ったアプリのデザインのサンプルコードを用意しています。
ハンズオンでは使わなかったいくつかの機能やベースマップも使っています。ここで使用している機能の詳細については、以下のリストからご確認ください。

- [Calcite Design System](https://developers.arcgis.com/calcite-design-system/)
    - [calcite-loader](https://developers.arcgis.com/calcite-design-system/components/loader/):`map` オブジェクトがロードされるまで表示されるローダーとして使用しています。
    - [calcite-accordion](https://developers.arcgis.com/calcite-design-system/components/accordion/):検索バーと結果を表示するメニューバーとして使用しています。
    - [icons](https://developers.arcgis.com/calcite-design-system/icons/):ルート案内文をアイコンでアイコンでわかりやすく補完しています。また、ルートの始点終点のアイコンにも使っています。

- [leaflet](https://leafletjs.com/)
    - [`L.control.zoom`](https://leafletjs.com/reference-1.7.1.html#control-zoom): zoom ボタンの設定ができます。ボタンの位置を変えるために使用しています。
    - [`L.divIcon`](https://leafletjs.com/reference-1.7.1.html#divicon):アイコンを画像ではなく、`div` 要素で作成します。ルートの始点終点のアイコンを使用するために使っています。
    - [`.getContainer()`]: leaflet 上で動作するオブジェクトの HTML 要素を取得します。検索バーをメニューバー内の子要素として入れるために使用しています。 

- [esri-leaflet-vector](https://github.com/Esri/esri-leaflet-vector)
    - `ArcGIS:Navigation`: Esri が提供している道路の見やすいベクタータイル ベースマップです。

- [esri-laeflet-geocoder](https://github.com/Esri/esri-leaflet-geocoder)
    - [`L.esri.Geocoding.geocodeService`](http://esri.github.io/esri-leaflet/api-reference/services/geocode-service.html): ArcGIS Online のジオコーディングサービスのラッパー。リバースジオコーディングを行うために使用しています。
    - `.reverse()`: `L.esri.Geocoding.geocodeService` からリバースジオコーディングを実行します。クリックした地点の地名や位置情報を入力されていない検索バー内に入力するためなどに使用しています。

![Calcite Design System](../../images/calcite.png)