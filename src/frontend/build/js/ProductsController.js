// Creating a class called ProductsController so that we can create new objects to store products and assign unique IDs
// IMPORTANT!!
// Products should never be added to the products array directly. They should only be added by way of the addProduct method. This is the only way of ensuring the currentId is correctly set
// Hypothetical: Just to make things more complicated, this approach gets dicey if you add in a method to remove products. One potential solution would be to create an itemsRemoved counter that is also saved to localStorage and then after every element in the array has been added, the currentId is then incremented by the number of elements (total) that have been removed.
export default class ProductsController {
  constructor(currentId = 0) {
    this._products = [];
    this.currentId = currentId;
  }

  get products() {
    return this._products;
  }

  // Creating a method in order to load whatever product data is available in localStorage OR if there is no data stored, sets the productsFromLS value to an empty array to which we then add in three sample products, which are then saved to the ProductController products array. Finally, we save the objects products array to localStorage and return the array
  loadProductsFromLS = () => {
    // JSON.parse() converts the data saved to localStorage from a string and back into an array of objects
    let productsFromLS = JSON.parse(localStorage.getItem("products")) || [];
    // If the productsFromLS array is empty, we assign a sample product array to productsFromLS as a starting point, and then call the addProduct method for each element in the array, passing in the necessary information
    if (productsFromLS.length === 0) {
      productsFromLS = [
        {
          createdAt: "11-04-2022",
          description: "Don't forget to feed your precious fur babies.",
          id: 0,
          imgAltText: "A white bowl with cute cat ears full of cat food",
          imgUrl:
            "https://cdn.pixabay.com/photo/2017/03/24/08/27/cat-2170495_1280.jpg",
          name: "Brand Name Cat Food",
          price: 15.99,
        },
        {
          createdAt: "11-04-2022",
          description: "Because dogs are ALWAYS starving.",
          id: 1,
          imgAltText: "A white bowl with green edges full of dog food",
          imgUrl:
            "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
          name: "Brand Name Dog Food",
          price: 15.99,
        },
        {
          createdAt: "11-04-2022",
          description: "Who's a good boy?? You're a good boy!",
          id: 2,
          imgAltText: "A colorful variety of bone-shaped dog treats",
          imgUrl:
            "https://cdn.pixabay.com/photo/2014/05/21/18/08/dog-bones-350092_1280.jpg",
          name: "Brand Name Dog Treats",
          price: 10.99,
        },
      ];
      for (let i = 0; i < productsFromLS.length; i++) {
        this.addProduct(
          productsFromLS[i].name,
          productsFromLS[i].description,
          productsFromLS[i].imgUrl,
          productsFromLS[i].imgAltText,
          productsFromLS[i].price
        );
        localStorage.setItem("products", JSON.stringify(productsFromLS));
        console.log("if statement");
      }
      // If the productsFromLS array is NOT empty, we don't need to provide any sample data, but we do still need to call the addProduct method for each element in the array
    } else {
      for (let i = 0; i < productsFromLS.length; i++) {
        this.addProduct(
          productsFromLS[i].name,
          productsFromLS[i].description,
          productsFromLS[i].imgUrl,
          productsFromLS[i].imgAltText,
          productsFromLS[i].price
        );
        localStorage.setItem("products", JSON.stringify(productsFromLS));
        console.log("else statement");
      }
    }
    return productsFromLS;
  };

  // Creating a method to save the products array to localStorage when a change is made. In product-form.js, we pull the values from the input fields, create a new product object and save it to the products array, but we still need to save that new information into localStorage so that it is always current.
  saveProductsToLS = () => {
    localStorage.setItem("products", JSON.stringify(this.products));
  };

  // Adds new product object, increments currentId
  addProduct(name, description, imgUrl, imgAltText, price) {
    const product = {
      id: this.currentId++,
      name: name,
      description: description,
      imgUrl: imgUrl,
      imgAltText: imgAltText,
      price: price,
      createdAt: this.getDate(),
    };
    this._products.push(product);
  }
}
