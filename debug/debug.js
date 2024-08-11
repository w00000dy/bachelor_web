var term = new Terminal();
var webSerialPort = new WebSerialPort();
var port;

term.open(document.getElementById('terminal'));

btnRequestPort.addEventListener("click", () => {
    const usbVendorId = 4292;
    const usbProductId = 60000;
    navigator.serial
        .requestPort({ filters: [{ usbVendorId, usbProductId }] })
        .then((p) => {
            // Connect to `port` or add it to the list of available ports.
            webSerialPort = new WebSerialPort();
            webSerialPort.getPort().then((port) => {
                port.addEventListener('ondata', (e) => {
                    term.write(e.detail);
                });
            });
        })
        .catch((e) => {
            // The user didn't select a port.
            throw e;
        });
});

btnClear.addEventListener("click", () => {
    term.clear();
});

btnReboot.addEventListener("click", () => {
    webSerialPort.writeToPort("\x1B");
});

generatePasswordHash.addEventListener("submit", async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myRequest = new Request("passwordHash.php", {
        method: "POST",
        body: JSON.stringify({ password: password.value }),
        headers: myHeaders,
    });

    const response = await fetch(myRequest);
    response.text().then((data) => {
        hash.innerText = data;
    });
});

term.onData((data) => {
    switch (data) {
        case "\r":
            data = "\r\n";
            break;
        case "\n":
            data = "\r\n";
            break;
        case "\u007F":
            data = "\b \b";
            break;
    }
    console.log(data);
    webSerialPort.writeToPort(data);
});

webSerialPort.getPort().then((port) => {
    port.addEventListener('ondata', (e) => {
        term.write(e.detail);
    });
});