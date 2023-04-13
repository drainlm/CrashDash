import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS




#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///data.sqlite")

# #reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save reference to the table
# measurement = Base.classes.measurement
# station = Base.classes.station
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




@app.route("/") # Change names later 
def welcome():
    """List all available api routes."""
    return (
        # f"Available Routes:<br/>"
        # f"/api/v1.0/precipitation<br/>"
        # f"/api/v1.0/station<br/>"
        f"/api/data"
        # f"/api/v1.0/tobs"


    )

@app.route("/api/data")
def jsonified():
    crash_data = c.execute('''SELECT * FROM crashes''').fetchall()
    column_names = [description[0] for description in c.description]
    crashes = [dict(zip(column_names, row)) for row in crash_data]

    return jsonify(crashes)

# # @app.route("/api/data")
# # def names():
# #     # Create our session (link) from Python to the DB
# #     session = Session(engine)

# #     """Return a list of all passenger names"""
# #     # Query all passengers
# #     results = session.query(Passenger.name).all()

# #     session.close()

# #     # Convert list of tuples into normal list
# #     all_names = list(np.ravel(results))

# #     return jsonify(all_names)

# # app.route("/api/data")
# # def jsonified():
# #     return jsonify(crashes)

# @app.route("/api/v1.0/precipitation")
# def get_precipiation():
#     # Create our session (link) from Python to the DB
#     # session = Session(engine)

#     prcp_results=c.execute('''SELECT `Crash Severity`,`Day of Week` FROM crashes''').fetchall() # [(1, 'pokerkid'), (2, 'crazyken')]
#     year_ago = dt.date(2017,8,23) - dt.timedelta(days=365)
  

#     # prcp_results=session.query(measurement.date, measurement.prcp).filter(measurement.date>= year_ago).all()
#   # Save the query results as a Pandas DataFrame and set the index to the date column
#   #take to html and pass through java
#     prcp_df = pd.DataFrame(prcp_results,columns=['Crash Severity','Day of Week'])




#     return prcp_df.to_dict()


# @app.route("/api/v1.0/station")
# def get_stations():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query station list 
#     results = results = session.query(station).all()
#     results = [r.name for r in results]
#     session.close()
#     return {"stations": list(results)}

# @app.route("/api/v1.0/tobs")
# def get_tobs():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     year_ago = dt.date(2017,8,23) - dt.timedelta(days=365)

    
#     # Query station list and create dataframe
#     most_active_station =session.query(measurement.station,func.count(measurement.station)).group_by(measurement.station).order_by(func.count(measurement.station).desc()).all()[0][0]

#     most_active_results=session.query(measurement.date,measurement.tobs).filter(measurement.date>= year_ago).filter(measurement.station == most_active_station).all()

#     most_active_df = pd.DataFrame(most_active_results,columns=['date','tobs']).set_index('date')

#     # create dict for tobs 
#     most_active_df=most_active_df.sort_index()

#     return most_active_df.to_dict()['tobs']


 

    


if __name__ == '__main__':
    app.run(debug=True)