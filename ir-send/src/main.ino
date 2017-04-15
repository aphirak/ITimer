// #include <IRremote.h>
//
// IRsend irsend;
//
// void setup()
// {
//   // irsend.begin();
//   // irsend.enableIROut(38);
// }
//
// void loop() {
//   // for (int i = 0; i < 3; i++) {
// 		irsend.sendSony(1, 12);
// 		delay(40);
// 	// }
//   // delay(2000);
// 	// delay(5000); //5 second delay between each signal burst
// }


//
void setup() {
  Serial.begin(9600);
  // pinMode(LED_BUILTIN, OUTPUT);
  // pinMode(12, INPUT);
  pinMode(3, OUTPUT);
	tone(3,38000);
}


void loop() {
  // Serial.println(digitalRead(12));
  digitalWrite(3, 1);

  // Serial.println("start");
  // Serial.println(digitalRead(4));
  // digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  // delay(500);                       // wait for a second
  // digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  // delay(500);                       // wait for a second
}
