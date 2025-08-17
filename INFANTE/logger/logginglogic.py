import screenlogger
import sendinginfo
import time
import json
from io import BytesIO
from PIL import Image
import os

BASE_PATH = ""
SEND_FILE_ENDPOINT = ""

# Ensure the photos folder exists
os.makedirs("photos", exist_ok=True)

counter = 0  # To generate unique filenames
def save_image_and_metadata(payload, index):
    # Rebuild image from payload
    img_bytes = payload["file"][1]  # raw JPEG bytes
    img = Image.open(BytesIO(img_bytes))
    
    # Save screenshot
    img_filename = f"photos/screenshot_{index}.jpg"
    img.save(img_filename, format="JPEG")
    print(f"Saved screenshot to {img_filename}")
    
    # Save metadata JSON
    metadata_str = payload["metadata"][1]  # JSON string
    json_filename = f"photos/metadata_{index}.json"
    with open(json_filename, "w", encoding="utf-8") as f:
        f.write(metadata_str)
    print(f"Saved metadata to {json_filename}")

while True:
    print(counter)
    payload = screenlogger.log_current_window()
    print(payload)
    save_image_and_metadata(payload, counter)
    #sendinginfo.send_screenshot_jpeg(url=SEND_FILE_ENDPOINT, files=payload)

    counter += 1
    time.sleep(3)  # 30,000 secondsprint(counter); adjust as needed
