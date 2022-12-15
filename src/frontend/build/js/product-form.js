import { addProduct } from "./products.js";

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  addProduct();
});
