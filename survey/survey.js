rangeTechEx.addEventListener("input", (event) => {
  rangeTechExVal.textContent = event.target.value;
});

skipSurvey.addEventListener("click", () => {
  logParticipantAction(11);
});

submitSurvey.addEventListener("click", () => {
  logParticipantAction(10);
});