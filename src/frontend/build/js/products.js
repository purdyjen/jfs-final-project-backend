import ProductsController from "./ProductsController.js";
// Create new object instance of ProductController class
const products = new ProductsController();
// Loads objects from local storage and adds them into the new object's products array
const loadedProducts = products.loadProductsFromLS();
// Creates variable for easier DOM manipulation, this is where the product cards will be added
const listProductsDiv = document.getElementById("list-products");

// Creates a function to add cards for each product in the products array
// Requires an array argument (it will be the loadedProducts array from line 5)
function addProductCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div"); // Creates div element object
    // This variable holds the desired HTML for each product card
    // It is using a template literal (or template string) so that it can pass in the current array item's information in the correct places. For instance, the first one is ${arr[i].imgUrl} where it accesses the element at [i] index inside the array, and then uses dot notation to grab the current element's imgUrl value
    let cardHTML = `
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${arr[i].imgUrl}"
            class="img-fluid rounded-start"
            alt="${arr[i].imgAltText}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${arr[i].name}</h5>
            <p class="card-text">
              ${arr[i].description}
            </p>
            <p class="card-text">Price: $${arr[i].price}</p>
          </div>
        </div>
      </div>
    </div>`;
    card.innerHTML = cardHTML; // Assigns the cardHTML created for each element as the innerHTML for the new div object that was created at the beginning of the for loop
    listProductsDiv.append(card); // Adds the newly created card to the div that holds the list of products
  }
}
addProductCards(loadedProducts); // Calls the addProductCards function and passes in the loadedProducts array as the argument
