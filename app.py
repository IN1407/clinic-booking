from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from flask_cors import CORS  # optional if you're testing from frontend on another port
import os
from dotenv import load_dotenv

load_dotenv() 
app = Flask(__name__)
CORS(app)

# Email credentials (use your real SMTP settings)
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_TO = os.getenv("EMAIL_TO")


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    date = data.get('date')

    full_message = f"Name: {name}\nPhone: {phone}\nDate:\n{date}"

    try:
        msg = MIMEText(full_message)
        msg['Subject'] = "New Patient"
        msg['From'] = EMAIL_HOST_USER
        msg['To'] = EMAIL_TO

        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, EMAIL_TO, msg.as_string())
        server.quit()

        return jsonify({"status": "success", "message": "Email sent successfully."})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


