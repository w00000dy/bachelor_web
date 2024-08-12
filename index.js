btnStartExperiment.addEventListener('click', startExperiment);

function startExperiment() {
    logParticipantAction(0);
    window.location.href = "/control/";
}