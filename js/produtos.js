const products = [
  {id:1, name:"Ração Premium para cães", category:"Alimentação", price:89.90, image:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80", description:"Alimento completo para o dia a dia."},
  {id:2, name:"Ração para gatos", category:"Alimentação", price:74.90, image:"https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80", description:"Nutrição para seu amigo felino."},
  {id:3, name:"Brinquedo de corda", category:"Brinquedos", price:19.90, image:"https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80", description:"Ideal para brincadeiras e interação."},
  {id:4, name:"Bolinha divertida", category:"Brinquedos", price:12.50, image:"img/bolinha-divertida.jpg", description:"Diversão para momentos ativos."},
  {id:5, name:"Coleira ajustável", category:"Acessórios", price:29.90, image:"img/coleira-ajustavel.jpg", description:"Confortável e prática para passeios."},
  {id:6, name:"Caminha confortável", category:"Acessórios", price:119.90, image:"img/caminha-confortavel.jpg", description:"Um cantinho macio para descansar."},
  {id:7, name:"Shampoo pet suave", category:"Higiene", price:24.90, image:"https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80", description:"Para uma rotina de higiene cuidadosa."},
  {id:8, name:"Escova para pelos", category:"Higiene", price:17.90, image:"img/escova-para-pelos.jpg", description:"Ajuda a manter os pelos bem cuidados."}
];
const money = value => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
const list = document.getElementById("product-list");
function renderProducts() {
  const term = document.getElementById("product-search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;
  const filtered = products.filter(p => (p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)) && (category === "todos" || p.category === category));
  list.innerHTML = filtered.length ? filtered.map(p => `
    <article class="card product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="card-content"><small>${p.category}</small><h3>${p.name}</h3><p>${p.description}</p><div class="price">${money(p.price)}</div>
      <button class="btn" onclick="addToCart(${p.id})">Adicionar ao carrinho</button></div>
    </article>`).join("") : '<p>Nenhum produto encontrado. Tente outra pesquisa.</p>';
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cart = JSON.parse(localStorage.getItem("mundoPetCart") || "[]");
  const found = cart.find(item => item.id === id);
  if (found) found.qty += 1; else cart.push({id:product.id, name:product.name, price:product.price, image:product.image, qty:1});
  localStorage.setItem("mundoPetCart", JSON.stringify(cart));
  updateCartCount();
  showToast("Produto adicionado ao carrinho!");
}
document.getElementById("product-search").addEventListener("input", renderProducts);
document.getElementById("category-filter").addEventListener("change", renderProducts);
renderProducts();
