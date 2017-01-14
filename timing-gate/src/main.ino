#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define TICKLE 0
#define LED_TICKLE 4
#define LED_CONNECTION 5

const char* ssid     = "bach1";
const char* password = "aaaaaaaaaa";

#define mqtt_server "192.168.2.44"
#define mqtt_port 1900

WiFiClient espClient;
PubSubClient client(espClient);

int valueTickle = 0;
bool isDisable = false;
String macAddress;
// char* mqttTopic;

void setup() {

  // -------------- Setup Pin --------------------
  Serial.begin(9600);
  pinMode(TICKLE, INPUT);
  pinMode(LED_TICKLE, OUTPUT);
  pinMode(LED_CONNECTION, OUTPUT);
  // ---------------------------------------------

  // -------------- Setup Wifi -------------------
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("MAC address: ");
  macAddress = WiFi.macAddress();
  Serial.println(macAddress);
  // ---------------------------------------------

  // -------------- Setup Mqtt -------------------
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  // ---------------------------------------------
  // strcat(mqttTopic, "/TIMINGGATE/");
  // strcat(mqttTopic, macAddress.c_str());
  // strcat(mqttTopic, "/TICKLE");
  // mqttTopic += "/";
  // mqttTopic += macAddress;
  // mqttTopic += "/TICKLE";
  // Serial.println(mqttTopic);
}

void loop() {

  if(!client.connected()){
    Serial.print("Attemping MQTT connecting...");
    if(client.connect("TimingGate")){
      Serial.println("connected");
      client.subscribe("/TIMINGGATE");
      digitalWrite(LED_CONNECTION, 1);
      digitalWrite(LED_TICKLE, 1);
    } else{
      digitalWrite(LED_CONNECTION, 0);
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  } else {
    // ------------- Check Tickle ------------------
    valueTickle = digitalRead(TICKLE);
    if(valueTickle && !isDisable){
      isDisable = true;
      Serial.println("Tickle");
      client.publish("/TIMINGGATE/TICKLE", "1");
      digitalWrite(LED_TICKLE, 0);
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
  if(msg == "RESET"){
    isDisable = false;
    digitalWrite(LED_TICKLE, 1);
    Serial.println(msg);
    return;
  }
  Serial.println(msg);
}
