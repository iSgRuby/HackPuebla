import mss

# Function to take screenshots of current screen
def take_screens_frame():
    with mss.mss() as sct:
        monitor = sct.monitors[1]  
        sct_img = sct.grab(monitor)
        #mss.tools.to_png(sct_img.rgb, sct_img.size, output="test.png")
        return sct_img


