import * as grpc from '@grpc/grpc-js';
import { ArduinoCoreServiceClient } from './cc/arduino/cli/commands/v1/commands_grpc_pb';
import { SettingsSetValueRequest,  
        ConfigurationSaveRequest,
        ConfigurationSaveResponse, } 
        from './cc/arduino/cli/commands/v1/settings_pb';
import { tmpdir } from "os";
import { join } from "path";
import { promises as fs } from "fs";



export async function callSetValue(client: ArduinoCoreServiceClient, key: string, jsonValue: string): Promise<void> {
    console.log(`Calling SetValue: ${key} = ${jsonValue}`);
    
    const request = new SettingsSetValueRequest()
                        .setKey(key)
                        .setEncodedValue(jsonValue);

    client.settingsSetValue(request, (err: grpc.ServiceError | null) => {
        if (err) {
            console.error(`Error setting settings value: ${err.message}`);
            process.exit(1);
        }
    });
}

export async function callSetProxy(client: ArduinoCoreServiceClient): Promise<void> {
    const request = new SettingsSetValueRequest()
        .setKey('network.proxy')
        .setEncodedValue('"http://localhost:3128"');

    client.settingsSetValue(request, (err: grpc.ServiceError | null) => {
        if (err) {
            console.error(`Error setting settings value: ${err.message}`);
            process.exit(1);
        }
    });
}

export async function callConfigurationSave(client: ArduinoCoreServiceClient): Promise<void> {
    console.log("Calling ConfigurationSave() >>");
    const request = new ConfigurationSaveRequest();
    request.setSettingsFormat('json');
    client.configurationSave(request, (err: grpc.ServiceError | null, response: ConfigurationSaveResponse) => {
        if (err) {
            console.error(`Error setting settings value: ${err.message}`);
            process.exit(1);
        }

        console.log("Settings follow:\n\n" + response.getEncodedSettings());

    });
}

export async function settingDir(): Promise<string> {
    const dataDir = join(process.cwd(), "node/arduino-rpc-client");
    
    return dataDir.replace(/\\/g, "/");
}

