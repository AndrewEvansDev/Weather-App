from flask import Flask, render_template, request
import requests
import json


app = Flask(__name__)
api_key = "1a62361f6606959256c2fcad3db52014"


@app.route('/')
@app.route('/home')
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/weather')
def weather_page():
    return render_template("weather.html")

@app.route('/api/weather', methods=["POST"])
def weather():
    #get data from js request
    lat = request.json['lat']
    lon = request.json['lon']
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric" % (lat, lon, api_key)
    
    
    response = requests.get(url) #call the open weather api
    data = json.loads(response.text) #parse txt to json
    return data #return weather as a json object

if __name__ ==  '__main__':
    app.run(debug=True)