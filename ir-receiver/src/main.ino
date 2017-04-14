
void setup() {
  Serial.begin(9600);
  // pinMode(LED_BUILTIN, OUTPUT);
  pinMode(4, INPUT);
  pinMode(5, OUTPUT);
}


void loop() {
  Serial.println("start");
  Serial.println(digitalRead(4));
  digitalWrite(5, !digitalRead(4));
  // Serial.println(digitalRead(4));
  // digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  // delay(500);                       // wait for a second
  // digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  // delay(500);                       // wait for a second
}
