import { resolve } from 'path';
import { createArduinoCoreServiceClient } from './arduino-core-service';
import { initInstance,
         createInstance,
         callBoardList} from './arduino-core-sevice-provider';
import { IPort } from './IPort';


export async function getPort() : Promise<IPort[]> {
  const client = createArduinoCoreServiceClient({ port: 50051 });


  const instance = await createInstance(client);

  await initInstance(client, instance);
  const ports = await callBoardList(client, instance);
  return new Promise((resolve, reject) => {
    if (ports) {
      resolve(ports);
    } else {
      reject("No ports found");
    }
  });
}



