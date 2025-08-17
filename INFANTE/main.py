import logger.screenlogger as logger
import json

if __name__ == "__main__":
    with open("data.json", "w") as json_file:
        my_dictionary = logger.log_current_window()
        json.dump(my_dictionary, json_file, indent=4)

