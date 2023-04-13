# CrashDash

Group members: Lisa Drain, Dhawn Alexander, Karen Fuentes, Kayla Bailey

Requirements:

* [ ] Your visualization must include:

* Python Flask-powered API,
* HTML/CSS JavaScript
* and at least one database (SQLite).
* [ ] Your project should fall into on of the following three tracks:

* A combination of web scraping and Leaflet or Plotly
* **A dashboard page with multiple charts that update from the same data**

* A server that performs multiple manipulations on data in a database prior to visualization ( **must be approved** )

* [X] Your project should include at least one JS library that we did not cover.

  * https://www.chartjs.org/docs/latest/charts/doughnut.html
* [X] Your project must be powered by a dataset with at least 100 records.( if using 2022 set)
* [ ] Your project must include some level of user-driven interaction (e.g., menus, dropdowns, textboxes).*(could do weather/road conditions with a drop down menu to view each condition, Time of the day?)*
* [ ] Your final visualization should ideally include at least three views.

  Table - Top 10 Contributing Factors
  Stacked Horizontal - Restraint type by Fatal/Serious Injury
  Doughnut - Time of Day
  Horizontal Bar Graph - Days of Week
  Map - choropleth, markers/bubble

---

### Tasks

* [X] ~~Load csv file and clean data together (Monday)~~
* [ ] Database and Queries (Wed)
* [X] Demo Visualizations (Wed)
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
