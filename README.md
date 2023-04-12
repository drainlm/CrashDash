# CrashDash

Group members: Lisa Drain, Dhawn Alexander, Karen Fuentes, Kayla Bailey

Requirements: 

* [ ] Your visualization must include:

  * [ ] Python Flask-powered API,
  * [ ] HTML/CSS JavaScript
  * [X] and at least one database (SQLite).
* [X] Your project should fall into on of the following three tracks:

  * A combination of web scraping and Leaflet or Plotly
  * **A dashboard page with multiple charts that update from the same data**
  * A server that performs multiple manipulations on data in a database prior to visualization ( **must be approved** )
* [ ] Your project should include at least one JS library that we did not cover.

  * https://kinsta.com/blog/javascript-libraries/
  * https://www.softwaretestinghelp.com/best-javascript-visualization-libraries/
  * https://www.monterail.com/blog/javascript-libraries-data-visualization
* [ ] Your project must be powered by a dataset with at least 100 records.( if using 2022 set)
* [ ] Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).*(could do weather/road conditions with a drop down menu to view each condition, Time of the day?)*
* [ ] Your final visualization should ideally include at least three views.

  * [ ] Multiples visuals in one: [Mixed Subplots plotly  ](https://plotly.com/python/mixed-subplots/)(maybe we could do weather, location, road conditions)
  * [ ] Weather([choropleth map](https://plotly.com/python/mapbox-county-choropleth/) with a drop down menu with plotly)
  * [ ] Fatal VS Severe(D3 Chart for [comparison ](https://observablehq.com/@mbostock/methods-of-comparison-compared),
  * [ ] Location ([Bubble Map](https://plotly.com/python/bubble-maps/) with plotly/ leaflet(I’m thinking leaflet)
  * [ ] Age ([Age ](https://observablehq.com/@d3/dot-plot)visual D3)
  * [ ] Road Conditions ([choropleth map](https://plotly.com/python/mapbox-county-choropleth/) with a drop down menu with plotly)
  * [ ] [Time of Day &amp; Day of Week heat map](https://github.com/CivicVision/day-of-week-hour-of-day-chart)
  * [ ] Day of the week( cool [calendar ](https://observablehq.com/@d3/calendar)visual on d3)
  * [ ] Time of day (simple [bar chart](https://plotly.com/python/bar-charts/), line graph, could make interactive with a bubble graph)

---

### Tasks

* [X] ~~Load csv file and clean data together (Monday)~~
* [ ] Database and Queries (Wed)
* [ ] Demo Visualizations (Wed)
* [ ] Create Python Flask-Powered API (Wed)
* [ ] Interactive Visualizations
* [ ] Testing
* [ ] Slide Deck

---

### Project Proposal

**Focused Industry**: Insurance/Trucking

The aim of our project is to uncover patterns in commercial vehicle related accidents resulting in fatality or serious injury. We'll allow users to examine relationships between weather and road conditions, location, time of day, day of the week, as well as other factors.

### Data: 

### [CRIS Query]([https://cris.dot.state.tx.us/public/Query/app/home](https://cris.dot.state.tx.us/public/Query/app/home)) 

(2022 Fatal & Serious Injury Crashes involving Commercial Vehicles)

Filters:

* Crash ID
* City
* County
* Crash Date
* Crash Time
* Day of Week
* Latitude
* Longitude
* School Bus Flag
* Speed Limit
* Surface Condition
* Weather Condition
* Contributing Factor 1
* Person Age
* Person Gender
* Person Type
* Sequence of events CMV 1,2,3,4
* Crash Severity
* Commercial Vehicle Flag
* School Bus flag
* Person Injury severity
