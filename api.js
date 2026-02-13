// TODO: add color circle
// TODO: fix onsale size

// TODO: fix sort by gender
// TODO: 
// TODO: 






const base_url = "https://v2.api.noroff.dev";

const cardsSection = document.getElementById("gridContainerHomepage");

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
    console.log("something went wrong " + error);
  }
}

async function createHomePage(jackets) {
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
      const onSale = document.createElement("p");
      // .classList.add(".line-through")
      onSale.innerText = `On sale! Before: ${jacket.price}`;
      price.textContent = jacket.discountedPrice;
      price.appendChild(onSale);
      console.log("onsale works");
    } else {
      price.textContent = jacket.price;
    }
    cardTextDiv.appendChild(price);

    cardsSection.appendChild(card);

    card.addEventListener('click', () => {
      window.location.href = `item-page.html?id=${jacket.id}`
    })
  });
}

const jackets = await fetchData();

const femaleBtn = document.getElementById("femaleBtn")
const maleBtn = document.getElementById("maleBtn")

const femaleJackets = jackets.filter((jacket) => {
return jacket.gender == "Female"
})
// 
femaleBtn.addEventListener("click", () => {createHomePage(femaleJackets)} )

const maleJackets = jackets.filter((jacket) => {
return jacket.gender == "Male"
})

maleBtn.addEventListener("click",  () => {createHomePage(maleJackets)} )

createHomePage(jackets);
