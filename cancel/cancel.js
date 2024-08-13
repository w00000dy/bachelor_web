logParticipantAction(200);

btnCancelExperiment.addEventListener('click', async function () {
    await logParticipantAction(203);
    window.location.href = "/thanks/";
});

btnBackToExperiment.addEventListener('click', async function () {
    await logParticipantAction(201);
    window.history.back();
});

btnToSurvey.addEventListener('click', async function () {
    await logParticipantAction(202);
    window.location.href = "/survey/";
});