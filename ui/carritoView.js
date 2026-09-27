/**
 * ui/carritoView.js — Interfaz: carrito de compras y confirmación de pedido.
 */
import * as pedidoController from "../controllers/pedidoController.js";
import { on, emit } from "./eventBus.js";

const fmt = n => "$" + n.toLocaleString("es-CO");

export function init() {
  render();
  on("carrito:cambio", render);
  document.getElementById("btn-confirmar").addEventListener("click", confirmar);
}

function render() {
  const items = pedidoController.obtenerCarrito();
  const cont = document.getElementById("cart-items");
  cont.innerHTML = items.length ? items.map(it => `
    <div class="cart-item">
      <span>${it.nombre}</span>
      <div class="qty-ctrl">
        <button data-menos="${it.id}">−</button>
        <span>${it.cantidad}</span>
        <button data-mas="${it.id}">+</button>
      </div>
    </div>`).join("") : `<div class="cart-empty">Aún no has agregado productos.</div>`;

  const total = items.reduce((a, i) => a + i.precio * i.cantidad, 0);
  document.getElementById("cart-total").textContent = fmt(total);
  document.getElementById("btn-confirmar").disabled = items.length === 0;

  cont.querySelectorAll("[data-mas]").forEach(b => b.addEventListener("click", () => {
    pedidoController.cambiarCantidad(Number(b.dataset.mas), 1); emit("carrito:cambio");
  }));
  cont.querySelectorAll("[data-menos]").forEach(b => b.addEventListener("click", () => {
    pedidoController.cambiarCantidad(Number(b.dataset.menos), -1); emit("carrito:cambio");
  }));
}

function confirmar() {
  const nombre = document.getElementById("input-nombre").value.trim();
  const mesa = document.getElementById("input-mesa").value.trim();
  const r = pedidoController.confirmarPedido(nombre, mesa);
  if (!r.ok) { alert(r.mensaje); return; }
  document.getElementById("input-nombre").value = "";
  document.getElementById("input-mesa").value = "";
  emit("carrito:cambio");
  emit("pedido:creado", r.pedido);
  alert(`¡Pedido confirmado! Tu código es ${r.pedido.codigo}. Guárdalo para consultar el estado.`);
}
