/**
 * ui/reportesView.js
 * -----------------------------------------------------------------------
 * Módulo agregado DESPUÉS de tener el sistema funcionando, sin tocar
 * ningún archivo existente salvo el registro de la pestaña en
 * ui/navigation.js. Es la evidencia de la propiedad de escalabilidad.
 * -----------------------------------------------------------------------
 */
import * as reporteService from "../services/reporteService.js";
import { on } from "./eventBus.js";

const fmt = n => "$" + n.toLocaleString("es-CO");

export function init() {
  render();
  on("pedido:creado", render);
  on("pedidos:cambio", render);
}

function render() {
  const cont = document.getElementById("admin-reportes");
  const masVendido = reporteService.productoMasVendido();
  cont.innerHTML = `
    <div class="menu-grid" style="grid-template-columns:repeat(3,1fr);">
      <div class="product-card">
        <div class="desc">Total vendido (pedidos entregados)</div>
        <h3 style="font-size:22px;">${fmt(reporteService.totalVendido())}</h3>
      </div>
      <div class="product-card">
        <div class="desc">Pedidos totales</div>
        <h3 style="font-size:22px;">${reporteService.totalPedidos()}</h3>
      </div>
      <div class="product-card">
        <div class="desc">Producto más vendido</div>
        <h3 style="font-size:18px;">${masVendido ? `${masVendido.nombre} (${masVendido.cantidad})` : "—"}</h3>
      </div>
    </div>`;
}
