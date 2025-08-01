import { loadHeaderFooter, getLocalStorage} from "./utils.mjs";

function renderCartContents() {
  const setCount = 0;
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length !== 0) {
    document.querySelector(".cart-footer").classList.remove("hide");
    let totalPrice = setCount;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice;
    });
    document.querySelector(".cart-total").textContent = totalPrice.toFixed(2);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    document.querySelectorAll(".close_buttom").forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.dataset.id;
      let cancelCartItems = getLocalStorage("so-cart") || [];
      cancelCartItems = cancelCartItems.filter((item) => item.Id !== itemId);
      if (cancelCartItems.length !== 0){
        localStorage.setItem("so-cart", JSON.stringify(cancelCartItems));
        renderCartContents();
      }
      else{
        document.querySelector(".cart-footer").classList.add("hide");
        localStorage.setItem("so-cart", JSON.stringify(cancelCartItems));
        renderCartContents();
      }
    });
});
  } else {
    document.querySelector(".product-list").innerHTML =
      `<p class="empty-cart">Your cart is empty</p>`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?products=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?products=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="close_buttom" data-id="${item.Id}">❌</span>
</li>`;

  return newItem;
}

loadHeaderFooter();

renderCartContents();
