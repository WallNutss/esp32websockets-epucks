#include <ArduinoWebsockets.h> // This is the library for our protocol (https://github.com/gilmaimon/ArduinoWebsockets)
#include <WiFi.h> // For connection to your WiFi
#include <TB6612_ESP32.h> // This is library for Tb6612FNG for ESP32 (https://github.com/sparkfun/SparkFun_TB6612FNG_Arduino_Library)

// Defining the pin
#define AIN1 13
#define BIN1 27
#define AIN2 33
#define BIN2 26
#define PWMA 32
#define PWMB 25
#define STBY 14

// these constants are used to allow you to make your motor configuration
// line up with function names like forward.
const int offsetA = 1;
const int offsetB = -1;

// Initializing motors.
Motor motor1 = Motor(AIN1, AIN2, PWMA, offsetA, STBY,5000 ,8,1 );
Motor motor2 = Motor(BIN1, BIN2, PWMB, offsetB, STBY,5000 ,8,2 );

// Your Network Confidential
const char* ssid = "SSID"; //Enter SSID
const char* password = "PASSWORD"; //Enter Password
const char* websockets_server = "ws://something.herokuapp.com/"; //server adress and port

using namespace websockets;

// Handler when ESP32 got the data
void onMessageCallback(WebsocketsMessage message) {
    if(message.data()== "up"){
     forward(motor1, motor2, 100);
    }
    if(message.data()== "down"){
     back(motor1, motor2, -100);
    }
    if(message.data() == "left"){
      left(motor1, motor2, 100);
    }
    if(message.data() == "right"){
      right(motor1, motor2, 100);
    }
    if(message.data() == "brake"){
      brake(motor1, motor2);
    }
}

// Handlers for websocket event
void onEventsCallback(WebsocketsEvent event, String data) {
    if(event == WebsocketsEvent::ConnectionOpened) {
        Serial.println("Connnection Opened");
    } else if(event == WebsocketsEvent::ConnectionClosed) {
        Serial.println("Connnection Closed");
    } else if(event == WebsocketsEvent::GotPing) {
        Serial.println("Got a Ping!");
    } else if(event == WebsocketsEvent::GotPong) {
        Serial.println("Got a Pong!");
    }
}

WebsocketsClient client;
void setup() {
    //Serial.begin(115200);
    // Connect to wifi
    WiFi.begin(ssid, password);

    // Wait some time to connect to wifi
    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
        Serial.print(".");
        delay(1000);
    }
    //Serial.print("Connected to ");
    //Serial.println(ssid);
    //Serial.print("Beginning WS Connection");

    // Setup Callbacks
    client.onMessage(onMessageCallback);
    client.onEvent(onEventsCallback);
    
    // Connect to server
    client.connect(websockets_server);

    // Send a message
    client.send("Hi Server!");
    // Send a ping
    client.ping();
}

void loop() {
    client.poll();
}
