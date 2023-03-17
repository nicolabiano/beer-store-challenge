/* Dynamic Beer Ecommerce */

/* Functions to fetch HTML */
const home = fetch(`./html/home.html`).then(function (response) {
		return response.text();
	}).then(function (html) {
		return html;
});
const pdp = fetch(`./html/pdp.html`).then(function (response) {
		return response.text();
	}).then(function (html) {
		return html;
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