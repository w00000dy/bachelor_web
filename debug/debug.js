var term = new Terminal();
var webSerialPort = new WebSerialPort();
var port;

loadCurrentParticipant();

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
    formData.append("task", task.value);

    const myRequest = new Request("registerParticipant.php", {
        method: "POST",
        body: formData
    });

    const response = await fetch(myRequest);

    if (!response.ok) {
        alert("Error: " + response.status + "\n" + response.statusText);
        return;
    }

    loadCurrentParticipant();
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

function loadCurrentParticipant() {
    participantId.innerText = getCookie("participant");
    participantTask.innerText = getCookie("task");
}

async function setParticipantID(id) {
    const formData = new FormData();
    formData.append("password", password.value);
    formData.append("id", id);

    const myRequest = new Request("setParticipantID.php", {
        method: "POST",
        body: formData
    });

    const response = await fetch(myRequest);

    if (!response.ok) {
        alert("Error: " + response.status + "\n" + response.statusText);
        return;
    }
    
    loadCurrentParticipant();
}

btnScreenshotUpload.addEventListener("click", () => {
    window.location.href = "/screenshot/?uid=" + getCookie("participant");
});

btnLoadParticipants.addEventListener("click", async () => {
    const formData = new FormData();
    formData.append("password", password.value);

    const myRequest = new Request("getParticipants.php", {
        method: "POST",
        body: formData
    });

    const response = await fetch(myRequest);

    if (!response.ok) {
        alert("Error: " + response.status + "\n" + response.statusText);
        return;
    }

    response.json().then((data) => {
        participantList.innerHTML = "";
        data.forEach((participant) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.innerText = participant.id;
            const td2 = document.createElement("td");
            td2.innerText = participant.task;
            const td3 = document.createElement("td");
            td3.innerText = participant.reg_date;
            const td4 = document.createElement("td");
            const setID = document.createElement("a");
            setID.innerText = "✏️";
            setID.addEventListener("click", () => {
                setParticipantID(participant.id);
            });
            td4.appendChild(setID);
            const td5 = document.createElement("td");
            const del = document.createElement("a");
            del.innerText = "🗑️";
            td5.appendChild(del);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            participantList.appendChild(tr);
        });
    });
});