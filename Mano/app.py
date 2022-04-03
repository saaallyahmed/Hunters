#from flask import Flask, render_template, redirect
from jinja2 import escape
from flask import Flask
from markupsafe import escape
#from flask_pymongo import PyMongo
#import scrape_mars

# Create an instance of Flask
app = Flask(__name__,template_folder='templates')

# Use PyMongo to establish Mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = PyMongo(app)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Find one record of data from the mongo database
    # mars_listing = mongo.db.mars_listing.find_one()
    #print(mars_listing)
    # Return template and data
    #return render_template("index.html")
    return ("Hello")

# Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():
    #mars_listing = mongo.db.mars_listing
    # Run the scrape function
    #mars_listing_data = scrape_mars.scrape_info()

    # Insert the record
    #mars_listing.update_one({}, {"$set": mars_listing_data}, upsert=True)

    # Redirect back to home page
    #return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)