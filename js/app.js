/* Dynamic Beer Ecommerce */

import home from "./home.js";
import pdp from "./pdp.js";

const routes = {
    "/": { title: "Home", render: home },
    "/pdp": { title: "Product", render: pdp },
};
console.log(routes);

function router() {
    let view = routes[location.pathname];
    console.log(view);
    if (view) {
        document.title = view.title;
        page.innerHTML = view.render();
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);