let contentDiv = document.getElementById('page');

let routes = {
  '/': home,
  '/index.html': home,
  '/pdp': pdp,
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
}

contentDiv.innerHTML = routes[window.location.pathname];