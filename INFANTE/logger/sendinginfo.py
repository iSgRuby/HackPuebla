import requests
import json

def send_screenshot_jpeg(url: str, files):
    response = requests.post(url, files=files)

    print("Status:", response.status_code)
    print("Response:", response.text)
    return response
