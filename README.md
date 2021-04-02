```
Authors: Simon Bäcklund
         Albin Ljungdahl
```
# Project Report - Laser Tripwire with CCTV

## Links

Link to our presentation video for this project: [YouTube](https://www.youtube.com/watch?v=LC2PpuMEUdM)
Link to the GitLab repository for this project containingall of the source code: [GitLab](https://gitlab.lnu.se/sb223rd/laser-tripwire-with-cctv-camera)

## Introduction

Nowadays a lot of people feel like we are living inan increasingly insecure society where you constantly hear and read about break ins in the news. This leads to people looking for higher levels of home security than simply just havinglocks on the doors. However, a lot of the existing security systems on the market today are taking advantage of this insecurity and providing big expensive systems that not everyone can afford. The systems are also often very inflexible and have a “starter kit” with some set components and if you wish to expand the system with more components, you have to use your own provider’s components. This leads to having to choose between feeling safe and secure in your own house and making sure that you and your family have food on the table.

There is definitely a big market for a cheap and not over complicated home security system where you have a wide choice in the components and different sensors you want, targeting lower and middle class families to make sure that everyone can afford feeling safe and that your house will not be broken into without you knowingit and this is the purpose of the work in this project. The novelty of our finished productand the main part that sets our product apart from the rest will be that we intend to implement a livestream for the cameras installed in your home to give you the possibility to view yourhome at any time, from anywhere in the world, just to feel that little bit safer. A big advantageof our system is also the simple fact that we intend to keep our product cheaper than our competitors and also have a wider choice of components.

The goal for what the final product of this projectwill include is 3 different sensors that will each in their own specific way discover if someone breaks into your home and in that case activate the camera, a camera that will record whatgoes on in the residence and a web server that will host a website where you can both view all videos recorded and watch a livestream of what goes on in your home at all times. The 3 different sensors that will be used are a laser tripwire (a laser pointer pointingtowards a light sensor), a magnet sensor and a microphone used as an audio sensor. When each of these sensors are triggered, the camera should start recording and once the recordingis done the video should be instantly uploaded to the website in real time. Whilea video is recorded the livestream must still be available and not be paused. A big challengeof this project that will be a big part of the complexity will be to get all of these parts working simultaneously without interfering with each other.

## Background / State of The Art

There are a lot of different home security systemsavailable on the market today but one thing they all have in common is that they are all relatively expensive and if you wish to adapt it to your own specifications and needs theprice will only increase. Just a simple home security system with 2 cameras could cost you upwards of 2000kr [1]. Like stated in the introduction, this is definitely an area wherea simple inexpensive system could have a big market and also where a big focus of this projectlies.

Other than the price, our product will also have anupper hand over its competitors thanks to the flexibility of using a Raspberry Pi as the mainhardware. There are a lot of already existing inexpensive modules and sensors that youcan add to your Raspberry Pi to give it additional functionality, and because of this the finished product can easily be catered to the customer’s own liking. If you want laser tripwires in all of your windows, or if you want magnet sensors on all your doors, if you would ratherhave audio sensors which activate when the sound level in the house reaches a specificlevel or if you want 10 different camera angles, this is all possible with our product. Thisis a level of flexibility and configuration that
is unprecedented on the market today, atleast at thisprice level. Most other systems have predetermined price classes where you get predetermined hardwares that you then have to adapt to your needs, instead of the other way around. If you take a look at some list over “The best Home Security Systems” and focus on thecon of each product, you will see statements such as “Expensive”, “Requires a monthlysubscription”, “Requires Wyze Camera” and “Some components can be pricey”[2]. Whether thisis a conscious decision or not, this clearly shows that the state of the art systems todayare all moving the same way with the same focus - more expensive and less choices for thecustomer - and we intend to break this pattern.

## Planning

![Gantt diagram of our planning](https://github.com/BcklunD/LaserTripwireSecuritySystem/tree/main/Images/planning.png "Gantt diagram of our planning")

**Week** 4 5 6 7 8 9 10 11 12

Submit planning report

Set up Raspberry Pi

Set up light sensor

Set up camera

Activate camera on sensor

**Mid-term evaluation**

Log activities

Build website

Send data to website

**If time permits**

Implement authorization

Implement notifications

Build mobile application

Connect mobile app to website

Implement live-feed from camera

**Deadline**

```
Above is the project plan that was drawn out in weekfour when the project was still in the planning stage. The work was divided as such that Albin was more responsible for the hardware part of the project and Simon had more responsibilityfor the software. This was a natural division of the work since the Raspberry PIand all its components were at Albin’s residence and most of the work was handled remotely.All the work was still done in
cooperation, but the division made it easier to delegatework and know who had responsibility for what.
```

## Developing process

An agile project execution was chosen for this project. This meant that the project was divided into smaller parts, the specific parts can be seen in the planning. Then one part was performed at a time and after each partthe result was evaluated and possible changes were discussed before moving on to the nextpart. This is a very common way to execute IT projects so it seemed appropriate to adoptthat workflow for this project as well.

A Raspberry Pi was used for this project and by usinga Raspberry Pi you get a very cheap computer which has almost endless possibilities for added functionality and modules. This means that the home security system you get by usingthe product produced from this work can be adapted exactly to your liking and to yourown specific needs. There is a large community around the Raspberry Pi who is always readyto assist you if you run into any
problems and there are also a huge array of differentcomponents adding their own functionality to the Pi. This meant that we didn’tneed to spend any time at all creating our own sensors and installing the modules bought forthe product was also really simple and did not cause any problems. All of these things areexamples of big advantages of using this product and why we ultimately chose to go with it as our main hardware.

Since the project was developed on a Raspberry PIit was only natural to use Python for the programs controlling the hardware. The website was developed in HTML, CSS and Javascript and is run using Nginx. The server side of the website is also run using Node.js and it communicates with the client side using websockets. Nginx was chosen as it is a very easy web server to set up and get running and theauthors of this report had previous
knowledge of how it worked and how it was to be setup. It was decided to run the web server on the Raspberry PI and only have the website available on the local network, due to this only being a prototype developed and tested ina test environment. If the product were to be released the web server would definitely be hostedremotely, but in the scope of this project it is enough to host it locally to make sureit works. The reason for using HTML, CSS and Javascript to build the website was an obvious choice since these are the main building blocks of websites nowadays. The motivation behindgoing for Node to run the server side of the website much for the same reasons as the choic eof Nginx - it is simple, powerful and
among the developers of the software there was previousexperience of using Node together with websockets to communicate between the serverand the client. This way of using websockets to communicate between the two parts of the website ended up being the core of what makes the website feel so fluid and fast, and why making the website a SPA (Single Page Application) which dynamically updates the samepage instead of using the traditional approach of requesting new HTML pages from the server, work so well.

## Implementation

The first task of the project was to set up the firstsensor, the light sensor. This was quickly achieved, the sensor was very easy to set up withjust a few lines of Python code to get it running. The camera was then added as well which was very easy to get running since there is a specific camera port on the Raspberry PI. Getting them to work together and record a video when the sensor is activated was also very straightforward, thanks to the simplicity of Python and the large amounts of libraries available. So the first three weeks of planning were pretty much done in a few hours and this willbe discussed later in the report.

When the camera was working and recording videos whenit should, it was time to implement the streaming service as well. We spent quite a lot of time researching how this could be implemented and tried to do it on our own,but in the end we decided it was best to
use an existing solution for streaming and incorporate that with our program of recording videos. The first working solution did not allow simultaneous streaming and videorecording, if a sensor was activated when the stream was running the stream was paused for the duration of the recording. This was not a sufficient solution for us, we wanted the possibility to stream and record videos at the same time. Luckily we found out that the camera that was used had four so called “splitter-ports”. This basically means that the camera can record and transfer video on four ports at once. So the streaming is done on one port and the recordings on another, allowing both streaming and recording to work independently from each other.

The source code for the livestreaming part was foundon the webpage “randomnerdtutorials.com”[3] and it uses roughly the same camera as had been chosen for this project. Only the most essential parts for setting up the livestream was taken from the source code of the project on this website and in the finished product works like this:

1. The script is executed and the Raspberry Pi starts looking for new clients on a specific port.
2. Once a client enters the correct password for the website and clicks the “Livestream” button, the link to the IP address of the RaspberryPi together 
    with the chosen port is communicated to the client through the connected websocket.
3. An image element is created on the website and sets the “src” attribute of this element to the communicated IP address and port.
4. The Raspberry Pi gets notified of this new client on the specified port and the livestream is started and sent out directly to this client

Before settling for this existing solution of configuringthe livestream we spent a long time looking for clues on how to create our own solution and we also tried a lot of different ways, but none of them were successful and this decision will be discussed in the next section.

After setting up the hardware and integrating thecamera with the light sensor it was time to start working on the website. As previously mentioned the server side of the website is run using Node.js and the server communicates with the client using websockets. The first step of the communication is that the client will send the password of the site together with a message stating which service it wishes to view: thevideo archive or the livestream, to the server through the websocket. If the password is correct the server will respond with either the name of all the videos in the archive or the link to the livestream which the client is then able to request.

The client side of the website was created with the help of HTML, CSS and JavaScript, and it is made as a SPA (Single Page Application). This means that the client will only request the first HTML page from the client and then never have to request a new HTML page from the server, but will instead just request resources and alter the look of the page through the JavaScript code that was provided with the first request. When you first enter the page you will be greeted by an input field for entering the password of the website together with 2 buttons: one for requesting the video archive and the other for requesting the livestream.

```
Figure 1. The start page of the website where you enter password and choose service
```
Once you have entered the correct password and clickedone of the buttons and the communication between the server and client as previously described has happened, the page will dynamically change to display what you previouslyrequested. The text box for logging in will disappear together with the buttons and the page will look like one of the images below where the left image represents the livestream and the right image represents the video archive.

```
Figure 2. Left: The livestream. Right: Video archive.
```

As you can see in the right image there is a button in the top-left corner where you can switch between the two services and this is of course also present on the webpage if you are viewing the livestream. When a new video gets recorded on the Raspberry Pi the website, the video will instantly be uploaded to the web page and sent out to all clients who are currently connected and viewing the page. The right image displays an example of this where the video at the top left has the tag “NEW”.

Apart from Node.js, we also used Nginx to set up theweb server and serve the webpage. To set up Node.js we altered the file “default.conf” to tell Nginx to serve our webpage when someone tries to connect to 192.168.0.135/prod, which is the IP address of the Raspberry Pi. We also tried using a process manager like pm2 to make sure that the server would always be running and simply restart the program if it runs into any errors, but unfortunately we could not get this to work and had to settle with simply just running the server program through Node.

At this point the website was close to finished andhad the features that we wanted, but the project still seemed a bit too small. In order to make it a bit more complex we decided to add two more components; a magnetic sensor and a microphone. The magnet sensor was meant to be used identically to the light sensor, when the sensor is activated the camera starts recording. The microphone was initially intended to add sound to the video recordings as well. This was quickly abandoned due to the fact that the Raspberry PI used in this project was not equipped with analog pins. So in orderto find an alternate use for the microphone, so we had not purchased it in vain, we decided to use it as a third sensor. So when the microphone picks up sound, the camera is activated as well.

## Discussion and final remarks

The product that was created in this project fulfilledall of the needs and requirements that was set up before the project began. One of the main goals of the final product was that it would not become too expensive as our target market was the people who couldn’t afford the existing products on the market, and we definitely succeeded with this. The list of hardware used for the product that was listed in the previous section ended up costing only about 600kr, which is very cheap when compared to different solutions. This cost can also be both higher and lower depending on how many, and which type of sensors you want in your system. The sensors and functions we went for in this prototype, like the backup-power, magnet sensor and the audio sensor, are all optional and the price will of course fluctuate depending on your choices. Our finished product might not have the same quality on hardware as some of the competitors on the market, but it acts as a cheap alternative with a lot of user configuration to allow everyone to have their own home security system.

One point of improvement for future projects is definitely the poor planning and approximation of how long different tasks require. As stated earlier what was planned to be three weeks of work ended up taking a few hours. The reason for this is primarily because we have not done a project like this previously and we have worked very seldomly with the Raspberry PI. So lack of experience with these kinds of projects led to a very inaccurate
project plan.

Regarding the choice to go with a pre existing solutionfor live streaming through a Raspberry Pi camera. With the limited time of this project and the fact that we had other parts of the project to finalize before the deadline, we ultimately had to swallow our pride and scratch our goal of creating our own video streaming solution and adopt the solution of setting up a livestream that we found online. But this is also an important part of being a
good programmer. There is no need to reinvent thewheel. When you find a good solution from someone else that will fit the needs of your project it is important to know how to read through someone else’s source code, understand how it works and adopt it to your project. In hindsight there was no reason for us to ever create our own solution since the one that we found online did exactly what we wanted our final solution to do and we managed to integrate it into our website in a very good and natural way.

## Conclusions

Our original observation was that there were a lot of expensive home security systems which mostly had a low level of configuration and we felt like we could create our own system which would not only offer a higher level of flexibility, but also be cheaper than the alternatives. The novelty that we decided to focus on in the project was to offer a live streaming option, which is not commonly provided in existing security systems. This ended up adding a lot of complexity to the project but is a big part of what sets this product apart from its competitors.

The implementation was done in clear, predetermined steps where our planning for how long each step would take turned out to be a bit faulty, but ultimately we finished the important features that we focused on beforehand. We had a dream of also creating a mobile app but
this was only an extra feature which we ended up not having the time to get to.

So to conclude the project we think it is a success. We achieved the goals we set up without too many mishaps along the way.

## References

[1] Pricerunner. (2021) Comparing prices of monitoringsystems for home use. [Online]. Available:https://www.pricerunner.se/sp/%C3%B6vervakningssystem.html
[2] PCMag. (2021) The Best Smart Home Security Systemsfor 2021. [Online]. Available: https://www.pcmag.com/picks/the-best-smart-home-security-systems
[3] Random Nerd Tutorials. (2017) Video Streamingwith Raspberry Pi Camera. [Online]. Available:https://randomnerdtutorials.com/video-streaming-with-raspberry-pi-camera/