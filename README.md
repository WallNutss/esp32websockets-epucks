# ESP32 Remote Control Epucks With Simple Websockets

In my recent year at the end of my college, I started learn more about backend server and it's implementation and my interest in IoT about data sensor exchange. In my journey of building it, I get confused why almost in Youtube learning materials there is no tutorial about internet based communication but so much with on local network to work about. Frustated about that and wanting to learn more about remote control with Internet so anyone with access can control the robot device. In this repo, I finish try implementing websocket protocol on how we exchange data/commands through internet back to ESP32 with latency about 400-600ms, with server hosted on heroku.

# Tools Required
## Robot
* ESP32 Module
* TB6612FNG Motor Driver
* 18560 x 2 Batteries
* Suitable Chassis (Here use Epucks Chassis)

## Server Implementation
* Node.js
* [Heroku Platform](https://heroku.com)
* [Express.js](https://expressjs.com/)
* [Websocket Server & Client](https://www.npmjs.com/package/ws)

# Operational Chart
Here is the Operational Chart between the relation of server and IoT
<p align="center">
  <img src="doc/Operational Chart ESP32-ws.png">
</p>

# Circuit Diagram
Here is the Circuit Diagram of the epucks which is pretty simple
<p align="center">
  <img src="doc/Circuit Diagram.png">
</p>
<p align="center">
  <img src="doc/ESP32 TB6612FNG Schema.png">
</p>

# Deployment
This app uses Heroku platform for Deployment.
[Link here](https://esp32-ws.herokuapp.com/)

# Known Issues
* Big Latency Around 400 to 700ms
* Websocket close connection if 55s idle or don't send data to ESP32. Which mean that we need to restart the device so we can connect back again to the server. This issues comes from heroku policy where after initial response, each byte that we sent will have resets a rolling 55 second window. Where if no data is sent with 55s limit time, then the connection will be terminated. [Look here for more](https://devcenter.heroku.com/articles/http-routing#timeouts) . Currently, I still haven't come up with an easy to implement solution.


# References
* [Making IoT with WeMos D1 R2 using Node.js RESTful API and Vue.js](https://rafipriatna.id/membuat-iot-dengan-wemos-d1-r2-esp8266-serta-menggunakan-api-nodejs-dan-vuejs#konfigurasi-server) (In Bahasa Indonesia)
* [TB6612FNG Configuration](https://learn.sparkfun.com/tutorials/tb6612fng-hookup-guide/all)
* [Controlling Motor DC with TB6612FNG](https://forum.makerforums.info/t/controlling-a-dc-motor-with-tb6612fng-on-esp32/83702/3)
