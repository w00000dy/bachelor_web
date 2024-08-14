btnCancelExperiment.addEventListener('click', cancelExperiment);

function cancelExperiment() {
  window.location.href = "/cancel/";
}

rangeTechEx.addEventListener("input", (event) => {
  rangeTechExVal.textContent = event.target.value;
});

bluetoothSecurity.addEventListener("input", (event) => {
  bluetoothSecurityVal.textContent = event.target.value;
});

skipSurvey.addEventListener("click", async () => {
  await logParticipantAction(11);
  window.location.href = "/thanks/";
});

formSurvey.addEventListener("submit", async (e) => {
  e.preventDefault();
  const log = logParticipantAction(10);

  const formData = new FormData(formSurvey);

  const request = new Request("survey.php", {
    method: "POST",
    body: formData
  });

  const response = fetch(request);
  Promise.all([log, response]).then((values) => {
    if (values[1].ok) {
      window.location.href = "/thanks/";
    } else {
      localStorage.setItem("survey", JSON.stringify(Object.fromEntries(formData)));
      window.location.href = "/error/";
    }
  });
});