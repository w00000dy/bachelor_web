// get -pico-background-color variable
var colorLight = getComputedStyle(document.documentElement).getPropertyValue('--pico-background-color');
var colorDark = getComputedStyle(document.documentElement).getPropertyValue('--pico-color');

var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: window.location.href,
	colorDark : colorDark,
	colorLight : colorLight,
});

url.innerText = window.location.href;
url.href = window.location.href;