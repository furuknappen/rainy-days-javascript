const productId = "b8b528fc-6c60-41f6-a5a9-9a8b27a9482a";

const base_url = "https://v2.api.noroff.dev";

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

const items = await fetchData();
console.log(items);

async function displayItem(items) {
  const item = await fetchData();
  document.querySelector(".itemImage").src = item.image.url;
  document.querySelector(".itemImage").alt = item.image.alt;
  document.querySelector(".h1Itemname").textContent = item.title;
  document.querySelector(".itemGender").textContent = item.gender;


  const sizes = item.sizes.forEach(() => {
    const sizeBtn = document.createElement('button');
    sizeBtn.textContent = "item.sizes[0]";
    document.querySelector(".buttonDiv").appendChild(sizes)

  });

  //  if (item.onSale) {
  //     const onSale = document.createElement("p");
  //     // .classList.add(".line-through")
  //     onSale.innerText = `On sale! Before: ${jacket.price}`;
  //     price.textContent = jacket.discountedPrice;
  //     price.appendChild(onSale);
  //     console.log("onsale works");
  //   } else {
  //     price.textContent = jacket.price;
  //   }
  //   cardTextDiv.appendChild(price);

  //   cardsSection.appendChild(card);
  // });

  // fix if setning på price
  document.querySelector(".price").textContent = item.price;

  document.querySelector(".infoText").textContent = item.description;
}

displayItem();

// SKELETON CODE

// window.onload = function () {
//   const skeleton= document.querySelector(".skeleton-container")
//   const content = document.getElementById(".content")

//   content.style.display= "none"
//   skeleton.style.display= "flex"

//   setTimeout(function () {
//     skeleton.style.display= "none"
//     content.style.display= "flex"
//   }, 2000)
// }
// ------------
