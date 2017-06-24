#define SENSOR_IR 4
#define LED_TRACKING 5

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_IR, INPUT);
  pinMode(LED_TRACKING, OUTPUT);
}

void loop() {
  Serial.println(digitalRead(SENSOR_IR));
  digitalWrite(LED_TRACKING, !digitalRead(SENSOR_IR));
}
