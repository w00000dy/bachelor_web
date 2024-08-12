btnStartExperiment.addEventListener('click', startExperiment);

async function startExperiment() {
    await logParticipantAction(0);
    window.location.href = "/control/";
}