// get -pico-background-color variable
var colorLight = getComputedStyle(document.documentElement).getPropertyValue('--pico-background-color');
var colorDark = getComputedStyle(document.documentElement).getPropertyValue('--pico-color');

var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: window.location.href,
	colorDark: colorDark,
	colorLight: colorLight,
});

url.innerText = window.location.href;
url.href = window.location.href;

formScreenshot.addEventListener('submit', function (e) {
	e.preventDefault();
	const data = new FormData(formScreenshot);
	let urlParams = new URLSearchParams(window.location.search);
	data.append('uid', urlParams.get('uid'));

	const request = new Request('screenshot.php', {
		method: 'POST',
		body: data
	});

	fetch(request).then(response => {
		if (response.ok) {
			alert(langData['screenshot_success']);
			return response.blob();
		} else {
			alert(langData['error'] + response.statusText);
			throw new Error('Network response was not ok.');
		}
	});
});