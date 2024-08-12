rangeTechEx.addEventListener("input", (event) => {
  rangeTechExVal.textContent = event.target.value;
});

skipSurvey.addEventListener("click", async () => {
  await logParticipantAction(11);
  window.location.href = "/thanks/";
});

submitSurvey.addEventListener("click", async (e) => {
  await logParticipantAction(10);
  window.location.href = "/thanks/";
});

formSurvey.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(formSurvey);

  const request = new Request("survey.php", {
    method: "POST",
    body: formData
  });

  fetch(request);
  window.location.href = "/thanks/";
});