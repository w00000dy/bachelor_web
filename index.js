btnStartExperiment.addEventListener('click', startExperiment);
btnCancelExperiment.addEventListener('click', cancelExperiment);

async function startExperiment() {
    await logParticipantAction(0);
    window.location.href = "/control/";
}

function cancelExperiment() {
    window.location.href = "/cancel/";
}