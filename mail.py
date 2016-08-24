import sys
import json
import os
import smtplib
from email.mime.text import MIMEText
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

HOST = "0.0.0.0"
PORT = 3000
ALLOWED_ORIGINS = "*"
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})


@app.route("/api/send-mail", methods=["POST"])
@cross_origin()
def send_mail():
    try:
        json_data = request.get_json(force=True)
        print(json_data)
        subject = MIMEText(json_data["subject"])
        content = MIMEText(json_data["content"])
        to = "admin@shrikantkakaraparthi.tech"
        s = smtplib.SMTP('localhost')
        s.sendmail(subject, to, content)
        s.quit()
        return jsonify(result='ok')
    except Exception as e:
        e = sys.exc_info()[0]
        print('error %s' % e)
        print('error on line {}'.format(sys.exc_info()[-1].tb_lineno))
        return jsonify(result='error')

if __name__ == "__main__":
    app.run(host=HOST, port=PORT)