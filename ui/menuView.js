/**
 * ui/menuView.js — Interfaz: catálogo de productos para el cliente.
 * Sólo renderiza y traduce clics en llamadas al controlador.
 */
import * as productoController from "../controllers/productoController.js";
import * as pedidoController from "../controllers/pedidoController.js";
import { emit, on } from "./eventBus.js";

const fmt = n => "$" + n.toLocaleString("es-CO");
let filtroCategoria = "Todas";

export function init() {
  renderFiltros();
  renderGrid();
  on("catalogo:cambio", () => { renderFiltros(); renderGrid(); });
}

function renderFiltros() {
  const cats = ["Todas", ...new Set(productoController.obtenerMenu().map(p => p.categoria))];
  document.getElementById("cat-filters").innerHTML = cats.map(c =>
    `<button class="cat-chip ${c === filtroCategoria ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll("#cat-filters .cat-chip").forEach(b => {
    b.addEventListener("click", () => { filtroCategoria = b.dataset.cat; renderFiltros(); renderGrid(); });
  });
}

function renderGrid() {
  const productos = productoController.obtenerMenu()
    .filter(p => filtroCategoria === "Todas" || p.categoria === filtroCategoria);
  document.getElementById("menu-grid").innerHTML = productos.map(p => `
    <div class="product-card">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.nombre}</h3>
      <div class="desc">${p.categoria}</div>
      <div class="row">
        <span class="price">${fmt(p.precio)}</span>
        <button class="add-btn" data-add="${p.id}">Agregar</button>
      </div>
    </div>`).join("") || `<div class="empty-note">No hay productos disponibles en esta categoría.</div>`;
  document.querySelectorAll("[data-add]").forEach(b => {
    b.addEventListener("click", () => {
      pedidoController.agregarAlCarrito(Number(b.dataset.add));
      emit("carrito:cambio");
    });
  });
}
