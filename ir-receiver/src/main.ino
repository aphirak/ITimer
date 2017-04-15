// #include <IRremoteESP8266.h>
//
// int RECV_PIN = 4; //an IR detector/demodulatord is connected to GPIO pin 2
//
// IRrecv irrecv(RECV_PIN);
//
// decode_results results;
//
// void setup()
// {
//   Serial.begin(9600);
//   irrecv.enableIRIn(); // Start the receiver
// }
//
// void loop() {
//   if (irrecv.decode(&results)) {
//     if(results.decode_type == SONY){
//       Serial.println(results.value);
//     }
//     // Serial.println(results.decode_type);
//     // Serial.println(results.value, HEX);
//     irrecv.resume(); // Receive the next value
//   }
//   delay(100);
// }













//
void setup() {
  Serial.begin(9600);
  // pinMode(LED_BUILTIN, OUTPUT);
  pinMode(4, INPUT);
  pinMode(5, OUTPUT);
  // pinMode(0, OUTPUT);
}


void loop() {
  // Serial.println("start");
  // digitalWrite(0, 1);
  Serial.println(digitalRead(4));
  digitalWrite(5, !digitalRead(4));
  // delay(1000);
}
