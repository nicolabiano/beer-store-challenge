/* Dynamic Beer Ecommerce App 
 * Author: Nicolas Labiano
 */

/*
 * Import resources
 */
const products = await import('./js/products.js');
const stockPrice = await import('./js/stock-price.js');

/* 
 * Set Router for dynamic content update
 */

// Define dynamic content container
let contentDiv = document.getElementById('page');

// Define routes for our app
let routes = {
  '/': home,
  '/index.html': home,
  '374-miller-lite': pdp,
  '127-modelo-especial': pdp,
  '743-corona-premier': pdp,
  '841-lagunitas-ipa': pdp,
};

// Update content when URL pathname changes
window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
  viewScripts();
}

// Allow content update on navigation
let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
}

// Update content
contentDiv.innerHTML = routes[window.location.pathname];
viewScripts();

/*
 * Global functions
 */

// Execute views functions
function viewScripts() {
  if (window.location.pathname === "/") {
    loadProducts();
  }
  if (document.getElementsByClassName('product-page').length) {
    loadProductInfo();
  }
}

/*
 * Load product info and update routes
 */
async function loadProducts() {
  // Generate Products Listings
  // Iterate every Product inside the array
  let i = 0;
  while (i < products.default.length) {
    // Define data to generate content
    let productId = products.default[i].id;
    let productBrand = products.default[i].brand;
    let productImage = products.default[i].image;
    let productSku = products.default[i].skus[0].code;
    let productAlt = productBrand.toLowerCase().replace(/ /g,"-");
    let productUrl = productId+'-'+productAlt;

    // Get product price and apply format
    let productPrice = stockPrice.default[productSku].price;
    function numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.');
    }
    productPrice = numberWithCommas(productPrice);

    // Assign data to content
    let productTemplate = `
    <a href="`+productUrl+`" class="product-link">
      <h3 class="product-title text-color-one text-size-m text-bold">`+productBrand+`</h3>
      <div class="product-thumbnail-wrapper">
        <img width="240" height="240" src="`+productImage+`" class="product-thumbnail-image" alt="`+productAlt+`" loading="lazy">
      </div>
      <span class="product-price text-color-one text-size-m text-bold">
        <bdi><span class="currencySymbol">$</span><span class="amount">`+productPrice+`</span></bdi>
      </span>
    </a>
    <a href="#" class="add-to-cart-button btn btn-style-two">
      <span class="add-to-cart-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="11" y="5" width="2" height="14" rx="1" fill="white"></rect><rect x="5" y="13" width="2" height="14" rx="1" transform="rotate(-90 5 13)" fill="white"></rect></svg>
      </span>
    </a>
    `;

    // Create new product cards
    let container = document.querySelector(".products-container");
    var li = document.createElement("li");

    // Set product card attributes
    function setMultipleAttributesonElement(elem, elemAttributes) {
      Object.keys(elementAttributes).forEach(attribute => {
      elem.setAttribute(attribute, elemAttributes[attribute]);
      });
    }
    const elementAttributes = {
      id: 'product-card',
      class: 'product id-'+productId+' instock',
    };
    setMultipleAttributesonElement(li, elementAttributes);
    li.appendChild(document.createTextNode(""));
    container.appendChild(li);

    // Append Product Card template
    li.innerHTML = productTemplate;

    i++;
  }
}

/*
 * Load product details
 */
async function loadProductInfo() {

    //let currentPathname = window.location.pathname;
    //let currentProductId = currentPathname.replace(/\D/g, '');
    let currentProductId = 127;
    let container = document.querySelector("#site-content");

    // Iterate every Product inside the array
    let i = 0;
    while (i < products.default.length) {
      if (currentProductId === products.default[i].id) {
          // Define data to generate content
          let productId = products.default[i].id;
          let productBrand = products.default[i].brand;
          let productImage = products.default[i].image;
          let productDescription = products.default[i].information;
          let productOrigin = products.default[i].origin;
          let productSku = products.default[i].skus[0].code;
          let productAlt = productBrand.toLowerCase().replace(/ /g,"-");
          let productStock = stockPrice.default[productSku].stock;

          // Get product price and apply format
          let productPrice = stockPrice.default[productSku].price;
          productPrice = numberWithCommas(productPrice);

          // Generate dynamic content
          let productContent = `
          <div id="product`+productId+`" class="product instock product-summary">
            <div id="product-gallery" class="product-gallery-wrapper">
              <img width="400" height="400" src="..`+productImage+`" class="product-thumbnail-image" alt="`+productAlt+`" loading="lazy">
            </div>	
            <div class="product-summary-wrapper">
              <div class="title-price-wrapper">
                <h2 id="product-title" class="text-color-three text-size-xl text-bolder">`+productBrand+`</h2>
                <span id="product-price" class="text-color-four text-size-xl text-bolder">
                  <bdi><span class="currencySymbol">$</span><span class="amount">`+productPrice+`</span></bdi>
                </span>
              </div>
              <div class="origin-stock-wrapper">
                <span id="product-origin" class="text-color-two text-size-s">Origin: `+productOrigin+`</span>
                <span id="product-stock" class="text-color-two text-size-s">Stock: `+productStock+`</span>
              </div>
              <div class="product-description-wrapper">
                <h3 class="description-title text-color-one text-size-m text-bolder">Description</h3>
                <p id="product-description" class="text-color-two text-size-s">`+productDescription+`</p>
                <a href="#" id="product-read-more" class="text-color-four text-size-s text-bolder">Read more</a>
              </div>
              <div class="product-variations">
                <h3 class="variations-title text-color-one text-size-m text-bolder">Size</h3>
                <ul id="variation-swatches-wrapper"></ul>
              </div>
              <div class="add-to-cart-wrapper">
                <a href="#" id="bag-btn" class="btn btn-style-three">
                  <span class="bag-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="6" r="4.25" stroke="#FF9F24" stroke-width="1.5"/><path d="M4.30623 9.59689C4.50953 7.97049 5.89208 6.75 7.53113 6.75H16.4689C18.1079 6.75 19.4905 7.97049 19.6938 9.59689L20.6938 17.5969C20.9362 19.5367 19.4237 21.25 17.4689 21.25H6.53113C4.57626 21.25 3.06375 19.5367 3.30623 17.5969L4.30623 9.59689Z" fill="white" stroke="#FF9F24" stroke-width="1.5"/><circle cx="9.75" cy="10.75" r="0.75" fill="#FF9F24"/><circle cx="13.75" cy="10.75" r="0.75" fill="#FF9F24"/></svg>
                  </span>
                </a>
                <a href="#" id="add-to-cart" class="btn btn-style-two text-size-m text-bold">Add to cart</a>
              </div>
            </div>	
          </div>
          `;

          container.innerHTML = productContent;

          // Load product variations
          let v = 0;
          while (v < products.default[i].skus.length) {
              let productVariations = `
              <a href="#" id="variation-option" class="variation-btn text-color-two text-size-s" value="`+products.default[i].skus[v].code+`">`+products.default[i].skus[v].name+`</a>
              `;

              // Create new product cards
              let variationWrapper = document.querySelector("#variation-swatches-wrapper");
              var li = document.createElement("li");
              li.setAttribute('class', 'variation-option');
              li.appendChild(document.createTextNode(""));
              li.innerHTML = productVariations;
              variationWrapper.appendChild(li);
              v++
          }
      }
      i++;
    }
}

// Price formatter
function numberWithCommas(num) {
  num = num / 100;
  num = parseFloat(num).toFixed(2);
  return num
}

// Change active variation button on click
var element = document.querySelectorAll('.variation-option');
if (element) {
  element.forEach(function(el, key){
      el.addEventListener('click', function (event) {
        swatchVariation(event);
        el.classList.toggle("active-variation");
          element.forEach(function(ell, els){
              if(key !== els) {
                  ell.classList.remove('active-variation');
              }
          });

        event.preventDefault();
      });
  });
}

// Update content when changing variations
function swatchVariation(event) {
    // Store value of clicked element
    let activeVariation = event.target.getAttribute("value");
    // Run update function
    updatePriceStock(activeVariation);
}

// Expand description on read more click
document.addEventListener('click', function (event) {
    if (!event.target.matches('#product-read-more')) return;
    // Expand description
    let container = event.target.parentNode;
    container.classList.toggle("expanded");

    event.preventDefault();
}, false);

// Update Price and Stock on demand
function updatePriceStock(sku) {
    // Define variables
    let productPrice = stockPrice.default[sku].price;
    productPrice = numberWithCommas(productPrice);
    let productStock = stockPrice.default[sku].stock;
    // Update price and stock
    let priceContainer = document.querySelector('#product-price .amount');
    let stockContainer = document.querySelector('#product-stock');
    priceContainer.innerHTML = productPrice;
    stockContainer.innerHTML = 'Stock: '+productStock;
}