#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define TRACKING 4
#define LED_TRACKING 0
#define LED_CONNECTION 5

const char* ssid     = "bach1";
const char* password = "aaaaaaaaaa";
// const char* ssid     = "James";
// const char* password = "12345678";

#define mqtt_server "192.168.2.42"
// #define mqtt_server "172.20.10.2"
#define mqtt_port 1883
// #define mqtt_port 1900

WiFiClient espClient;
PubSubClient client(espClient);

int valueTracking = 0;
bool isDisable = false;
bool isSetup = false;
int setupTime, trackingTime, diffTime, countAgain = 0;

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
    if(client.connect("TimingGate222")){
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
    valueTracking = digitalRead(TRACKING);

    if(!isSetup){
      digitalWrite(LED_TRACKING, valueTracking);
    }
    else if(valueTracking && !isDisable){
      isDisable = true;
      trackingTime = millis();
      diffTime = trackingTime - setupTime;
      Serial.println(String(diffTime));
      Serial.println("Tracking");
      client.publish("/TIMINGGATE/TRACKING", String(diffTime).c_str());

      // Serial.println("Tracking");
      // client.publish("/TIMINGGATE/TRACKING", "1");
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
    isDisable = false;
    isSetup = false;
    Serial.println(msg);
    return;
  }
  Serial.println(msg);
}
