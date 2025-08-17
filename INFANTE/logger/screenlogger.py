import mss
import pywinctl as pwc
from PIL import Image
from io import BytesIO
import psutil
import requests
import json

with open("./device_info.json", "r") as f:
    DEVICE_INFO = json.load(f)

def take_screenshot_jpeg(quality: int = 70) -> bytes:
    """Capture screenshot as JPEG bytes."""
    with mss.mss() as sct:
        monitor = sct.monitors[1]
        sct_img = sct.grab(monitor)
        pil_img = Image.frombytes("RGB", sct_img.size, sct_img.rgb)

        buf = BytesIO()
        pil_img.save(buf, format="JPEG", quality=quality, optimize=True)
        buf.seek(0)
        return buf.getvalue()

def get_window_info() -> dict:
    """Get currently active window info."""
    win = pwc.getActiveWindow()
    if not win:
        return {}

    pid = win.getPID()
    window_info = {"window_title": win.title}

    try:
        proc = psutil.Process(pid)
        window_info.update({
            "process_name": proc.name(),
            "executable_path": proc.exe(),
            "command_line": " ".join(proc.cmdline())
        })
    except psutil.NoSuchProcess:
        print("Process no longer exists.")

    return window_info

def log_current_window() -> dict:
    """Build JSON content + JPEG ready for multipart POST."""
    device_info = {
        "email": DEVICE_INFO["email"]
    }

    metadata = {
        "device_info": device_info,
        "window_info": get_window_info()
    }

    img_bytes = take_screenshot_jpeg(quality=70)

    # Build payload for multipart POST
    files = {
        "file": ("screenshot.jpg", img_bytes, "image/jpeg"),
        "metadata": (None, json.dumps(metadata), "application/json")
    }

    return files