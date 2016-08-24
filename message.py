import sys
import json
import os
import smtplib
from email.mime.text import MIMEText
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from twilio.rest import TwilioRestClient
from twilio import TwilioRestException

HOST = "0.0.0.0"
PORT = 3000
ALLOWED_ORIGINS = "*"
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})

TWILIO_AUTH_TOKEN = "561ba8512c01086b5b770673bd6c3043"
TWILIO_ACCOUNT_SID = "ACbd24bae146abdebcad083493af4a7017"
TWILIO_SENDER_NUMBER = "+12013800248"


@app.route("/api/send-message", methods=["POST"])
@cross_origin()
def send_message():
    try:
        subject = MIMEText(request.form["subject"])
        content = MIMEText(request.form["content"])
        receiverPhoneNumber = "+16822265768"
        twilioClient = TwilioRestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        txtMessage = "Subject: %s. Content: %s" % (subject, content)
        twilioClient.messages.create(body=txtMessage, from_=TWILIO_SENDER_NUMBER, to=receiverPhoneNumber)
        return jsonify(result='ok')
    except Exception as e:
        e = sys.exc_info()[0]
        print('error %s' % e)
        print('error on line {}'.format(sys.exc_info()[-1].tb_lineno))
        return jsonify(result='error')

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)