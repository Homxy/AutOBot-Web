export async function SerialStreaming(onData: (value: string) => void) {
    if (!("serial" in navigator)) {
        throw new Error("Web Serial API not supported");
    }

    const port = await (navigator as any).serial.requestPort();
    await port.open({ baudRate: 115200 });

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    const startTime = Date.now();
    const duration = 10000;

    try {
        while (true) {
        if (Date.now() - startTime >= duration) {
            console.log("10 seconds elapsed. Closing stream...");
            break;
        }

        const { value, done } = await reader.read();
        
        if (done) break;
        if (value) onData(value);
        }
    } catch (error) {
        console.error("Read error:", error);
    } finally {
        reader.releaseLock();
        await port.close();
        console.log("Port closed.");
    }
}