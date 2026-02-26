#include <AutOBot.h>
#include <AutOBotPi.h>

AutOBot robot;

AutOBotAI ai;
void setup() {
    robot.begin("DRIVE_DIFFERENTIAL", 0);
  
}
void loop() {
    robot.goForward(0.5, 1000);
    delay(1000);
    robot.goBackward(0.5, 1000);
  
}
