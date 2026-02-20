'use strict';
import {rerenderCartNotification} from "./header.js"

const base_url = "https://v2.api.noroff.dev";

// const cardsSection = document.getElementById("gridContainerHomepage");

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
    // alert(error)
    console.log("something went wrong " + error);
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

    const image = document.createElement("img"); //add ALT text
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
    // const color = document.createElement("div");

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
      // .classList.add(".line-through")
      //  price.appendChild(onsale)
      // // 
      // onSale.innerText = `On sale! Before: ${jacket.price}`;
      // ;
      // console.log("onsale works");
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
  rerenderCartNotification()
}
// debugger;
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

document.getElementById("femaleBtn").addEventListener("click", () => {
  createHomePage(femaleJackets);
});
document.getElementById("maleBtn").addEventListener("click", () => {
  createHomePage(maleJackets);
});

document.getElementById("femaleBtnMob").addEventListener("click", () => {
  createHomePage(femaleJackets);
});
document.getElementById("maleBtnMob").addEventListener("click", () => {
  createHomePage(maleJackets);
});

document.getElementById("getAllMob").addEventListener("click", () => {
  createHomePage(jackets);
});
document.getElementById("getAllDesktop").addEventListener("click", () => {
  createHomePage(jackets);
});


// createHomePage(jackets);

// window.onload = function () {
//   debugger;
//   let skeleton = document.querySelector(".skeleton-card-container");
//   let content = document.querySelector(".content");

//   content.style.display = "none";
//   skeleton.style.display = "flex";

//   createHomePage(jackets);
//   content.style.display = "flex";
//   skeleton.style.display = "none";
// };