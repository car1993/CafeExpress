/**
 * ui/estadoView.js — Interfaz: consulta del estado de un pedido por código.
 */
import * as pedidoController from "../controllers/pedidoController.js";
import { ESTADOS_PEDIDO } from "../config/estados.js";

const fmt = n => "$" + n.toLocaleString("es-CO");

export function init() {
  document.getElementById("btn-buscar").addEventListener("click", buscar);
}

function buscar() {
  const codigo = document.getElementById("input-codigo").value;
  const pedido = pedidoController.consultarEstado(codigo);
  const cont = document.getElementById("estado-resultado");
  if (!pedido) {
    cont.innerHTML = `<div class="not-found">No encontramos un pedido con ese código.</div>`;
    return;
  }
  const idx = ESTADOS_PEDIDO.indexOf(pedido.estado);
  cont.innerHTML = `
    <div class="timeline">
      ${ESTADOS_PEDIDO.map((e, i) => `
        <div class="tl-step ${i < idx ? "done" : ""} ${i === idx ? "current" : ""}">
          <div class="tl-dot">${i < idx ? "✓" : i + 1}</div>
          <div class="tl-label">${e}</div>
        </div>`).join("")}
    </div>
    <div class="order-meta">
      <b>${pedido.codigo}</b> · ${pedido.cliente} · ${pedido.mesa || "—"}<br>
      ${pedido.detalle.map(d => `${d.cantidad}× ${d.nombre}`).join(", ")}<br>
      Total: <b>${fmt(pedido.total)}</b>
    </div>`;
}
