import * as path from "path";
import { createArduinoCoreServiceClient } from './arduino-core-service';
import { initInstance,
         createInstance,
         callCompile,
         callUpload} from './arduino-core-sevice-provider';
import { callLoadSketch } from './load-sketch';
import { settingDir,
          callConfigurationSave,
          callSetValue,
          callSetProxy
        } from './arduino-settings';

export async function runMain(uploadPort: string) {
  
  const client = createArduinoCoreServiceClient(
    { port: 50051 }
  );

  const dataDir = settingDir();
  callLoadSketch(client);

  callLoadSketch(client)

  dataDir.then((result) => {
  const dataDirStr = result.toString(); 
    
    callSetValue(client, "directories.data", JSON.stringify(path.join(dataDirStr)));
    callSetValue(client, "directories.downloads", JSON.stringify(path.join(dataDirStr, "staging")));
    callSetValue(client, "directories.user", JSON.stringify(path.join(dataDirStr, "sketchbook")));
  })

  callSetValue(client, "daemon.port", `"422"`)
  callSetValue(client, "board_manager.additional_urls", `[ "https://dl.espressif.com/dl/package_esp32_index.json" ]`)

  callSetValue(client, "daemon.port", `""`)
  callSetProxy(client)

  callConfigurationSave(client)
  callConfigurationSave(client)

  const instance = await createInstance(client);
  await initInstance(client, instance);
  await callCompile(client, instance);
  const uploadResult = await callUpload(client, instance, uploadPort);
  return new Promise((resolve, reject) => {
    if (uploadResult) {
      resolve(uploadResult);
    } else {
      reject("Upload failed");
    }
  });
}
