rangeTechEx.addEventListener("input", (event) => {
  rangeTechExVal.textContent = event.target.value;
});

skipSurvey.addEventListener("click", () => {
  logParticipantAction(11);
});

submitSurvey.addEventListener("click", (e) => {
  logParticipantAction(10);
});

formSurvey.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(formSurvey);

  const request = new Request("survey.php", {
    method: "POST",
    body: formData
  });

  fetch(request);
  window.location.href = "/thanks";
});