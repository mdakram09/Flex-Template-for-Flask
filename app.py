import flask
from flask import Flask, request, render_template,url_for,redirect
import json
import requests



app = Flask(__name__)



@app.route('/')
def index():
    return render_template('flexindex.html')

@app.route('/wordbeater')
def wordbeater():
    return render_template('wordbeater.html')

@app.route('/paragraphMeter')
def paragraphMeter():
    return render_template('paragraphMeter.html')

@app.route('/keywordBeater')
def keywordBeater():
    return render_template('keywordBeater.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=8001)