import json
import time
import logging
import os
from pathlib import Path
import logger.screenlogger as logger

# Setup logging
logfile = Path.home() / "mydaemon.log"
logging.basicConfig(filename=logfile, level=logging.INFO)

def main():
    logging.info("Daemon started")
    while True:
        # Do some background work
        logging.info("Daemon is still running...")
        time.sleep(60)  # check/do work every minute

if __name__ == "__main__":
    with open("data.json", "w") as json_file:
        my_dictionary = logger.log_current_window()
        json.dump(my_dictionary, json_file, indent=4)

