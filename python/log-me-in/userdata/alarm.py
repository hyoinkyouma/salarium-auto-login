from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import sys
import os

from selenium.webdriver.firefox.service import Service
import time

def main():
    options = Options()
    options.set_preference('profile', './')
    service = Service(executable_path= sys.argv[3] + '\\log-me-in\\userdata\\bin\\geckodriver-win.exe', log_path=os.devnull)
    driver = webdriver.Firefox(service=service, options=options)
    driver.get('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')
    WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Play']"))).click()
    time.sleep(60)
    driver.quit()