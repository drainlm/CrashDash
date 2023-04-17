import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
import json

#################################################
# Database Setup
#################################################
import sqlite3
conn = sqlite3.connect('crash_data.db',check_same_thread=False)
c = conn.cursor()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

CORS(app) 

#################################################
# Flask Routes
#################################################
@app.route("/") 
def welcome():
    """List all available api routes."""
    return (
        f"/api/data<br/>"
        f"/api/county_crash_data<br/>"
        f"/api/geo_crash_data<br/>"
        f"/api/geo_boundary_data<br/>"
        f"/api/restraint_injuries<br/>"
        f"/api/crash_timeofday<br/>"
        f"/api/crash_dayofweek"
    )

@app.route("/api/data")
def jsonified():
    crash_data = c.execute('''SELECT * FROM crashes''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

@app.route("/api/county_crash_data")
def county_crash_data():
    crash_data = c.execute('''SELECT `County`, 
                                     COUNT(CASE WHEN `Crash Severity` = 'K - FATAL INJURY' THEN 1 END) as FatalCrashes,
                                     COUNT(CASE WHEN `Crash Severity` = 'A - SUSPECTED SERIOUS INJURY' THEN 1 END) as SeriousInjuryCrashes,
                                     `Latitude`,
                                     `Longitude`
                              FROM (SELECT DISTINCT `Crash ID`, `County`, `Crash Severity`, `Latitude`, `Longitude` FROM crashes) AS distinct_crashes
                              GROUP BY `County`''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

@app.route('/api/geo_crash_data')
def geo_crash_data():
    geo_crash_data = pd.read_sql('SELECT * FROM geocrashes', conn)
    geo_crash_data['geometry'] = geo_crash_data['geometry'].apply(lambda x: json.loads(x))
    return geo_crash_data.to_json(orient='records')

@app.route('/api/geo_boundary_data')
def geo_boundary_data():
    geo_boundary_data = pd.read_sql('SELECT * FROM geoboundaries', conn)
    geo_boundary_data['geometry'] = geo_boundary_data['geometry'].apply(lambda x: json.loads(x))
    return geo_boundary_data.to_json(orient='records')

@app.route("/api/crash_dayofweek")
def crash_dayofweek():
    crash_data = c.execute('''SELECT DISTINCT `Crash ID`, `Crash Severity`, `Day of Week` FROM crashes''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

@app.route("/api/crash_timeofday")
def crash_timeofday():
    crash_data = c.execute('''SELECT DISTINCT `Crash ID`, `Crash Severity`, `Crash Time` FROM crashes''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

@app.route("/api/restraint_injuries")
def restraint_injuries():
    crash_data = c.execute('''SELECT `Crash ID`, `Person Injury Severity`, `Person Restraint Used` FROM crashes''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

if __name__ == '__main__':
    app.run(debug=True)
    # Close the cursor after all routes have been executed
    c.close()