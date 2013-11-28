function search() {
	var criteria = $('#criteria').val();
	window.location = '/players/search/' + criteria;
}

$('input#criteria').keydown(function(event) {
    if(event.keyCode == 13) {
        search();
    }
});
