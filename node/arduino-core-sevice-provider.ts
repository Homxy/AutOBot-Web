import * as grpc from '@grpc/grpc-js';
import { ArduinoCoreServiceClient } from './cc/arduino/cli/commands/v1/commands_grpc_pb';
import { Instance} from './cc/arduino/cli/commands/v1/common_pb';
import {InitRequest,
        InitResponse,
        CreateRequest,
        UpdateIndexRequest,
        } from './cc/arduino/cli/commands/v1/commands_pb';
import { PlatformInstallRequest,
          PlatformSearchRequest,
          PlatformSearchResponse,
 } from './cc/arduino/cli/commands/v1/core_pb';
import { BoardDetailsRequest,
         BoardDetailsResponse,
         BoardListRequest,
         BoardListResponse
        } from './cc/arduino/cli/commands/v1/board_pb';
import { CompileRequest,
         CompileResponse
        } from './cc/arduino/cli/commands/v1/compile_pb';
import { UploadRequest,
         UploadResponse
        } from './cc/arduino/cli/commands/v1/upload_pb';
import { Port } from './cc/arduino/cli/commands/v1/port_pb';
import { IPort } from './IPort';

export async function initInstance(client: ArduinoCoreServiceClient, instance: Instance): Promise<void> {
  try {
    const request = new InitRequest();
    request.setInstance(instance);

    const stream = client.init(request);

    await new Promise<void>((resolve, reject) => {
      stream.on('error', (err: grpc.ServiceError) => {
        console.error('Init error:', err.message);
        reject(err);
      });

      stream.on('end', () => {
        resolve();
      });

      stream.on('data', (response: InitResponse) => {
        const status = response.getError();
        if (status) {
          console.error('Init error:', status.getMessage());
        }

        const progress = response.getInitProgress();
        if (progress) {
          const downloadProgress = progress.getDownloadProgress();
          if (downloadProgress) {
            console.log('DOWNLOAD:', downloadProgress);
          }
          const taskProgress = progress.getTaskProgress();
          if (taskProgress) {
            console.log('TASK:', taskProgress);
          }
        }
      });
    });
  } catch (err) {
    console.error(`Error initializing server instance: ${err}`);
    process.exit(1);
  }
}

export async function createInstance(client: ArduinoCoreServiceClient) : Promise<Instance> {
    const instance = await new Promise<Instance>((resolve, reject) => {
      client.create(new CreateRequest(), (err, resp) => {
        if (err) {
          reject(err);
          return;
        }
        const instance = resp.getInstance();
        if (!instance) {
          reject(
            new Error(
              '`CreateResponse` was OK, but the retrieved `instance` was `undefined`.'
            )
          );
          return;
        }
        resolve(instance);
      });
    });

    return instance;
}

export async function callCompile(client: ArduinoCoreServiceClient, instance: Instance): Promise<void> {
  return new Promise((resolve, reject) => {
    const currDir = process.cwd();

    const request = new CompileRequest()
                        .setInstance(instance)
                        .setFqbn("esp32:esp32:esp32")
                        .setSketchPath(require("path").join(currDir, "node/hello"))
                        .setVerbose(true);

    const stream = client.compile(request);

    stream.on("data", (compResp: CompileResponse) => {
      if (compResp.getOutStream()) {
        console.log("STDOUT:", compResp.getOutStream());
        console.log("Progress:",compResp.getProgress());
        // console.log("Progress:", compResp.getProgress()?.getMessage());
      }
      if (compResp.getErrStream()) {
        console.error("STDERR:", compResp.getErrStream());
      }
    });

    stream.on("end", () => {
      console.log("Compilation done");
      resolve();
    });

    stream.on("error", (err: any) => {
      console.error("Compile error:", err);
      reject(err);
    });
  });
}

export async function callUpload(client: ArduinoCoreServiceClient, instance: Instance, portAdress: string): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const currDir = process.cwd();

    const req = new UploadRequest()
                    .setInstance(instance)
                    .setFqbn("esp32:esp32:esp32")
                    .setSketchPath(require("path").join(currDir, "node/hello"))
                    .setVerbose(true);

    const port = new Port();
    port.setAddress(portAdress);
    port.setProtocol("serial");
    req.setPort(port);

    const stream = client.upload(req);
    
    stream.on("data", (uplResp: UploadResponse) => {
      if (uplResp.getOutStream()) {
        console.log("STDOUT:", uplResp.getOutStream());
      }
      if (uplResp.getErrStream()) {
        console.error("STDERR:", uplResp.getErrStream());
      }
    });

    stream.on("end", () => {
      console.log("Upload done ");
      resolve(true);
    });

    stream.on("error", (err: any) => {
      console.error("Upload error:", err);
      reject(err);
    });
  });
}

export async function callBoardList(client: ArduinoCoreServiceClient, instance: Instance): Promise<IPort[] | void> {
  const maxRetries = 2;
  let returnedPort: IPort[] = [];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const request = new BoardListRequest().setInstance(instance);
      
      const response = await new Promise<BoardListResponse>((resolve, reject) => {
        client.boardList(request, (err: grpc.ServiceError | null, resp: BoardListResponse) => {
          if (err) {
            return reject(err);
          }
          resolve(resp);
        });
      });

      const ports = response.getPortsList(); 
      
      if (ports.length > 0) {
        returnedPort = ports.map(port => {
          const p = port.getPort();
          return {
            portAddress: p?.getAddress() || "",
            pid: p?.getPropertiesMap()?.get("pid") || "",
            vid: p?.getPropertiesMap()?.get("vid") || ""
          };
        });
        return returnedPort;
      }

    } catch (err) {
      console.error(`Attempt ${attempt} - Error getting board list:`, err);
    }
        if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}