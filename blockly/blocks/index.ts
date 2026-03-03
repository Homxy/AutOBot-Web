import { initArduinoBlocks } from "./arduino.blocks";
import { initAutOBotBlocks } from "./autobot.blocks";
import { initAutOBotAIBlocks } from "./autobot_ai.blocks";

export function initAllBlocks() {
    initArduinoBlocks();
    initAutOBotBlocks();
    initAutOBotAIBlocks();
}
