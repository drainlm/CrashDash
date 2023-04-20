console.log(L)
// Map (Leaflet)
// Creating the map object
let myMap = L.map("map", {
  center: [31.2153, -95.9533],
  zoom: 6,
});

// Create an empty layer group for the choropleth layer
const choroplethLayerGroup = L.layerGroup().addTo(myMap);

// Create an empty layer group for the marker cluster layer
const markerClusterLayerGroup = L.layerGroup().addTo(myMap);

// Create empty layers for the speed limits
const speedLimit0 = L.layerGroup().addTo(myMap); // <25mph
speedLimit0.remove(); // toggle off layer selection
const speedLimit26 = L.layerGroup().addTo(myMap); // 26-45
speedLimit26.remove(); // toggle off layer selection
const speedLimit46 = L.layerGroup().addTo(myMap); // 46-70
speedLimit46.remove(); // toggle off layer selection
const speedLimit70 = L.layerGroup().addTo(myMap); // >70
speedLimit70.remove(); // toggle off layer selection


   // Create an object with the layer groups
   const overlayMaps = {
    "Accidents By County": choroplethLayerGroup,
    "Fatal/Serious Injury Crash Markers": markerClusterLayerGroup,
    "Speed Limit: <25mph": speedLimit0,
    "Speed Limit: 26-45": speedLimit26,
    "Speed Limit: 46-70": speedLimit46,
    "Speed Limit: >70": speedLimit70,
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
  let markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      return L.divIcon({
        html: '<b>' + cluster.getChildCount() + '</b></div>',
        className: 'mycluster', iconSize: L.point(30, 30),
      });
    },
  });

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
          // iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          iconUrl: "bump.png",
          //<a href="https://www.flaticon.com/free-icons/accident" title="accident icons">Accident icons created by M Karruly - Flaticon</a>
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
        "Contributing Factor: " + feature.properties['Contributing Factor 1'] + "<br />" +
        "Crash Vehicle Defect: " + feature.properties['Vehicle Defect 1'] + "<br />" +
        "Crash Possible Vehicle Defect: " + feature.properties['Possible Vehicle Defect 1'] + "<br />" +
        "Crash Severity: " + feature.properties['Crash Severity']);

        const speedLimit = feature.properties["Speed Limit"];
        let speedLayer;
      
        if (speedLimit < 25) {
          speedLayer = speedLimit0;
        } else if (speedLimit >= 26 && speedLimit <= 45) {
          speedLayer = speedLimit26;
        } else if (speedLimit >= 46 && speedLimit <= 70) {
          speedLayer = speedLimit46;
        } else {
          speedLayer = speedLimit70;
        }
      
      speedLayer.addLayer(marker);

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
      scale: ["#ffffff", "#ff6361"],
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
            "</strong><br /><br />2022 Commercial Vehicle Accidents with Fatal Injuries: " +
            feature.properties.FatalInjuries +
            "<br /><br />2022 Commercial Vehicle Accidents with Serious Injuries: " +
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


// Contributing Factors (DataTable)

// Fetch data from /api/contributing_factors_data
async function fetchContributingFactorsData() {
  const response = await fetch('http://127.0.0.1:5000/api/contributing_factors');
  const data = await response.json();
  return data;
}

// Display Contributing Factors table
async function displayContributingFactors() {
  const factorsData = await fetchContributingFactorsData(); // wait for data to be fetched
  const sortedFactors = factorsData
    .sort((a, b) => (b.FatalCrashes + b.SeriousInjuryCrashes) - (a.FatalCrashes + a.SeriousInjuryCrashes));

  // Add in the query selector to the table body
  const tableBody = document.querySelector('#contributingfactors tbody');

  // Create table row and table cells
  sortedFactors.forEach(factorData => {
    const row = document.createElement('tr'); // table row
    const factorCell = document.createElement('td'); // table cell for contributing factors
    const fatalCrashesCell = document.createElement('td'); 
    const seriousInjuryCrashesCell = document.createElement('td'); 
    const totalCell = document.createElement('td'); // table cell for Total number of crashes
    
    // Input data into table cells
    factorCell.textContent = factorData['Contributing Factor 1']; 
    fatalCrashesCell.textContent = factorData.FatalCrashes;
    seriousInjuryCrashesCell.textContent = factorData.SeriousInjuryCrashes;
    totalCell.textContent = factorData.FatalCrashes + factorData.SeriousInjuryCrashes;

    // Create rows with cell data and add to the table
    row.appendChild(factorCell);
    row.appendChild(fatalCrashesCell);
    row.appendChild(seriousInjuryCrashesCell);
    row.appendChild(totalCell);
    tableBody.appendChild(row);
  });

  // Initialize the DataTable
  $('#contributingfactors').DataTable();
}

displayContributingFactors();


// Crashed by Day of Week - Bar Graph (Plotly)

// Fetch data from /api/crash_dayofweek
function createDayChart() {
  fetch('http://127.0.0.1:5000/api/crash_dayofweek')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data)

      // Array with names of weekdays
      const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

      // Calculate totalCrashesDayCounts
      const totalCrashesDayCounts = daysOfWeek.map(day => data.filter(item => item[2] === day).length);

      // Trace
      const totalCrashesTrace = { 
        x: totalCrashesDayCounts,
        y: daysOfWeek,
        name: 'Total Crashes',
        type: 'bar',
        orientation: 'h',
        marker: { color: '#58508d' },
      };

const config = { responsive: true };

Plotly.newPlot('daychart', [totalCrashesTrace], config);
});
}

createDayChart();


// Crashes by Time of Day - Doughnut (Chart.js)
const crashTimeOfDayUrl = "http://127.0.0.1:5000/api/crash_timeofday";

function getCrashTimeOfDay() {
    const data = d3.json(crashTimeOfDayUrl).then((data) => {
        console.log(data);
    return data});
  
  const printdata = async () => {
    const a = await data;
    let timecrash= a;
    console.log(timecrash);

    function extractHour(str) {
        var hour = Number(str.substring(0, 2));
        return hour;
    }

let Morning=[];
let Afternoon =[];
let Evening = [];
let Night=[];
let crashtimes=[];
    
 console.log("Hello World")   
for(let i =0; i< a.length;i++){
    //variable to hold current crash time in loop
    let CrashTime =a[i]["Crash Time"];
    hour=extractHour(CrashTime);
    // determine what time period and push times to that array
    if (hour >= 06 && hour <= 11) {
        Morning.push(0);

 }    else if (hour >= 12 && hour <= 17) {
     Afternoon.push(0);

    }    else if (hour >= 18 && hour <= 23) {
        Evening.push(0);
     
 }   else {Night.push(0)};
    

// console.log(hour);
}
console.log("---------");
console.log(`${Morning.length}`);
console.log(`${Afternoon.length}`);
console.log(`${Evening.length}`);
console.log(`${Night.length}`);

console.log("---------");
  };
  printdata(data);


}

let crashtimeofday=getCrashTimeOfDay();
console.log(crashtimeofday);
