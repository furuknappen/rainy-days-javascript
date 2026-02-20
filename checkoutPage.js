'use strict';

const miniCartContainer = document.querySelector(".miniCartContainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.querySelector(".cartpageBtn");
let totalPrice = 0;
cart.forEach((item) => {
  const product = document.createElement("div");
  product.classList.add("miniCart");
  const image = document.createElement("img");
  image.src = item.image.url;
  image.alt = item.image.alt;

  const title = document.createElement("p");
  title.classList.add("itemInfo", "cartTitle");
  title.textContent = item.title

  let price = document.createElement("span");
  price.classList.add("itemInfo");
  if (item.onSale) {
    price.textContent = item.discountedPrice + "kr";
    price = item.discountedPrice;
    totalDiscount += item.price - item.discountedPrice;
  } else {
    price.textContent = item.price + "kr";
    price = item.price;
  }

  product.append(image, title, price);
  miniCartContainer.append(product);

  totalPrice += price 

});

document.querySelector(".totalPrice").textContent = totalPrice.toFixed(2) + " kr"

const checkoutBtn = document.querySelector(".checkoutBtn");

checkoutBtn.addEventListener("click", ()=> {
  localStorage.clear()
});