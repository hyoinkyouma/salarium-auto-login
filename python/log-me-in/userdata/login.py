from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
import json
import os
import sys

def getUserData ():
    data = sys.argv[3] + '\\log-me-in\\userdata\\data.json'
    with open (data) as f:
        data = json.load(f)
    return data

def login ():
    user = getUserData()
    options = Options()
    options.set_preference('profile', './')
    service = Service(executable_path= sys.argv[3] + '\\log-me-in\\userdata\\bin\\geckodriver-win.exe', log_path=os.devnull)

    email = user["email"]
    passkey = user ["password"]
    url = user ["url"]
    urlDash = user["urlDash"]

    print('Starting app')
    driver = webdriver.Firefox(service=service, options=options)

    print('Opening Webpage')
    driver.get(url)
        
    print('Executing login Script')


    #login
    driver.execute_script(f'const inputArr = document.querySelectorAll(".form-control"); inputArr[0].value = "{email}";inputArr[1].value = "{passkey}"')
            
    driver.execute_script("document.querySelector('.btn-form-custom').click()")
        
    driver.implicitly_wait(10)
    driver.get(urlDash)
    time = driver.find_element_by_id('time_btn')
    time.click()
    driver.quit()

    
      

def main ():
    print('works')
    login()
login()