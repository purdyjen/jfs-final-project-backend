import {
  titleCase,
  formatPrice,
  addProductCards,
  addEventListeners,
} from "./helperFunctions.js";
const listProductsDiv = document.getElementById("list-products");
const baseUrl = "http://localhost:8080";
const sampleProducts = [
  {
    id: 1,
    name: "Brand Name Cat Food",
    description: "Don't forget to feed your precious fur babies.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/03/24/08/27/cat-2170495_1280.jpg",
    imageAltText: "A white bowl with cute cat ears full of cat food",
    price: 15.99,
    _links: {
      self: {
        href: "http://localhost:8080/store/products/1",
      },
      products: {
        href: "http://localhost:8080/store/products",
      },
    },
  },
  {
    id: 53,
    name: "Brand Name Dog Food",
    description: "Because dogs are ALWAYS starving.",
    imageUrl:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
    imageAltText: "A white bowl with green edges full of dog food",
    price: 15.99,
    _links: {
      self: {
        href: "http://localhost:8080/store/products/53",
      },
      products: {
        href: "http://localhost:8080/store/products",
      },
    },
  },
  {
    id: 54,
    name: "Brand Name Dog Treats",
    description: "Who's a good boy?? You're a good boy!",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/18/08/dog-bones-350092_1280.jpg",
    imageAltText: "A colorful variety of bone-shaped dog treats.",
    price: 10.99,
    _links: {
      self: {
        href: "http://localhost:8080/store/products/54",
      },
      products: {
        href: "http://localhost:8080/store/products",
      },
    },
  },
  {
    id: 102,
    name: "Brand Name Bird Food",
    description: "Even birds need to eat.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/18/08/dog-bones-350092_1280.jpg",
    imageAltText: "A colorful variety of bone-shaped dog treats.",
    price: 10.99,
    _links: {
      self: {
        href: "http://localhost:8080/store/products/102",
      },
      products: {
        href: "http://localhost:8080/store/products",
      },
    },
  },
];

const getProducts = async () => {
  const urlToFetch = `${baseUrl}/store/products`;
  listProductsDiv.innerHTML = ``;
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
      const products = jsonResponse._embedded.productList;
      addProductCards(products);
      addEventListeners();
    });
};

const addProduct = async () => {
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
  const data = JSON.stringify({
    name: name,
    description: description,
    imageUrl: imageUrl,
    imageAltText: imageAltText,
    price: price,
  });
  try {
    const response = await fetch(urlToFetch, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
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

const updateProduct = async (id) => {
  const urlToFetch = `${baseUrl}/store/products/${id}`;
  try {
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
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productImageUrl = productImageUrlInput.value;
    const productImageAltText = productImageAltTextInput.value;
    const productPrice = productPriceInput.value;

    const data = JSON.stringify({
      name: productName,
      description: productDescription,
      imageUrl: productImageUrl,
      imageAltText: productImageAltText,
      price: productPrice,
    });
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

const deleteProduct = async (id) => {
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

// addProductCards(sampleProducts);
getProducts();
