// Imports class ProductsController
import ProductsController from "./ProductsController.js";
// Imports two "helper functions" to use in validating/formatting input values
import { titleCase, formatPrice } from "./helperFunctions.js";
// Initialize a new productsController object
const productsController = new ProductsController();
// Loads the products from localStorage
productsController.loadProductsFromLS();
// Selects the new product form element to add an event listener
const addNewProductForm = document.getElementById("add-new-product");
// Adds an onsubmit event listener
addNewProductForm.addEventListener("submit", (e) => {
  // Prevents default page reload action on submit event
  e.preventDefault();
  // Selects the inputs
  const newProductName = document.getElementById("product-name");
  const newProductDescription = document.getElementById("product-description");
  const newProductImageUrl = document.getElementById("product-image-url");
  const newProductImageAltText = document.getElementById("image-alt-text");
  const newProductPrice = document.getElementById("product-price");
  // Gets the values of the inputs
  let name = newProductName.value;
  let description = newProductDescription.value;
  let imageUrl = newProductImageUrl.value;
  let imageAltText = newProductImageAltText.value;
  let price = Number(newProductPrice.value);

  // Validation Code

  // Name Validation - desired output is title case
  // Uses titleCase helper function to ensure value of name is title cased
  name = titleCase(name);

  // Formats price to have two decimals
  price = formatPrice(price);

  // Adds new product to the ProductsController products array using the addProduct method
  productsController.addProduct(
    name,
    description,
    imageUrl,
    imageAltText,
    price
  );
  productsController.saveProductsToLS(); // Updates saved products value in localStorage

  // Clears the form
  newProductName.value = "";
  newProductDescription.value = "";
  newProductImageUrl.value = "";
  newProductImageAltText.value = "";
  newProductPrice.value = "";
});
