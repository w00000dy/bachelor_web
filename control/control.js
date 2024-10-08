var movementX = 0, movementY = 0, scroll = 0;
var lastUpdate = 0;

const canvas = document.getElementById('canvas');

btnStartRemoteControl.addEventListener('click', startRemoteControl);
document.addEventListener("pointerlockchange", pointerLockChange);

loadYoutubeVideo();

async function startRemoteControl() {
    await logParticipantAction(6);
    canvas.requestPointerLock();
}

async function pointerLockChange() {
    if (document.pointerLockElement === canvas) {
        console.log("The pointer lock status is now locked");
        document.addEventListener("mousemove", sendMousePosition);
        document.addEventListener("keydown", sendKey);
        document.addEventListener("keyup", sendKey);
        document.addEventListener("wheel", sendScroll);
        document.addEventListener("mousedown", sendMouseClick);
        document.addEventListener("mouseup", sendMouseClick);
        escHint.hidden = false;
    } else {
        await logParticipantAction(7);
        console.log("The pointer lock status is now unlocked");
        document.removeEventListener("mousemove", sendMousePosition);
        document.removeEventListener("keydown", sendKey);
        document.removeEventListener("keyup", sendKey);
        document.removeEventListener("wheel", sendScroll);
        document.removeEventListener("mousedown", sendMouseClick);
        document.removeEventListener("mouseup", sendMouseClick);
        escHint.hidden = true;
    }
}

function sendMousePosition(e) {
    movementX += e.movementX;
    movementY += e.movementY;

    if (Date.now() > (lastUpdate + 10)) {
        let command = '`' + movementX + ',' + movementY + '\n';
        webSerialPort.writeToPort(command);
        movementX = 0;
        movementY = 0;
        lastUpdate = Date.now();
    }
}

function sendScroll(e) {
    const multiplier = -0.01;
    let command = '`0,0,' + e.deltaY * multiplier + '\n';
    webSerialPort.writeToPort(command);
}

function sendMouseClick(e) {
    let command;
    let button;
    if (e.button === 0) {
        button = 'LEFT';
    } else if (e.button === 2) {
        button = 'RIGHT';
    } else {
        console.error("Unsupported mouse button: " + e.button);
        return;
    }

    if (e.type === "mousedown") {
        command = 'MOUSE_' + button + '_DOWN';
    } else if (e.type === "mouseup") {
        command = 'MOUSE_' + button + '_UP';
    } else {
        console.error("Unknown mouse event: " + e.type);
        return;
    }
    webSerialPort.writeToPort('`' + command + '\n');
}

function sendKey(e) {
    e.preventDefault();
    let c = e.key;
    if (e.key.length > 1) {
        c = String.fromCharCode(e.keyCode);
    }
    switch (e.key) {
        case "Enter":
            c = '\n';
            break;
        case "Shift":
            c = '`KEY_LEFT_SHIFT_DOWN\n';
            break;
        case "Control":
            c = '`KEY_LEFT_CTRL_DOWN\n';
            break;
        case "Alt":
            c = '`KEY_LEFT_ALT_DOWN\n';
            break;
        case "AltGraph":
            c = '`KEY_RIGHT_ALT_DOWN\n';
            break;
        case "Delete":
            c = '`KEY_DELETE\n';
            break;
        case "End":
            c = '`KEY_END\n';
            break;
        case "ArrowUp":
            c = '`KEY_UP_ARROW\n';
            break;
        case "ArrowDown":
            c = '`KEY_DOWN_ARROW\n';
            break;
        case "ArrowLeft":
            c = '`KEY_LEFT_ARROW\n';
            break;
        case "ArrowRight":
            c = '`KEY_RIGHT_ARROW\n';
            break;
    }

    if (e.type === "keyup") {
        switch (e.key) {
            case "Shift":
                c = '`KEY_LEFT_SHIFT_UP\n';
                break;
            case "Control":
                c = '`KEY_LEFT_CTRL_UP\n';
                break;
            case "Alt":
                c = '`KEY_LEFT_ALT_UP\n';
                break;
            case "AltGraph":
                c = '`KEY_RIGHT_ALT_UP\n';
                break;
            default:
                return;
        }
    }

    webSerialPort.writeToPort(c);
}

async function loadYoutubeVideo() {
    const videoIds = ["LXb3EKWsInQ", "1La4QzGeaaQ", "CHSnz0bCaUk"];
    const videoId = videoIds[Math.floor(Math.random() * videoIds.length)];
    const url = new URL(videoId, "https://www.youtube.com/embed/");
    ytVideo.src = url;
}