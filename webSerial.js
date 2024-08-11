class WebSerialPort {
    constructor() {
        this.port = new Promise((resolve, reject) => {
            navigator.serial.getPorts().then(async (ports) => {
                if (ports.length === 0) {
                    reject("No ports available");
                } else {
                    console.log("Ports: ", ports);
                    let port = ports[0];
                    await port.open({ baudRate: 115200 });
                    resolve(port);
                }
            });
        });

        this.startReader();
    }

    async getPort() {
        return this.port;
    }

    async startReader() {
        let port = await this.port;
        let buffer = '';
        while (port.readable) {
            const reader = port.readable.getReader();
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        // |reader| has been canceled.
                        break;
                    }
                    
                    const eventOnData = new CustomEvent("ondata", { detail: value });
                    port.dispatchEvent(eventOnData);

                    for (const byte of new Uint8Array(value)) {
                        buffer += String.fromCharCode(byte);
                        if (byte === 10) { // newline
                            console.debug("📩 ", buffer);
                            const eventOnLine = new CustomEvent("online", { detail: buffer });
                            port.dispatchEvent(eventOnLine);
                            buffer = '';
                        }
                    }
                }
            } catch (error) {
                // Handle |error|…
            } finally {
                reader.releaseLock();
            }
        }
    }

    writeToPort(data) {
        this.port.then((port) => {
            const writer = port.writable.getWriter();
            const encoder = new TextEncoder();
            console.debug("📤 ", data);
            writer.write(encoder.encode(data));
            writer.releaseLock();
        });
    }
}

navigator.serial.addEventListener("connect", (e) => {
    console.log("Connected with port");
});

navigator.serial.addEventListener("disconnect", (e) => {
    console.log("Disconnected with port");
    window.location.href = "/error";
});
