var connected = false;

const webSerialPort = new WebSerialPort();

btnCancelExperiment.addEventListener('click', cancelExperiment);
dialogClose.addEventListener('click', closeDialog);
dialogBtnCancel.addEventListener('click', closeDialog);
dialogBtnGoToTask.addEventListener('click', goToTask);

restartESP();

async function closeDialog() {
    await logParticipantAction(4);
    window.location.href = "/";
}

webSerialPort.getPort().then((port) => {
    port.addEventListener('online', async (e) => {
        if (e.detail.startsWith("Connected")) {
            await logParticipantAction(1);
            connected = true;
        }
        if (e.detail.startsWith("The passkey YES/NO number:")) {
            let passkey = e.detail.split(":")[1].trim();
            pairingCodeNumber.innerText = Math.floor(Math.random() * 900000) + 100000;
            while (passkey === pairingCode.innerText) {
                pairingCodeNumber.innerText = Math.floor(Math.random() * 900000) + 100000;
            }
            pairingCode.hidden = false;
            pairingCodeNumber.hidden = false;
        }
        if (e.detail.startsWith("Authentication Complete") && connected) {
            dialogBtnWaitingForConnection.hidden = true;
            dialogBtnGoToTask.hidden = false;
            setTimeout(async () => {
                if (connected) {
                    await logParticipantAction(5);
                    dialogBtnGoToTask.disabled = false;
                }
            }, 3000);
        }
        if (e.detail.startsWith("Disconnected")) {
            await logParticipantAction(2);
            connected = false;
            btDialog.show();
            restartESP();
            pairingCode.hidden = true;
            pairingCodeNumber.hidden = true;
            dialogBtnWaitingForConnection.hidden = false;
            dialogBtnGoToTask.hidden = true;
            dialogBtnGoToTask.disabled = true;
            document.pointerLockElement = null;
        }
    });
});

function restartESP() {
    console.info("♻️ Restarting ESP32");
    webSerialPort.writeToPort('\x1B');
}

async function goToTask() {
    await logParticipantAction(3);
    btDialog.close();
}

btnTaskNotDone.addEventListener("click", async () => {
    await logParticipantAction(9);
    window.location.href = "/survey/";
});

btnTaskDone.addEventListener("click", async () => {
    logParticipantAction(8);
    window.location.href = "/survey/";
});

function cancelExperiment() {
    window.location.href = "/cancel/";
}