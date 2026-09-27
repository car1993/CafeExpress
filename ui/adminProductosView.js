/**
 * ui/adminProductosView.js — Interfaz: gestión de productos (administrador).
 */
import * as productoController from "../controllers/productoController.js";
import { emit } from "./eventBus.js";

const fmt = n => "$" + n.toLocaleString("es-CO");

export function init() {
  render();
  document.getElementById("btn-add-producto").addEventListener("click", agregar);
}

export function render() {
  const productos = productoController.obtenerCatalogoCompleto();
  document.getElementById("tabla-productos").innerHTML = productos.map(p => `
    <tr>
      <td>${p.emoji} ${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${fmt(p.precio)}</td>
      <td><button class="avail-toggle ${p.disponible ? "on" : "off"}" data-tog="${p.id}">${p.disponible ? "Disponible" : "Agotado"}</button></td>
      <td><button class="del-btn" data-del="${p.id}">Eliminar</button></td>
    </tr>`).join("");

  document.querySelectorAll("[data-tog]").forEach(b => b.addEventListener("click", () => {
    productoController.alternarDisponibilidad(Number(b.dataset.tog));
    render();
    emit("catalogo:cambio");
  }));
  document.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
    productoController.eliminarProducto(Number(b.dataset.del));
    render();
    emit("catalogo:cambio");
  }));
}

function agregar() {
  const nombre = document.getElementById("np-nombre").value.trim();
  const precio = document.getElementById("np-precio").value;
  const categoria = document.getElementById("np-categoria").value;
  const r = productoController.agregarProducto({ nombre, precio, categoria });
  if (!r.ok) { alert(r.mensaje); return; }
  document.getElementById("np-nombre").value = "";
  document.getElementById("np-precio").value = "";
  render();
  emit("catalogo:cambio");
}
