import RPi.GPIO as GPIO
from time import sleep, localtime, strftime
from picamera import PiCamera
from subprocess import call
import os

#Set PIN 4, which is the light sensor, as input
GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN)

#Initiate the camera
camera = PiCamera()

while(True):
    #If the light sensor does not detect the laser, a video is recorded
    if(GPIO.input(4) == 1):
        #The video file is named after the date and time of the recording
        file_name = strftime("%d_%B_%Y_-_%H.%M.%S", localtime())
        file_h264 = "/var/www/prod/Videos/%s.h264" % file_name
        
        #Record for 10 seconds
        camera.start_preview()
        camera.start_recording(file_h264)
        print("Start recording")
        sleep(10)
        camera.stop_recording()
        print("Stop recording")
        camera.stop_preview()
        
        sleep(0.5)
        #Convert the file to mp4
        file_mp4 = "/var/www/prod/Videos/%s.mp4" % file_name
        command = "MP4Box -add " + file_h264 + " " + file_mp4
        retcode = call([command], shell=True)
        print(retcode)
        
        #Remove the file in h264-format
        if os.path.exists(file_h264):
            os.remove(file_h264)
        

