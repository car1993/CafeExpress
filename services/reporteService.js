/**
 * services/reporteService.js
 * -----------------------------------------------------------------------
 * ESTE ARCHIVO ES LA PRUEBA DE ESCALABILIDAD DEL DISEÑO.
 *
 * Es una funcionalidad NUEVA (reportes de ventas para el administrador)
 * agregada DESPUÉS de que el resto del sistema ya funcionaba. Para
 * construirla no fue necesario modificar ni una sola línea de:
 *   - data/database.js
 *   - services/productoService.js
 *   - services/pedidoService.js
 *
 * Sólo se reutilizan las funciones que esos módulos ya exponían
 * (pedidoService.listarTodos). Así se agregan funcionalidades sin
 * reestructurar el sistema existente.
 * -----------------------------------------------------------------------
 */
import * as pedidoService from "./pedidoService.js";

export function totalVendido() {
  return pedidoService.listarTodos()
    .filter(p => p.estado === "Entregado")
    .reduce((acc, p) => acc + p.total, 0);
}

export function totalPedidos() {
  return pedidoService.listarTodos().length;
}

export function productoMasVendido() {
  const conteo = {};
  pedidoService.listarTodos().forEach(pedido => {
    pedido.detalle.forEach(d => {
      conteo[d.nombre] = (conteo[d.nombre] || 0) + d.cantidad;
    });
  });
  const entradas = Object.entries(conteo);
  if (entradas.length === 0) return null;
  entradas.sort((a, b) => b[1] - a[1]);
  return { nombre: entradas[0][0], cantidad: entradas[0][1] };
}
