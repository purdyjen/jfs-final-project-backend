import { titleCase, formatPrice, addProductCards } from "./helperFunctions.js";
const listProductsDiv = document.getElementById("list-products");
const baseUrl = "http://localhost:8080";
// A now unused array of sample products to aid in render styling
// const sampleProducts = [
//   {
//     id: 1,
//     name: "Brand Name Cat Food",
//     description: "Don't forget to feed your precious fur babies.",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2017/03/24/08/27/cat-2170495_1280.jpg",
//     imageAltText: "A white bowl with cute cat ears full of cat food",
//     price: 15.99,
//     _links: {
//       self: {
//         href: "http://localhost:8080/store/products/1",
//       },
//       products: {
//         href: "http://localhost:8080/store/products",
//       },
//     },
//   },
//   {
//     id: 53,
//     name: "Brand Name Dog Food",
//     description: "Because dogs are ALWAYS starving.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
//     imageAltText: "A white bowl with green edges full of dog food",
//     price: 15.99,
//     _links: {
//       self: {
//         href: "http://localhost:8080/store/products/53",
//       },
//       products: {
//         href: "http://localhost:8080/store/products",
//       },
//     },
//   },
//   {
//     id: 54,
//     name: "Brand Name Dog Treats",
//     description: "Who's a good boy?? You're a good boy!",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2014/05/21/18/08/dog-bones-350092_1280.jpg",
//     imageAltText: "A colorful variety of bone-shaped dog treats.",
//     price: 10.99,
//     _links: {
//       self: {
//         href: "http://localhost:8080/store/products/54",
//       },
//       products: {
//         href: "http://localhost:8080/store/products",
//       },
//     },
//   },
//   {
//     id: 102,
//     name: "Brand Name Bird Food",
//     description: "Even birds need to eat.",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2014/05/21/18/08/dog-bones-350092_1280.jpg",
//     imageAltText: "A colorful variety of bone-shaped dog treats.",
//     price: 10.99,
//     _links: {
//       self: {
//         href: "http://localhost:8080/store/products/102",
//       },
//       products: {
//         href: "http://localhost:8080/store/products",
//       },
//     },
//   },
// ];

const getProducts = async () => {
  // url endpoint
  const urlToFetch = `${baseUrl}/store/products`;

  // clears the products container before loading to prevent duplicate rendering
  listProductsDiv.innerHTML = ``;

  // fetches API data
  fetch(urlToFetch, { cache: "no-cache" })
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    .then((jsonResponse) => {
      // Navigates the jsonResponse and accesses the required array
      const products = jsonResponse._embedded.productList;

      // Passes the retrieved products array into the rendering function
      addProductCards(products);

      // Adds event listeners to all newly created edit/delete modals
      addEventListeners();
    });
};

export const addProduct = async () => {
  const urlToFetch = `${baseUrl}/store/products`;
  const newProductName = document.getElementById("product-name");
  const newProductDescription = document.getElementById("product-description");
  const newProductImageUrl = document.getElementById("product-image-url");
  const newProductImageAltText = document.getElementById(
    "product-image-alt-text"
  );
  const newProductPrice = document.getElementById("product-price");
  // Gets the values of the inputs
  let name = titleCase(newProductName.value);
  let description = newProductDescription.value;
  let imageUrl = newProductImageUrl.value;
  let imageAltText = newProductImageAltText.value;
  let price = formatPrice(Number(newProductPrice.value));

  // constructs data object and stringifies it to be sent to the backend with the POST request
  const data = JSON.stringify({
    name: name,
    description: description,
    imageUrl: imageUrl,
    imageAltText: imageAltText,
    price: price,
  });

  // Attempts to make POST request
  try {
    const response = await fetch(urlToFetch, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // If the POST request is successful, clears the form
    if (response.ok) {
      newProductName.value = "";
      newProductDescription.value = "";
      newProductImageUrl.value = "";
      newProductImageAltText.value = "";
      newProductPrice.value = "";
    }
  } catch (error) {
    console.log(error);
  }
};

// UpdateProduct function, requires ID argument
const updateProduct = async (id) => {
  // url endpoint
  const urlToFetch = `${baseUrl}/store/products/${id}`;

  // Accesses edit modal input fields
  const productNameInput = document.getElementById(`product-${id}-name`);
  const productDescriptionInput = document.getElementById(
    `product-${id}-description`
  );
  const productImageUrlInput = document.getElementById(
    `product-${id}-image-url`
  );
  const productImageAltTextInput = document.getElementById(
    `product-${id}-image-alt-text`
  );
  const productPriceInput = document.getElementById(`product-${id}-price`);

  // Retrieves the input field values
  const productName = productNameInput.value;
  const productDescription = productDescriptionInput.value;
  const productImageUrl = productImageUrlInput.value;
  const productImageAltText = productImageAltTextInput.value;
  const productPrice = productPriceInput.value;

  // constructs data object and stringifies it to be sent to the backend with the PUT request
  const data = JSON.stringify({
    name: productName,
    description: productDescription,
    imageUrl: productImageUrl,
    imageAltText: productImageAltText,
    price: productPrice,
  });

  // Attempts PUT request
  try {
    const response = await fetch(urlToFetch, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete function, requires ID argument
const deleteProduct = async (id) => {
  // url endpoint
  const urlToFetch = `${baseUrl}/store/products/${id}`;
  try {
    const response = await fetch(urlToFetch, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

// Adds event listeners to all elements with confirm-edit or confirm-delete class
const addEventListeners = () => {
  const confirmEditElements = Array.from(
    document.getElementsByClassName("confirm-edit")
  );
  const confirmDeleteElements = Array.from(
    document.getElementsByClassName("confirm-delete")
  );

  confirmEditElements.forEach((confirm) => {
    confirm.addEventListener("click", function handleClick(e) {
      const dataId = confirm.getAttribute("data-id");
      updateProduct(dataId);
    });
  });

  confirmDeleteElements.forEach((confirm) => {
    confirm.addEventListener("click", function handleClick(e) {
      const dataId = confirm.getAttribute("data-id");
      deleteProduct(dataId);
    });
  });
};

// Calls getProducts when page loads
getProducts();
