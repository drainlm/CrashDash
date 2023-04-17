// Creating the map object
let myMap = L.map("map", {
  center: [31.936896, -98.723669],
  zoom: 5,
});

// Create an empty layer group for the choropleth layer
const choroplethLayerGroup = L.layerGroup().addTo(myMap);

// Create an empty layer group for the marker cluster layer
const markerClusterLayerGroup = L.layerGroup().addTo(myMap);

   // Create an object with the layer groups
   const overlayMaps = {
    "Choropleth Layer": choroplethLayerGroup,
    "Marker Cluster Layer": markerClusterLayerGroup,
  };

  // Add a layer control to the map
  L.control.layers(null, overlayMaps, { collapsed: false }).addTo(myMap);


// Adding the tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = "Texas_County_Boundaries.geojson";
let geoCrashData = "cleaned_crash_data.geojson";

let geojson;

// Load the crash data GeoJSON.
d3.json(geoCrashData).then(function (crashData) {
  // Create a marker cluster group for the crash data.
  let markers = L.markerClusterGroup();

  // Add the marker cluster group to the marker cluster layer group
  markerClusterLayerGroup.addLayer(markers);

  // Create a set to store unique crash IDs
  const uniqueCrashIds = new Set();

  // Loop through each feature in the GeoJSON data and add it to the marker cluster group.
  crashData.features.forEach(function(feature) {
    const crashId = feature.properties['Crash ID'];

    // Check if the crash ID is already in the set
    if (!uniqueCrashIds.has(crashId)) {
      // Add the crash ID to the set
      uniqueCrashIds.add(crashId);

      let marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        icon: L.icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
      });

      marker.bindPopup("<strong>" + "Crash ID: " + feature.properties['Crash ID'] + "</strong><br /><br />" +
        "City: " + feature.properties['City'] + "<br />" +
        "County: " + feature.properties['County'] + "<br />" +
        "Crash Date: " + feature.properties['Crash Date'] + "<br />" +
        "Crash Time: " + feature.properties['Crash Time'] + "<br />" +
        "Crash Day of Week: " + feature.properties['Day of Week'] + "<br />" +
        "Crash School Bus Flag: " + feature.properties['School Bus Flag'] + "<br />" +
        "Crash Speed Limit: " + feature.properties['Speed Limit'] + "<br />" +
        "Crash Vehicle Defect: " + feature.properties['Vehicle Defect 1'] + "<br />" +
        "Crash Possible Vehicle Defect: " + feature.properties['Possible Vehicle Defect 1'] + "<br />" +
        "Crash Severity: " + feature.properties['Crash Severity']);

      markers.addLayer(marker);
    }
  });


  function preprocessData(geoData, geoCrashData) {
    const injuryCounts = {};
  
    // Loop through geoCrashData and count the fatal and serious injuries per unique crash ID
    geoCrashData.features.forEach((feature) => {
      const crashId = feature.properties["Crash ID"];
      const county = feature.properties.County.toUpperCase(); // Convert county name to uppercase
      const crashSeverity = feature.properties["Crash Severity"];
  
      if (!injuryCounts[county]) {
        injuryCounts[county] = {
          fatalInjuries: 0,
          seriousInjuries: 0,
          uniqueCrashIds: new Set(),
        };
      }
  
      if (!injuryCounts[county].uniqueCrashIds.has(crashId)) {
        injuryCounts[county].uniqueCrashIds.add(crashId);
  
        if (crashSeverity === "K - FATAL INJURY") {
          injuryCounts[county].fatalInjuries++;
        } else if (crashSeverity === "A - SUSPECTED SERIOUS INJURY") {
          injuryCounts[county].seriousInjuries++;
        }
      }
    });
  
    // Add the injury counts to the geoData
    geoData.features.forEach((feature) => {
      const county = feature.properties.CNTY_NM;
      const countyInjuries = injuryCounts[county.toUpperCase()] || { // Convert county name to uppercase
        fatalInjuries: 0,
        seriousInjuries: 0,
      };
  
      feature.properties.FatalInjuries = countyInjuries.fatalInjuries;
      feature.properties.SeriousInjuries = countyInjuries.seriousInjuries;
      feature.properties.TotalInjuries =
        countyInjuries.fatalInjuries + countyInjuries.seriousInjuries;
    });
  }
// Get the data with d3.
d3.json(geoData).then(function (data) {
  d3.json(geoCrashData).then(function (crashData) {
    preprocessData(data, crashData);

    // Create a new choropleth layer using the data.
    geojson = L.choropleth(data, {
      // Define which property in the features to use.
      valueProperty: "TotalInjuries",

      // Set the color scale.
      scale: ["#ffffb2", "#b10026"],
      // The number of breaks in the step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#000",
        weight: 0.5,
        fillOpacity: 0.6,
        fillColor: "#000",
      },
      // Binding a popup to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<strong>" +
            feature.properties.CNTY_NM +
            "</strong><br /><br />Commercial Vehicle Accidents with Fatal Injuries: " +
            feature.properties.FatalInjuries +
            "<br /><br />Commercial Vehicle Accidents with Serious Injuries: " +
            feature.properties.SeriousInjuries
        );
      },
    }).addTo(choroplethLayerGroup);

    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let limits = geojson.options.limits;
      let colors = geojson.options.colors;
      let labels = [];

      // Add the minimum and maximum.
      let legendInfo =
        "<h3>Number of Fatal/Serious Injury Crashes</h3>" +
        '<div class="labels">' +
        '<div class="min">' +
        limits[0] +
        "</div>" +
        '<div class="max">' +
        limits[limits.length - 1] +
        "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function (limit, index) {
        labels.push(
          '<li style="background-color: ' + colors[index] + '"></li>'
        );
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);

   });
});



});