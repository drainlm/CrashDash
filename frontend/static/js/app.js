// const url = "http://127.0.0.1:5000/api/data";
// const countiesUrl = "http://127.0.0.1:5000/api/county_crash_data";
const geoCrashUrl = "http://127.0.0.1:5000/api/geo_crash_data";
const geoBoundaryUrl = "http://127.0.0.1:5000/api/geo_boundary_data";
// const restraintInjuriesUrl = "http://127.0.0.1:5000/api/restraint_injuries";
// const crashDayOfWeekUrl = "http://127.0.0.1:5000/api/crash_dayofweek";
// const crashTimeOfDayUrl = "http://127.0.0.1:5000/api/crash_timeofday";

///// Map - choropleth, markers/bubble
// //Lisa
function getMapData() {
    d3.json(geoCrashurl).then((data) => {
        console.log(data);
    });
}


// ///// Stacked Horizontal - Restraint type by Injury
// //Dhawn 
// function getRestraintInjuries() {
//     d3.json(restraintInjuriesUrl).then((data) => {
//         console.log(data);
//     });
// }

// ///// Horizontal Bar Graph - Days of Week
// //KAREN
// function getCrashDayOfWeek() {
//     d3.json(crashDayOfWeekUrl).then((data) => {
//         console.log(data);
//     });
// }

// function getCrashTimeOfDay() {
//     d3.json(crashTimeOfDayUrl).then((data) => {
//         console.log(data);
//     });
// }

///// [Doughnut](https://www.chartjs.org/docs/latest/charts/doughnut.html) - Time of Day (Chart.js)
//KAYLA
// Initialize page with D3
function init() {
    // getData();
    // getCountyData();
    // getRestraintInjuries();
    // getCrashDayOfWeek();
    // getCrashTimeOfDay();
}

init();
