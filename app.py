import flask
from flask import Flask, request, render_template,url_for,redirect
import json
import requests



app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')





if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=8001)