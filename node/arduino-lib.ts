import * as grpc from '@grpc/grpc-js';
import { ArduinoCoreServiceClient } from './cc/arduino/cli/commands/v1/commands_grpc_pb';
import { Instance } from './cc/arduino/cli/commands/v1/common_pb';
import { ZipLibraryInstallRequest } from './cc/arduino/cli/commands/v1/lib_pb';

export async function callLibDownload(client: ArduinoCoreServiceClient, instance: Instance) : Promise<void> {
    const request = new ZipLibraryInstallRequest();
    request.setInstance(instance);

    const stream = client.zipLibraryInstall(request);

    stream.on("data", (uiResp) => {
        if (uiResp.downloadProgress) {
            console.log("DOWNLOAD:", uiResp.downloadProgress);
        }
    });

    stream.on("end", () => {
        console.log("Update index done");
    });

    stream.on("error", (err: grpc.ServiceError) => {
        console.error("Update error:", err.message);
    });
}