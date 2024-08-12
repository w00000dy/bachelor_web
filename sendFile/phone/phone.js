formFile.addEventListener('submit', function (e) {
	e.preventDefault();

    fetch('file.php').then(response => {
        return response.text();
    }
    ).then(data => {
        alert(data);
        console.log(data);
    });
});