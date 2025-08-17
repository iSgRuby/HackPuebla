import screenlogger
import sendinginfo
import time
import json
import subprocess
from io import BytesIO
from PIL import Image
import os

BASE_PATH = "http://localhost:3000"
SEND_FILE_ENDPOINT = BASE_PATH + "/api/upload-image"

# Ensure the photos folder exists
os.makedirs("photos", exist_ok=True)

counter = 0  # To generate unique filenames
def save_image_and_metadata(payload, index):
    # Rebuild image from payload
    img_bytes = payload["file"][1]  # raw JPEG bytes
    img = Image.open(BytesIO(img_bytes))
    
    # Save screenshot
    img_filename = f"photos/screenshot_{0}.jpg"
    img.save(img_filename, format="JPEG")
    print(f"Saved screenshot to {img_filename}")
    
    # Save metadata JSON
    metadata_str = payload["metadata"][1]  # JSON string
    json_filename = f"photos/metadata_{index}.json"
    with open(json_filename, "w", encoding="utf-8") as f:
        f.write(metadata_str)
    print(f"Saved metadata to {json_filename}")

import subprocess

def send_image_curl():
    command = (
        'curl.exe -X POST '
        '-F "image=@C:\\Users\\fabia\\Documents\\Develop\\HackPuebla\\INFANTE\\logger\\photos\\screenshot_0.jpg" '
        '-F "email=fab@gmail.com" '
        'http://localhost:3000/api/upload-image'
    )
    subprocess.run(
        ['powershell', '-Command', command],
        text=True
    )

while True:
    print(counter)
    payload = screenlogger.log_current_window()
    print(payload)
    save_image_and_metadata(payload, 0)
    #sendinginfo.send_screenshot_jpeg(url=SEND_FILE_ENDPOINT, files=payload)
    #time.sleep(1)
    send_image_curl()
    counter += 1
    time.sleep(10)  # 30,000 secondsprint(counter); adjust as needed
