


export function rerenderCartNotification() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const notification = document.querySelector(".cartNotification");
  notification.textContent = cart.length;
  let notificationCartNumber = "";
  console.log("cart length: " + cart.length);
  console.log(cart);

  if ((cart = [])) {
    notification.computedStyleMap.display = "none";
  }


  if(cart.length <= 9 ){
    notification.classList.add("under10")
     notification.classList.remove("over10")
  } 
  // TODO: does not work
  if(cart.length >= 10 ){
    notification.classList.remove("under10")
    notification.classList.add("over10")

  } 

}
rerenderCartNotification();

