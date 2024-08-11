var term = new Terminal();
var webSerialPort = new WebSerialPort();
var port;

loadParticipantID();

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

btnReboot.addEventListener("click", () => {
    webSerialPort.writeToPort("\x1B");
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

btnClear.addEventListener("click", () => {
    term.clear();
});

generatePasswordHash.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("password", newPassword.value);

    const myRequest = new Request("passwordHash.php", {
        method: "POST",
        body: formData
    });

    const response = await fetch(myRequest);
    response.text().then((data) => {
        hash.innerText = data;
    });
});

btnRegisterParticipant.addEventListener("click", async () => {
    const formData = new FormData();
    formData.append("password", password.value);

    const myRequest = new Request("registerParticipant.php", {
        method: "POST",
        body: formData
    });

    const response = await fetch(myRequest);

    if (!response.ok) {
        alert("Error: " + response.status + "\n" + response.statusText);
        return;
    }

    loadParticipantID();
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loadParticipantID() {
    participantId.innerText = getCookie("participant");
}