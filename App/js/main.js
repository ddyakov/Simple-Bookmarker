document.getElementById('postForm').addEventListener('submit', addBookmark);

function addBookmark(e) {
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	var error = document.getElementById('validation-result');

	if (!siteName || !siteUrl) {
		error.innerHTML = '<strong>Please fill in the form</strong>';
		error.removeAttribute('hidden');

		return false;
	}	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		error.innerHTML = '<strong>Invalid URL</strong>';
		error.removeAttribute('hidden');

		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	};

	if (localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];

		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	fetchBookmarks();

	document.postForm.reset();
	//Prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			bookmarks.splice(i, 1);
		}
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults = document.getElementById('bookmarksResults');

	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' + 
									  '<h3>' + name + 
									  ' <a class="btn btn-primary" target="_blank" href="'+ url + '">Visit</a> ' +
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger pull-right" href="#">Delete</a> '
									  '</h3>' +
									  '</div>';	
	}

}
                                                        