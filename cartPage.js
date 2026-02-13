console.log("hello");

const productDisplay = document.querySelector(".productContainer");

// const items = JSON.parse(localStorage.getItem("cart"))

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalPrice = 0;

cart.forEach((item) => {
  const productLine = document.createElement("div");
  productLine.classList.add("product-line")
  const image = document.createElement("img");
  console.log(item);
  image.src = item.image.url;
  image.alt = item.image.alt;

  const cartText = document.createElement("div");
  cartText.classList.add("cartText")

  const title = document.createElement("p");
  let price = document.createElement("p");
 price.classList.add("itemInfo");
  if (item.onSale) {
    price.textContent = item.discountedPrice;
    price = item.discountedPrice
    console.log("On sale");
  } else {
    price.textContent = item.price;
    price = item.price
    console.log("not on sale");
  }
  console.log("prise is: " + price);

  title.classList.add("itemInfo");
  title.textContent = item.title;

 

  const trashBtn = document.createElement("button")
  trashBtn.classList.add("removeBtn")
  trashBtn.setAttribute("aria-label", `remove ${item.title} from cart`)
  trashBtn.innerHTML =`
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>`
  cartText.append(title, price);
  productLine.append(image, cartText);
  productLine.append(trashBtn)
  productDisplay.appendChild(productLine);

  trashBtn.addEventListener('click', () => {
    removeItemFromCart(item.id)
  })
    // document.querySelector('.productContainer').appendChild(productLine);
    
 totalPrice += price 

});

document.querySelector(".totalPrice").textContent = totalPrice.toFixed(2)

function removeItemFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== itemId )

  localStorage.setItem('cart', JSON.stringify(cart))
 location.reload()
}