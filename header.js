"use strict";

export function rerenderCartNotification() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const notification = document.querySelector(".cartNotification");
  notification.textContent = cart.length;
  if (cart.length == 0) {
    notification.style.display = "none";
  } else if (cart.length <= 9) {
    notification.classList.add("under10");
    notification.classList.remove("over10");
  }
  else {
    notification.classList.remove("under10");
    notification.classList.add("over10");
  }
}

rerenderCartNotification()