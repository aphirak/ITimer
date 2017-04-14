
void setup() {
  Serial.begin(9600);
  // pinMode(LED_BUILTIN, OUTPUT);
  pinMode(12, INPUT);
  pinMode(13, OUTPUT);
}


void loop() {
  // Serial.println(digitalRead(12));
  digitalWrite(13, 1);

  // Serial.println("start");
  // Serial.println(digitalRead(4));
  // digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  // delay(500);                       // wait for a second
  // digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  // delay(500);                       // wait for a second
}
