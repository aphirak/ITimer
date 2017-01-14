#define SWITCH 0
#define LED 4

int valueSwitch = 0;

void setup() {
  Serial.begin(9600);
  pinMode(SWITCH, INPUT);
  pinMode(LED, OUTPUT);
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
