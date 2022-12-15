// Helper function to format name value and ensure uniform title casing across all products
// When function is called, it is passed a string argument
export const titleCase = (str) => {
  // Lowercases all characters
  str = str.toLowerCase();
  // Splits the string into an array containing the separate words (uses the space as the separating value)
  str = str.split(" ");

  // Uses a for loop to access each element (word) in the newly created array (str)
  for (let i = 0; i < str.length; i++) {
    // Accesses the first character in the string (word) and uppercases it
    // Slices (copies) any characters at index 1 and later (if any exist)
    // If no characters beyond index 0, it's fine because then the value is just "" (an empty string)
    // Finally, it concatenates the uppercased first character with the rest of the word and assigns as the new value for the current index
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" "); // Joins the new titlecased words back into a string and returns
};

// A function to ensure that the price has two numbers after the decimal by using the toFixed method
export const formatPrice = (price) => price.toFixed(2);

export const addProductCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div"); // Creates div element object
    const modalEl = document.createElement("div");
    const deleteEl = document.createElement("div");
    modalEl.innerHTML = `<div
          class="modal fade"
          id="edit-product-${arr[i].id}"
          tabindex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="editModalLabel">Edit Product</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
              <form id="edit-product-${arr[i].id}-form">
                <div class="mb-3">
                  <label for="product-${arr[i].id}-name" class="form-label">Product Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="product-${arr[i].id}-name"
                    aria-describedby="product-name"
                    value="${arr[i].name}"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="product-${arr[i].id}-description" class="form-label"
                    >Product Description</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    id="product-${arr[i].id}-description"
                    value="${arr[i].description}"
                    rows="3"
                    required
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="product-${arr[i].id}-image-url" class="form-label"
                    >Product Image URL</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="product-${arr[i].id}-image-url"
                    value="${arr[i].imageUrl}"
                    aria-describedby="product-image-url"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="product-${arr[i].id}-image-alt-text" class="form-label">Image Alt Text</label>
                  <input
                    type="text"
                    class="form-control"
                    id="product-${arr[i].id}-image-alt-text"
                    value="${arr[i].imageAltText}"
                    aria-describedby="image-alt-text"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="product-${arr[i].id}-price" class="form-label">Product Price</label>
                  <input
                    type="number"
                    class="form-control"
                    id="product-${arr[i].id}-price"
                    aria-describedby="product-price"
                    value="${arr[i].price}"
                    placeholder="$"
                    min="1"
                    required
                  />
                </div>
      </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary confirm-edit" data-id="${arr[i].id}">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>`;
    deleteEl.innerHTML = `<div
          class="modal fade"
          id="delete-product-${arr[i].id}"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">Warning!</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you wish to delete <strong>${arr[i].name}</strong> from your store?</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-danger confirm-delete" data-id="${arr[i].id}">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>`;
    // This variable holds the desired HTML for each product card
    // It is using a template literal (or template string) so that it can pass in the current array item's information in the correct places. For instance, the first one is ${arr[i].imgUrl} where it accesses the element at [i] index inside the array, and then uses dot notation to grab the current element's imgUrl value
    let cardHTML = `
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="${arr[i].imageUrl}"
            class="img-fluid rounded-start"
            alt="${arr[i].imageAltText}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${arr[i].name}<i class="bi bi-pencil-square text-primary btn" data-bs-toggle="modal" data-bs-target="#edit-product-${arr[i].id}"></i><i class="bi bi-x-square text-danger btn" data-bs-toggle="modal" data-bs-target="#delete-product-${arr[i].id}"></i></h5>

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
    document.body.append(modalEl);
    document.body.append(deleteEl);
  }
};

export const addEventListeners = () => {
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
