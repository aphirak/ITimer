#include <ESP8266WiFi.h>

#define SWITCH 0
#define LED 4

const char* ssid     = "bach1";
const char* password = "aaaaaaaaaa";

int valueSwitch = 0;
String macAddress = "";

void setup() {
  Serial.begin(9600);
  pinMode(SWITCH, INPUT);
  pinMode(LED, OUTPUT);

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
}

void loop() {
  valueSwitch = digitalRead(SWITCH);
  if(valueSwitch){
    Serial.println("Click");
    digitalWrite(LED, 1);
  } else {
    digitalWrite(LED, 0);
  }
  delay(100);
}
