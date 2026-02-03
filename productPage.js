const productId = "b8b528fc-6c60-41f6-a5a9-9a8b27a9482a"

const base_url = "https://v2.api.noroff.dev";

const jacketSection = document.getElementById("flexDivItemPage");

async function fetchData() {
  try {
    const response = await fetch(base_url + "/rainy-days/" + productId);
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

const jackets = await fetchData()
console.log(jackets)

async function createItemPage(item) {
  item.forEach(function (item) {
    const card = document.createElement("a");

    const name = document.createElement("h2");
    const description = document.createElement("p");
    const gender = document.createElement("p");
    const sizes = document.createElement("p");
    const color = document.createElement("div");
    const price = document.createElement("p");
    const imgDiv = document.createElement("div");
    const tags = document.createElement("p");
    const image = document.createElement("img"); //add ALT text
    const cardTextDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");

    if (item.onSale) {
      const onSale = document.createElement("p");
      // .classList.add(".line-through")
      onSale.innerText = `On sale! Before: ${item.price}`;
      price.textContent = item.discountedPrice;
      card.appendChild(onSale);
      console.log("onsale works");
    } else {
      price.textContent = item.price;
    }

    cardTextDiv.classList.add(cardTextDiv);
    cardTextDiv.appendChild(name);
    cardTextDiv.appendChild(price);

    price.classList.add("itemPrice");
    name.textContent = item.title;
    image.classList.add("itemName");

    description.textContent = item.description;
    gender.textContent = item.gender;
    sizes.textContent = item.sizes;
    color.style.backgroundColor = item.color; //?

    image.src = item.image.url;
    image.alt = item.image.alt;
    image.classList.add("cardImg");

    imgDiv.appendChild(image);
    card.appendChild(imgDiv);
    card.appendChild(name);
    // card.appendChild(description);
    // card.appendChild(gender);
    // card.appendChild(sizes);
    // card.appendChild(color);
    card.appendChild(price);
    // card.appendChild(tags);

    cardsSection.appendChild(card);
  });
}
