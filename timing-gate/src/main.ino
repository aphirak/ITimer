#include <ESP8266WiFi.h>

#define TICKLE 0
#define LED_TICKLE 4
#define LED_WIFI 5

const char* ssid     = "bach1";
const char* password = "aaaaaaaaaa";

int valueTickle = 0;
String macAddress = "";

void setup() {

  // -------------- Setup Pin --------------------
  Serial.begin(9600);
  pinMode(TICKLE, INPUT);
  pinMode(LED_TICKLE, OUTPUT);
  pinMode(LED_WIFI, OUTPUT);
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
  
}

void loop() {

  // ---------- Check Connect Wifi ---------------
  if(WiFi.status() == WL_CONNECTED){
    digitalWrite(LED_WIFI, 1);
  } else {
    digitalWrite(LED_WIFI, 0);
  }
  // ---------------------------------------------

  // ------------- Check Tickle ------------------
  valueTickle = digitalRead(TICKLE);
  if(valueTickle){
    Serial.println("Click");
    digitalWrite(LED_TICKLE, 1);
  } else {
    digitalWrite(LED_TICKLE, 0);
  }
  // ---------------------------------------------

  delay(100);
}
