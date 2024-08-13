btnStartExperiment.addEventListener('click', startExperiment);
btnCancelExperiment.addEventListener('click', cancelExperiment);

user_study_about_text.setAttribute("data-i18n", "user_study_about_text" + getCookie("task"));
summary_text.setAttribute("data-i18n", "summary_text" + getCookie("task"));

async function startExperiment() {
    await logParticipantAction(0);
    if (getCookie("task") == 1) {
        window.location.href = "/sendFile/";
        return;
    }
    window.location.href = "/control/";
}

function cancelExperiment() {
    window.location.href = "/cancel/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}