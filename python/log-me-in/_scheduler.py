from datetime import datetime
import time
from userdata.login import main
import schedule
import sys

def timeIn():
    main()
    print(f'Time in at{datetime.now().strftime("%I:%M%p on %B %d, %Y")}')


def timeOut():
    main()
    print(f'Time out at{datetime.now().strftime("%I:%M%p on %B %d, %Y")}')

def tasks (login = '10:00' , logout = '19:00'):
   # which_day = int(datetime.now().weekday())
    # if which_day >= 6: 
    #     print('Happy Weekends!')
    #     return
    # if which_day < 6:
    schedule.every().day.at(login).do(timeIn)
    schedule.every().day.at(logout).do(timeOut)
  #  login = input('What time will you login: ')
   # logout = input('Whatime will you logout: ')
    
    loginInt = int(login[:2])
    loginMinutes = abs(int(login[3:5]) - int(datetime.now().strftime('%M')))
    loginTime = abs(loginInt - int(datetime.now().strftime('%H')) - 12)
       
    # if int(datetime.now().weekday()) >= 5:
    #     print("It's a weekend dummy!")
   # else:
    print(f"Waiting for login time {loginTime}:{loginMinutes}")      
    
    while True:
        schedule.run_pending()
        time.sleep(1)

tasks(sys.argv[1], sys.argv[2])
   