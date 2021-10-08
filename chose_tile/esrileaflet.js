//const apiKey = "YOUR_API_KEY";

var vectorTiles = {};
var allEnums = [
    'ArcGIS:Imagery',
    'ArcGIS:Imagery:Standard',
    'ArcGIS:Imagery:Labels',
    'ArcGIS:LightGray',
    'ArcGIS:LightGray:Base',
    'ArcGIS:LightGray:Labels',
    'ArcGIS:DarkGray',
    'ArcGIS:DarkGray:Base',
    'ArcGIS:DarkGray:Labels',
    'ArcGIS:Navigation',
    'ArcGIS:NavigationNight',
    'ArcGIS:Streets',
    'ArcGIS:StreetsNight',
    'ArcGIS:StreetsRelief',
    'ArcGIS:StreetsRelief:Base',
    'ArcGIS:Topographic',
    'ArcGIS:Topographic:Base',
    'ArcGIS:Oceans',
    'ArcGIS:Oceans:Base',
    'ArcGIS:Oceans:Labels',
    'ArcGIS:Terrain',
    'ArcGIS:Terrain:Base',
    'ArcGIS:Terrain:Detail',
    'ArcGIS:Community',
    'ArcGIS:ChartedTerritory',
    'ArcGIS:ChartedTerritory:Base',
    'ArcGIS:ColoredPencil',
    'ArcGIS:Nova',
    'ArcGIS:ModernAntique',
    'ArcGIS:ModernAntique:Base',
    'ArcGIS:Midcentury',
    'ArcGIS:Newspaper',
    'ArcGIS:Hillshade:Light',
    'ArcGIS:Hillshade:Dark',
    'OSM:Standard',
    'OSM:StandardRelief',
    'OSM:StandardRelief:Base',
    'OSM:Streets',
    'OSM:StreetsRelief',
    'OSM:StreetsRelief:Base',
    'OSM:LightGray',
    'OSM:LightGray:Base',
    'OSM:LightGray:Labels',
    'OSM:DarkGray',
    'OSM-DarkGray:Base',
    'OSM-DarkGray:Labels'
  ];

  // the L.esri.Vector.vectorBasemapLayer basemap enum defaults to 'ArcGIS:Streets' if omitted
  vectorTiles.Default = L.esri.Vector.vectorBasemapLayer(null, {
    apiKey
  });
  allEnums.forEach((enumString) => {
    vectorTiles[
      enumString
    ] = L.esri.Vector.vectorBasemapLayer(enumString, {
      apiKey
    });
  });

  const map = L.map('map', {
    minZoom: 2
  }).setView([35.362752, 138.729858], 12);

  L.control
    .layers(vectorTiles)
    .addTo(map);

vectorTiles.Default.addTo(map);
