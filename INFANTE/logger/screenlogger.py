import mss
import pywinctl as pwc
from PIL import Image
from io import BytesIO
import base64
import psutil

def take_screens_frame_base64(quality: int = 70) -> str:
    """Capture screenshot, compress as JPEG, return Base64 string."""
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # primary monitor
        sct_img = sct.grab(monitor)
        pil_img = Image.frombytes("RGB", sct_img.size, sct_img.rgb)

        # Save to in-memory buffer as JPEG (compressed)
        buf = BytesIO()
        pil_img.save(buf, format="JPEG", quality=quality, optimize=True)
        buf.seek(0)

        # Encode to Base64
        img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        return img_base64

def get_window_info() -> dict:
    """Get info about the currently active window and its process."""
    win = pwc.getActiveWindow()
    if not win:
        return None
    
    pid = win.getPID()
    window_info = {
        "window_title": win.title,
    }

    try:
        proc = psutil.Process(pid)
        window_info.update({
            "process_name": proc.name(),
            "executable_path": proc.exe(),
            "command_line": ' '.join(proc.cmdline())
        })
    except psutil.NoSuchProcess:
        print("Process no longer exists.")
        return window_info

    return window_info

def log_current_window():
    """Capture screenshot + active window info in one payload."""
    frame = take_screens_frame_base64(quality=70)
    window_info = get_window_info() or {}
    window_info["image"] = frame
    return window_info
