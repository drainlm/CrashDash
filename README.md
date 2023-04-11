# CrashDash


# Project 3

Group members: Lisa Drain, Dhawn Alexander, Karen Fuentes, Kayla Bailey

Requirements: Your visualization must include a Python Flask-powered API, HTML/CSS, JavaScript,
and at least one database (SQL, MongoDB, SQLite, etc.).

* [X] Your project should fall into on of the following three tracks:
  * [ ] A combination of web scraping and Leaflet or Plotly
  * [X] A dashboard page with multiple charts that update from the same data
  * [ ] A server that performs multiple manipulations on data in a database prior to visualization ( **must be approved** )
* [ ] Your project should include at least one JS library that we did not cover.
* [X] Your project must be powered by a dataset with at least 100 records.( if using 2022 set)
* [ ] Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).*(could do weather/road conditions with a drop down menu to view each condition, Time of the day?)*
* [ ] Your final visualization should ideally include at least three views.

---

### Tasks

* [X] Load csv file and clean data together
* [ ] Set up database
* [ ] Create Python Flask-Powered API
* [ ] Interactive Visualizations
* [ ] Testing
* [ ] Slide Deck

Project Proposal

The aim of our project is to uncover patterns in commercial vehicle related accidents resulting in fatality or serious injury. We’ll allow users to examine relationships between weather and road conditions, location, time of day, day of the week, as well as other factors.

Focused Industry: Insurance/Trucking

Data: [https://cris.dot.state.tx.us/public/Query/app/home](https://cris.dot.state.tx.us/public/Query/app/home)  ( using 2022 with severe/fatal accidents with commercial vehicles

Some filters discussed:

* Weather
* Fatal VS Severe
* Time of day
* Location
* Age
* Road Conditions

Visualizations discussed:

Multiples visuals in one:[Mixed Subplots plotly  ](https://plotly.com/python/mixed-subplots/)(maybe we could do weather, location, road conditions)

(Dhawn you had a really good example if you want to add)

* Weather([choropleth map](https://plotly.com/python/mapbox-county-choropleth/) with a drop down menu with plotly)
* Fatal VS Severe(D3 Chart for [comparison ](https://observablehq.com/@mbostock/methods-of-comparison-compared),
* Time of day (simple [bar chart](https://plotly.com/python/bar-charts/), line graph, could make interactive with a bubble graph)
* Location ([Bubble Map](https://plotly.com/python/bubble-maps/) with plotly/ leaflet(I’m thinking leaflet)
* Day of the week( cool [calendar ](https://observablehq.com/@d3/calendar)visual on d3)
* Age ([Age ](https://observablehq.com/@d3/dot-plot)visual D3)
* Road Conditions ([choropleth map](https://plotly.com/python/mapbox-county-choropleth/) with a drop down menu with plotly)



Tasks

* [X] Load csv file and clean data together
* [ ] Set up database
* [ ] Create Python Flask-Powered API
* [ ] Interactive Visualizations
* [ ] Testing
* [ ] Slide Deck

Project Proposal

The aim of our project is to uncover patterns in commercial vehicle related accidents resulting in fatality or serious injury. We’ll allow users to examine relationships between weather and road conditions, location, time of day, day of the week, as well as other factors.
