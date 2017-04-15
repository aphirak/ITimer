void setup() {
  Serial.begin(9600);
  pinMode(4, INPUT);
  pinMode(5, OUTPUT);
}


void loop() {
  Serial.println(digitalRead(4));
  digitalWrite(5, !digitalRead(4));
}
