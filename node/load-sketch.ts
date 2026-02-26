import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import { ArduinoCoreServiceClient } from './cc/arduino/cli/commands/v1/commands_grpc_pb';
import { LoadSketchRequest, LoadSketchResponse } from './cc/arduino/cli/commands/v1/commands_pb';

export async function callLoadSketch(client: ArduinoCoreServiceClient): Promise<void> {
  try {
    const currDir = process.cwd();
    const request = new LoadSketchRequest();
    request.setSketchPath(path.join(currDir, "node/hello"));

    const sketchResp = await client.loadSketch(request, (error: grpc.ServiceError | null, response: LoadSketchResponse) => {
        
        if (error) {
            console.error("Error loading sketch:", error.message);
            return;
        }

        if (!sketchResp) {
        console.error("No response received");
        return;
        }

        const sketch = response.getSketch();
        if (!sketch) {
            console.error("No sketch data in response");
            return;
        }
    });

  } catch (err) {
    console.error(`Error : ${err}`);
    process.exit(1);
  }
}
