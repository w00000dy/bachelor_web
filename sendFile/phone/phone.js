var fileUploaded = false;
var connectionStatus;

fetchStatus();

formFile.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch('status.php').then(response => {
        return response.text();
    }
    ).then(data => {
        console.log(data);
        if (data === '3') {
            fileUploaded = true;
            btnSubmit.disabled = true;
            fakeUpload();
        }
    });
});

async function fakeUpload() {
    progress.hidden = false;
    let random = Math.floor(Math.random() * 5) + 8;
    progress.value += random;
    if (progress.value < progress.max) {
        setTimeout(fakeUpload, 10);
    }
    else {
        progress.hidden = true;
        btnSubmit.disabled = false;
        fileUploaded = true;
        fileUploadedText.hidden = false;
        notConnected.hidden = true;
        connecting.hidden = true;
        connected.hidden = true;
        alert(langData['fileSuccess']);
        progress.value = 0;
    }
}

async function fetchStatus() {
    let response;
    let data;
    try {
        response = await fetch('status.php');
        data = await response.text();
    }
    catch (error) {
        console.error('Error:', error);
    }
    connectionStatus = data;
    if (fileUploaded) {
        return;
    }
    switch (data) {
        case '5':
            notConnected.hidden = true;
            connecting.hidden = false;
            connected.hidden = true;
            btnSubmit.disabled = true;
            break;
        case '3':
            notConnected.hidden = true;
            connecting.hidden = true;
            connected.hidden = false;
            btnSubmit.disabled = false;
            break;
        default:
            notConnected.hidden = false;
            connecting.hidden = true;
            connected.hidden = true;
            btnSubmit.disabled = true;
    }
    setTimeout(fetchStatus, 1000);
}