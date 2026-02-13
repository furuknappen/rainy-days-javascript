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

async function displayItem() {
  const item = await fetchData();
  console.log("Full item object:", item);
  document.querySelector(".itemImage").src = item.image.url;
  document.querySelector(".itemImage").alt = item.image.alt;
  document.querySelector(".h1Itemname").textContent = item.title;
  document.querySelector(".itemGender").textContent = item.gender;
  document.querySelector(".itemColor").textContent = item.baseColor;
  document.querySelector(".infoText").textContent = item.description;

  const size = item.sizes.forEach((size) => {
    console.log(size);
    const sizeBtn = document.createElement("button");
    sizeBtn.classList.add("sizeBtn");
    sizeBtn.ariaLabel = "Select size " + size.value;
    sizeBtn.textContent = size;
    document.querySelector(".buttonDiv").appendChild(sizeBtn);
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
    document
      .querySelector(".priceContainer")
      .append(onsale, price, priceBeforeDiv);
  } else {
    price.textContent = item.price + " kr";
    document.querySelector(".priceContainer").append(price);
    console.log("not on sale...");
  }

  const addToCartBtn = document.getElementById("addToCartBtn");

  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault()

    addToCart(item)
  }) 
}


function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("added to cart " + cart.length);
  };



const cartContent = localStorage.getItem("cart")
console.log("things in cart: " +cartContent)



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

