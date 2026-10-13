const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕" : "☰";
  });
}
const currentFile = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-page]").forEach(link => {
  if (link.dataset.page === currentFile) link.classList.add("active");
});
function moneyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
}
function getCart() {
  try { return JSON.parse(localStorage.getItem("mundoPetCart") || "[]"); }
  catch { return []; }
}
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
}
function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}
updateCartCount();

const contactForm = document.getElementById("contact-form");
if (contactForm) contactForm.addEventListener("submit", event => {
  event.preventDefault();
  showToast("Mensagem enviada! (demonstração)");
  contactForm.reset();
});
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  const dateInput = document.getElementById("date");
  dateInput.min = new Date().toISOString().split("T")[0];
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    showToast("Solicitação registrada! (demonstração)");
    bookingForm.reset();
  });
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  const cart = getCart();
  const summary = document.getElementById("cart-summary");
  if (!cart.length) {
    container.innerHTML = '<div class="empty"><div style="font-size:3rem">🛒</div><h2>Seu carrinho está vazio</h2><p style="margin:10px 0 20px">Explore nossos produtos e adicione seus favoritos.</p><a class="btn" href="produtos.html">Ver produtos</a></div>';
    summary.hidden = true;
    return;
  }
  summary.hidden = false;
  container.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div><h3>${item.name}</h3><p>${moneyBRL(item.price)} cada</p><button class="btn secondary" style="padding:5px 10px;margin-top:6px" onclick="removeFromCart(${item.id})">Remover</button></div>
      <div class="qty"><button aria-label="Diminuir quantidade" onclick="changeQty(${item.id},-1)">−</button><strong>${item.qty}</strong><button aria-label="Aumentar quantidade" onclick="changeQty(${item.id},1)">+</button></div>
      <strong class="item-total">${moneyBRL(item.price * item.qty)}</strong>
    </article>`).join("");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("cart-subtotal").textContent = moneyBRL(total);
  document.getElementById("cart-total").textContent = moneyBRL(total);
}
function changeQty(id, amount) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (item) item.qty += amount;
  const updated = cart.filter(p => p.qty > 0);
  localStorage.setItem("mundoPetCart", JSON.stringify(updated));
  updateCartCount(); renderCart();
}
function removeFromCart(id) {
  localStorage.setItem("mundoPetCart", JSON.stringify(getCart().filter(item => item.id !== id)));
  updateCartCount(); renderCart(); showToast("Produto removido.");
}
const checkout = document.getElementById("checkout");
if (checkout) checkout.addEventListener("click", () => {
  if (!getCart().length) return;
  showToast("Pedido demonstrativo finalizado! Nenhuma cobrança foi realizada.");
  localStorage.removeItem("mundoPetCart");
  updateCartCount(); renderCart();
});
renderCart();
