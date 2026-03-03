#include <AutOBot.h>

AutOBot robot;

void setup() {
    robot.begin(DRIVE_OMNI_3W, -10);
  
}
void loop() {
    robot.goForward(80, 4000);
    delay(1000);
  
}
