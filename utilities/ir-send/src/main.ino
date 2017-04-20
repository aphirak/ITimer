#define LED_IR 13

void setup() {
  Serial.begin(9600);
  pinMode(LED_IR, OUTPUT);
	tone(LED_IR,38000);
}

void loop(){
  digitalWrite(LED_IR, 1);
}
