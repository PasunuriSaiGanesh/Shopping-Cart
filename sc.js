const products = [
  { id: 1, name: "Hertfoid Upholstered Chair", price: 101, image: "170510-517566.jpg" },
  { id: 2, name: "Abingdon Upholstered Chair Swivel", price: 151, image: "abindon.jpg" },
  { id: 3, name: "Jeses Minimore Modern Style Etta", price: 181, image: "jesesmini.webp" },
  { id: 4, name: "JJeses Minimore Modern Style", price: 201, image: "jjesusofa.webp" },
  { id: 5, name: "Bolanle Upholstered Armchair", price: 251, image: "OIP.jpeg" },
  { id: 6, name: "Jaqueze Upholstered Armchair", price: 111, image: "Leston.webp" },
  { id: 7, name: "Leston Wide Upholstered Fabric", price: 121, image: "Leston sofa.webp" },
  { id: 8, name: "Stephanny 27.5\" Wide Tuftede", price: 151, image: "Stephanny.webp" },
];

let cart = [];

function displayProducts(list = products) {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  if (list.length === 0) {
    productDiv.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  list.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `
      <img class="img1" src="${product.image}" alt="">
      <p class="p1">${product.name}</p>
      <p class="p2">$${product.price}</p>
      <button class="add" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productDiv.appendChild(productContainer);
  });
}

function searchProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );
  displayProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Show cart if hidden
  const cartDiv = document.getElementById("cart");
  if (cartDiv.classList.contains("hidden")) {
    cartDiv.classList.remove("hidden");
  }

  updateCart();
}

function changeQuantity(id, delta) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity < 1) {
      cart = cart.filter(p => p.id !== id);
    }
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart-c");
  cartDiv.innerHTML = "";
  let totalAmount = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty</p>";
    document.getElementById("total").textContent = "Total: $0";
    localStorage.removeItem("cart");

    // Hide cart when empty
    document.getElementById("cart").classList.add("hidden");
    return;
  }

  cart.forEach(item => {
    totalAmount += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-p");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <p>${item.name} - $${item.price}</p>
      <div class="qty-buttons">
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartDiv.appendChild(cartItem);
  });

  document.getElementById("total").textContent = `Total: $${totalAmount}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    if (cart.length > 0) {
      document.getElementById("cart").classList.remove("hidden");
    }
    updateCart();
  }
});

displayProducts();
