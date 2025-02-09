const nukeBtn = document.getElementById("nukeBtn");
const nukeDialog = document.getElementById("nukeDialog");
const nuke2Dialog = document.getElementById("nuke2Dialog");
const nukeConfirmBtn = nukeDialog.querySelector('#confirmBtn');

function deleteAllCookies() {
	var cookies = document.cookie.split("; ");
	for (var c = 0; c < cookies.length; c++) {
		var d = window.location.hostname.split(".");
		while (true) {
			var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
			var p = location.pathname.split('/');
			console.log(cookieBase + '/');
			document.cookie = cookieBase + '/';
			while (p.length > 0) {
				console.log(cookieBase + p.join('/'));
				document.cookie = cookieBase + p.join('/');
				p.pop();
			};
			if (d.length > 0) {
				d.shift();
			} else {
				break;
			}
		}
	}
	nuke2Dialog.showModal();

	setTimeout(() => {
		document.location.reload();
	}, 3000);
}

nukeBtn.onclick = () => {
	nukeDialog.showModal();
};

nukeConfirmBtn.onclick = () => {
	deleteAllCookies();
};

nukeBtn.classList.remove("hidden");
