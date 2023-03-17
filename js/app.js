/* Dynamic Beer Ecommerce */

/* Import required assets */
import { home } from './home-plp.js';
import { pdp } from './pdp.js';

/* Register components
const app = async () => {
    home();
    pdp();
};

/* Load main function */
//document.addEventListener("DOMContentLoaded", app);

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