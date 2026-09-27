/**
 * ui/adminPedidosView.js — Interfaz: pedidos recibidos (administrador).
 */
import * as pedidoController from "../controllers/pedidoController.js";
import { ESTADOS_PEDIDO } from "../config/estados.js";
import { on, emit } from "./eventBus.js";

const fmt = n => "$" + n.toLocaleString("es-CO");

export function init() {
  render();
  on("pedido:creado", render);
}

export function render() {
  const pedidos = pedidoController.listarPedidos();
  document.getElementById("tabla-pedidos").innerHTML = pedidos.length ? pedidos.map(p => `
    <tr>
      <td><b>${p.codigo}</b></td>
      <td>${p.cliente}<br><span style="color:var(--muted);font-size:11.5px;">${p.mesa || "—"}</span></td>
      <td>${p.detalle.map(d => `${d.cantidad}× ${d.nombre}`).join(", ")}</td>
      <td>${fmt(p.total)}</td>
      <td>
        <select class="mini-input" data-est="${p.codigo}">
          ${ESTADOS_PEDIDO.map(e => `<option ${e === p.estado ? "selected" : ""}>${e}</option>`).join("")}
        </select>
      </td>
    </tr>`).join("") : `<tr><td colspan="5"><div class="empty-note">Todavía no se han recibido pedidos.</div></td></tr>`;

  document.querySelectorAll("[data-est]").forEach(sel => {
    sel.addEventListener("change", () => {
      pedidoController.actualizarEstado(sel.dataset.est, sel.value);
      render();
      emit("pedidos:cambio");
    });
  });
}
