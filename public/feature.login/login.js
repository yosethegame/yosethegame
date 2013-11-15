function login() {
	var player = $('#login').val();
	window.location = '/players/' + player;
}

$('input#login').keydown(function(event) {
    if(event.keyCode == 13) {
        login();
    }
});
