from lib import epd7in5_HD
from PIL import Image,ImageDraw,ImageFont

import os
import time
import logging

logging.basicConfig(level=logging.DEBUG)


def main():
    logging.info('getting display, init and clear')
    epd = epd7in5_HD.EPD()
    epd.init()

    image = Image.open('screenshot.png')

    logging.info('sending image to display')
    epd.display(epd.getbuffer(image))
    time.sleep(2)

if __name__ == '__main__':
    main()
