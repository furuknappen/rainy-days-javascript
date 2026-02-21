"use strict";
import { rerenderCartNotification } from "./header.js";

const base_url = "https://v2.api.noroff.dev";

async function fetchData() {
  try {
    const response = await fetch(base_url + "/rainy-days");
    if (!response.ok) {
      throw new Error("Could not fetch data: " + response.status);
    }
    const result = await response.json();
    const jackets = result.data;

    return jackets;
  } catch (error) {
    alert("Something went wrong " + error)
    
  }
}

function createHomePage(jackets) {
  const cardsSection = document.getElementById("gridContainerHomepage");
  cardsSection.textContent = "";
  jackets.forEach(function (jacket) {
    const card = document.createElement("a");
    card.classList.add("card");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");

    const image = document.createElement("img");
    image.classList.add("itemName");
    image.src = jacket.image.url;
    image.alt = jacket.image.alt;
    image.classList.add("cardImg");
    imgDiv.appendChild(image);
    card.appendChild(imgDiv);

    const cardTextDiv = document.createElement("div");
    cardTextDiv.classList.add("cardTextDiv");
    card.appendChild(cardTextDiv);

    const name = document.createElement("h2");
    name.classList.add("itemName");
    name.textContent = jacket.title;
    cardTextDiv.appendChild(name);

    const price = document.createElement("p");
    price.classList.add("itemPrice");
    if (jacket.onSale) {
      const onsale = document.createElement("p");
      onsale.textContent = "On sale!";

      price.textContent = jacket.discountedPrice + " kr";

      const priceBeforeDiv = document.createElement("p");
      priceBeforeDiv.innerHTML =
        "Before: " + `<span class="line-through">${jacket.price}</span>`;
      priceBeforeDiv.classList.add("gray", "beforePrice");

      cardTextDiv.append(onsale, priceBeforeDiv);
    } else {
      price.textContent = jacket.price + " kr";
    }
    cardTextDiv.appendChild(price);

    cardsSection.appendChild(card);

    card.addEventListener("click", () => {
      window.location.href = `item-page.html?id=${jacket.id}`;
    });
  });
}

let skeleton = document.querySelector(".skeleton-card-container");
let content = document.querySelector("#gridContainerHomepage");

content.style.display = "none";
skeleton.style.display = "grid";

const jackets = await fetchData();

createHomePage(jackets);
content.style.display = "grid";
skeleton.style.display = "none";

const femaleJackets = jackets.filter((jacket) => {
  return jacket.gender == "Female";
});

const maleJackets = jackets.filter((jacket) => {
  return jacket.gender == "Male";
});
const heading = document.getElementById("homepage-title");
document.getElementById("femaleBtn").addEventListener("click", () => {
  createHomePage(femaleJackets);
  heading.textContent = "Female Jackets";
});
document.getElementById("maleBtn").addEventListener("click", () => {
  createHomePage(maleJackets);
  heading.textContent = "Male Jackets";
});

document.getElementById("femaleBtnMob").addEventListener("click", () => {
  createHomePage(femaleJackets);
  heading.textContent = "Female Jackets";
});
document.getElementById("maleBtnMob").addEventListener("click", () => {
  createHomePage(maleJackets);
  heading.textContent = "Male Jackets";
});

document.getElementById("getAllMob").addEventListener("click", () => {
  createHomePage(jackets);

  heading.textContent = "All Jackets";
});
document.getElementById("getAllDesktop").addEventListener("click", () => {
  createHomePage(jackets);
  heading.textContent = "All Jackets";
});
