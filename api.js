const url = "https://v2.api.noroff.dev/rainy-days";

const cardsSection = document.getElementById("gridContainerHomepage");

async function fetchData() {
  try {
    const response = await fetch(url);
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


async function createItemPage(jackets) {
  jackets.forEach(function (jacket) {
    const card = document.createElement("a");

    const name = document.createElement("h2");
    const description = document.createElement("p");
    const gender = document.createElement("p");
    const sizes = document.createElement("p");
    const color = document.createElement("div");
    const price = document.createElement("p");

    const tags = document.createElement("p");
    const image = document.createElement("img"); //add ALT text

    if (jacket.onSale) {
      const onSale = document.createElement("p");
      // .classList.add(".line-through")
      onSale.innerText = `On sale! Before: ${jacket.price}`;
      price.textContent = jacket.discountedPrice;
      card.appendChild(onSale);
      console.log("onsale works")
    }
    else {
      price.textContent = jacket.price;

    }

    name.textContent = jacket.title;
    description.textContent = jacket.description;
    gender.textContent = jacket.gender;
    sizes.textContent = jacket.sizes;
    color.style.backgroundColor = jacket.color; //?
image.src = jacket.image.url;
image.alt = jacket.image.alt

 
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(gender);
    card.appendChild(sizes);
    card.appendChild(color);
    card.appendChild(price);
    card.appendChild(tags);
    card.appendChild(image);
    cardsSection.appendChild(card)
  });
}


const jackets = await fetchData();
createItemPage(jackets)