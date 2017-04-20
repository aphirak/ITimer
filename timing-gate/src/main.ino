#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define TRACKING 4
#define LED_TRACKING 0
#define LED_CONNECTION 5
#define ID 2

const char* ssid     = "bach1";
const char* password = "aaaaaaaaaa";

#define mqtt_server "192.168.2.42"
#define mqtt_port 1883

WiFiClient espClient;
PubSubClient client(espClient);

int valueTracking = 0;
bool isDisable = false;
bool isSetup = false;
int setupTime, trackingTime, diffTime, countAgain = 0, countSetup = 0;
StaticJsonBuffer<200> jsonBuffer;
JsonObject& json = jsonBuffer.createObject();

void setup() {

  // -------------- Setup Pin --------------------
  Serial.begin(9600);
  pinMode(TRACKING, INPUT);
  pinMode(LED_TRACKING, OUTPUT);
  pinMode(LED_CONNECTION, OUTPUT);
  // ---------------------------------------------

  // -------------- Setup Wifi -------------------
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_CONNECTION, 1);
    delay(250);
    digitalWrite(LED_CONNECTION, 0);
    delay(250);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("MAC address: ");
  String macAddress = WiFi.macAddress();
  Serial.println(macAddress);
  // ---------------------------------------------

  // -------------- Setup Mqtt -------------------
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  // ---------------------------------------------
}

void loop() {

  if(!client.connected()){
    Serial.print("Attemping MQTT connecting...");
    char* name = const_cast<char*>(String(random(10000)).c_str());
    Serial.print(name);
    if(client.connect(name)){
      Serial.println("connected");
      client.subscribe("/TIMINGGATE");
      digitalWrite(LED_CONNECTION, 1);
      digitalWrite(LED_TRACKING, 1);
    } else{
      digitalWrite(LED_CONNECTION, 1);
      delay(250);
      digitalWrite(LED_CONNECTION, 0);
      delay(250);
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in few seconds");
    }
  } else {
    // ------------- Check Tickle ------------------
    valueTracking = !digitalRead(TRACKING);

    if(!isSetup){
      if(valueTracking){
        ++countSetup;
      } else {
        countSetup = 0;
      }

      if(countSetup >= 10){
        digitalWrite(LED_TRACKING, valueTracking);
      } else {
        digitalWrite(LED_TRACKING, 0);
        delay(50);
      }
    }
    else if(!valueTracking && !isDisable){
      isDisable = true;
      trackingTime = millis();
      diffTime = trackingTime - setupTime;
      Serial.println("Tracking");
      json["id"] = ID;
      json["type"] = "tracking";
      json["payload"] = diffTime;
      String output;
      json.printTo(output);
      client.publish("/TIMINGGATE/TRACKING", output.c_str());
      digitalWrite(LED_TRACKING, 0);
    }
    // ---------------------------------------------
  }
  client.loop();
}

void callback(char* topic, byte* payload, uint length){
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String msg = "";
  int i = 0;
  while (i<length) msg += (char)payload[i++];

  if(msg == "SETUP"){
    isSetup = true;
    setupTime = millis();
    digitalWrite(LED_TRACKING, 1);
  } else if(msg == "AGAIN" && isDisable){
    ++countAgain;
    if(countAgain == 2){
      countAgain = 0;
      isSetup = true;
      isDisable = false;
      digitalWrite(LED_TRACKING, 1);
    }
  } else if(msg == "RESET"){
    countAgain = 0;
    isDisable = false;
    isSetup = false;
  } else if(msg == "STATUS"){
    json["id"] = ID;
    json["type"] = "status";
    json["payload"] = 1;
    String output;
    json.printTo(output);
    client.publish("/TIMINGGATE/TRACKING", output.c_str());
  }
  Serial.println(msg);
}
