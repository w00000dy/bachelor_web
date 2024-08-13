function actionIdToString(actionId) {
    switch (actionId) {
        case 0:
            return 'started Experiment';
        case 1:
            return 'connected his Smartphone via Bluetooth';
        case 2:
            return 'disconnected his Smartphone';
        case 3:
            return 'pressed the "Go to Task" button in the dialog';
        case 4:
            return 'pressed the cancel button in the dialog';
        case 5:
            return 'confirmed the pairing code on his Smartphone';
        case 6:
            return 'started remote control';
        case 7:
            return 'stopped remote control';
        case 8:
            return 'finished the task';
        case 9:
            return 'could not finish the task';
        case 10:
            return 'submitted the survey';
        case 11:
            return 'skipped the survey';
        case 200:
            return 'went to the cancel Experiment page';
        case 201:
            return 'went back to the Experiment';
        case 202:
            return 'cancelled the Experiment but went to the survey';
        case 203:
            return 'completly cancelled the Experiment';
        case 254:
            return 'encountered an error';
        case 255:
            return 'completed Experiment';
        default:
            return 'did something';
    }
}

async function logParticipantAction(actionId) {
    console.log(`🕵️ Participant ${actionIdToString(actionId)}.`);

    const formData = new FormData();
    formData.append("action", actionId);

    const myRequest = new Request("/logger.php", {
        method: "POST",
        body: formData
    });

    await fetch(myRequest);
}