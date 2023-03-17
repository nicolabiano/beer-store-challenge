/* Dynamic Beer Ecommerce */

/* Functions to fetch HTML */
var home, pdp;

function loadHome() {
	fetch(`./html/home.html`).then(function (response) {
		// The API call was successful!
		return response.text();
	}).then(function (html) {
		var parser = new DOMParser();
		home = parser.parseFromString(html, 'text/html');
	});
}
function loadPDP() {
	fetch(`./html/pdp.html`).then(function (response) {
		// The API call was successful!
		return response.text();
	}).then(function (html) {
		var parser = new DOMParser();
		pdp = parser.parseFromString(html, 'text/html');
	});
}

document.addEventListener('DOMContentLoaded', function() {
	loadHome();
	loadPDP();
});

/* Define routes array */
const routes = {
  '/' : home,
  '/product' : pdp
};

/* Select content container and print content */
const pageDiv = document.getElementById('page');
pageDiv.innerHTML = routes[window.location.pathname];

/* Allow browser navigation between routes */
const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  pageDiv.innerHTML = routes[pathname]
}

/* Update DOM when changing routes */
window.onpopstate = () => {
  pageDiv.innerHTML = routes[window.location.pathname]
}