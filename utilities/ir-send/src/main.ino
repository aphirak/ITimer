void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
	tone(13,38000);
}

void loop(){
  digitalWrite(13, 1);
}
