import { loadHeaderFooter, getLocalStorage} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length !== 0) {
    document.querySelector(".cart-footer").classList.remove("hide");
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice;
    });
    document.querySelector(".cart-total").textContent += totalPrice;
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML =
      `<p class="empty-cart">Your cart is empty</p>`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

loadHeaderFooter();

renderCartContents();
