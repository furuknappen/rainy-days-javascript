'use strict';
import {rerenderCartNotification} from "./header.js"

// const productId = "07a7655a-7927-421b-ba6a-b6742d5a75b8";
// const onsaleId = "97e77845-a485-4301-827f-51b673d4230f"

const base_url = "https://v2.api.noroff.dev";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const jacketSection = document.querySelector(".flexDivItemPage");

async function fetchData() {
  try {
    const response = await fetch(base_url + "/rainy-days/" + productId);
    if (!response.ok) {
      throw new Error("Could not fetch data: " + response.status);
    }
    const result = await response.json();
    const item = result.data;

    return item;
  } catch (error) {
    console.log("something went wrong " + error);
  }
}

// const items = await fetchData();
// console.log(items);
let notificationCartNumber = "";
async function displayItem() {
  const item = await fetchData();
  // console.log("Full item object:", item);
  document.querySelector(".itemImage").src = item.image.url;
  document.querySelector(".itemImage").alt = item.image.alt;
  document.querySelector(".h1Itemname").textContent = item.title;
  document.querySelector(".itemGender").textContent = item.gender;
  document.querySelector(".itemColor").textContent = item.baseColor;
  document.querySelector(".infoText").textContent = item.description;

    if (item.favorite) {
    const popular = document.createElement("p");
    popular.textContent = "Popular this month!";
    popular.classList.add("statusInfo")
    console.log("popular!");
    document.querySelector(".statusInfo").appendChild(popular);
  }
  // const size = item.sizes.forEach((size) => {
  //   console.log(size);
  //   const sizeBtn = document.createElement("button");
  //   sizeBtn.type = "radio"
  //   sizeBtn.classList.add("sizeBtn");
  //   sizeBtn.ariaLabel = "Select size " + size;
  //   sizeBtn.textContent = size;
  //   document.querySelector(".buttonDiv").appendChild(sizeBtn);
  // });

  const size = item.sizes.forEach((size) => {
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "size";
    radioInput.id = `size-${size}`;
    radioInput.value = size;
    radioInput.classList.add("size-radio");

    const label = document.createElement("label");
    label.htmlFor = `size-${size}`;
    label.classList.add("sizeBtn");
    label.textContent = size;
    label.setAttribute("aria-label", `select size ${size}`);

    document.querySelector(".buttonDiv").appendChild(radioInput);
    document.querySelector(".buttonDiv").appendChild(label);
  });

  const price = document.createElement("p");

  if (item.onSale === true) {
    console.log("on sale!");
    const onsale = document.createElement("p");
    onsale.textContent = "On sale!";
    price.textContent = item.discountedPrice + " kr";
    price.classList.add("price");
    const priceBeforeDiv = document.createElement("p");
    priceBeforeDiv.innerHTML =
      "Before: " + `<span class="line-through">${item.price}</span>`;
    priceBeforeDiv.classList.add("gray", "beforePriceDiv");
    document
      .querySelector(".priceContainer")
      .append(onsale, price, priceBeforeDiv);
  } else {
    price.textContent = item.price + " kr";
    document.querySelector(".priceContainer").append(price);
    console.log("not on sale...");
  }

  const addToCartBtn = document.getElementById("addToCartBtn");
  const noSizeError = document.getElementById("noSizeError");

  document.querySelectorAll("input[name='size']").forEach((radio) => {
    radio.addEventListener("change", () => {
      noSizeError.style.display = "none";
    });
  });

  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedSize = document.querySelector("input[name='size']:checked");

    if (!selectedSize) {
      noSizeError.style.display = "flex";
      return;
    }
    noSizeError.style.display = "none";
    addToCart(item, selectedSize.value);
  });
}

function addToCart(item, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem ={
    ...item,
    selectedSize: size 
  }

  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  // console.log("added to cart " + cart.length, selectedSize);
  displayToastNotification(item);
  setTimeout(() => {
    removeToastNotification()
  }, 2000);

 rerenderCartNotification()


  // fortsett her
  // document.querySelector(".cartNotification").textContent = cart.length;
  // console.log("cart length: " + notificationCartNumber);

  // notificationCartHeader.classList.add(".cartNotification");
  // notificationCartNumber.textContent = "yes";
}

const cartContent = localStorage.getItem("cart");
// console.log("things in cart: " + cartContent);

// SKELETON CODE
window.onload = async function () {
  let skeleton = document.querySelector(".skeleton-container");
  let content = document.querySelector(".content");

  content.style.display = "none";
  skeleton.style.display = "flex";

  await displayItem();
  content.style.display = "flex";
  skeleton.style.display = "none";
};

// TODO: fix toastnotification, it dosent remove itself and its unreliable
// TOAST NOTIFICATION
function displayToastNotification(item) {
  const toastDiv = document.createElement("div");
  toastDiv.classList.add("toastNotification");

  const checkmark = document.createElement("div");
  checkmark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
  const info = document.createElement("p");
  info.textContent = `You have successfully added ${item.title} to your cart!`;

  toastDiv.append(checkmark, info);
  document.querySelector(".flexDivItemPage").append(toastDiv);
}

function removeToastNotification() {
  document.querySelector(".toastNotification").remove()
}
