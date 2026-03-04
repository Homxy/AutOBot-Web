#include <AutOBot.h>

AutOBot robot;

void setup() {
    robot.begin(DRIVE_DIFFERENTIAL, 0);
  
}
void loop() {
    robot.rotateCCW(80, 4000);
    delay(1000);
  
}
