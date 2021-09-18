from typing import Counter
import requests
from geopy.geocoders import Nominatim
import json
import time
import csv
from urllib.request import urlopen
#User types their city
user_loc = input("Enter your city: ")
geolocater = Nominatim(user_agent = 'e')
#Finds user location based on their city (latitude and longitude)
location = geolocater.geocode(user_loc)
#User inputs a keyword that will dictate their search results
user_interest = input("Interest: ")
#print(location.latitude, location.longitude)

#Url uses the api and formats link to a "nearby places" search result on Google Maps
global bob
#url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={}%2C{}&radius=25000&keyword={}&key=AIzaSyA8QxuHEGCsKOcdsAAdNK7BHR7HIJWxNa4".format(location.latitude, location.longitude, user_interest)
#Gets the HTTP request
place_details = []

def get_info(url, csv_enable=False) :
    if csv_enable:
        csvfile = open('locations.csv', 'a', newline='', encoding="utf-8")
        fieldnames = ['place_id', 'url', 'name']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    global place_details
    payload = {}
    headers = {}
    #global response
    response = requests.request("GET", url, headers=headers, data=payload)
    json_data = response.json()
    for r in range(0,20):
        stat = json_data["results"][r]["name"]
        p_id = json_data["results"][r]["place_id"]
        place_details.append(p_id)
        link = "https://maps.googleapis.com/maps/api/place/details/json?place_id={}&fields=website&key=AIzaSyA8QxuHEGCsKOcdsAAdNK7BHR7HIJWxNa4".format(place_details[len(place_details)-1])
        payload={}
        headers = {}
        detail_response = requests.request("GET", link, headers=headers, data=payload)
        detail_json = detail_response.json()
        site = detail_json["result"]["website"]
        try:
            print("NAME:", stat)
            print("place_id: ", p_id)
            print("site:",detail_json["result"]["website"])
            if csv_enable:
                writer.writerow({'place_id': p_id, 'url': detail_json["result"]["website"], 'name': stat})
        except Exception as e:
            print(e)
            break
    global bob
    bob = json_data["next_page_token"]
    return "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={}&key=AIzaSyA8QxuHEGCsKOcdsAAdNK7BHR7HIJWxNa4".format(json_data["next_page_token"])

huh = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={}%2C{}&radius=25000&keyword={}&key=AIzaSyA8QxuHEGCsKOcdsAAdNK7BHR7HIJWxNa4".format(location.latitude, location.longitude, user_interest)

print("HUH:", huh)

csvfile = open('locations.csv', 'w', newline='')
csvfile.write('')
fieldnames = ['place_id', 'url', 'name']
writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
writer.writeheader()

for i in range(2):
    huh = get_info(huh, True)
    time.sleep(2)