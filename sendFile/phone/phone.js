formFile.addEventListener('submit', function (e) {
	e.preventDefault();

    fetch('file.php').then(response => {
        return response.text();
    }
    ).then(data => {
        console.log(data);
        if (data === 'Success') {
            alert('File sent successfully!\nTask completed!');
            window.location.href = '/thanks/';
        }
    });
});