/**
 * services/pedidoService.js
 * -----------------------------------------------------------------------
 * CAPA DE SERVICIO — reglas de negocio de pedidos.
 * Aquí vive la validación, el cálculo del total y la generación del
 * detalle del pedido: nada de esto lo conoce la interfaz ni la base
 * de datos (separación de responsabilidades).
 * -----------------------------------------------------------------------
 */
import * as db from "../data/database.js";
import * as productoService from "./productoService.js";
import { ESTADOS_PEDIDO } from "../config/estados.js";

export function crearPedido({ cliente, mesa, items }) {
  if (!cliente) throw new Error("El nombre del cliente es obligatorio");
  if (!items || items.length === 0) throw new Error("El pedido no puede estar vacío");

  const detalle = items.map(item => {
    const producto = productoService.obtenerPorId(item.id);
    return { productoId: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: item.cantidad };
  });
  const total = detalle.reduce((acc, d) => acc + d.precio * d.cantidad, 0);

  return db.guardarPedido({
    cliente, mesa, detalle, total,
    estado: ESTADOS_PEDIDO[0],
    fecha: new Date().toISOString(),
  });
}

export function listarTodos() {
  return db.getPedidos();
}

export function buscarPorCodigo(codigo) {
  return db.getPedidoPorCodigo(codigo.trim().toUpperCase());
}

export function actualizarEstado(codigo, estado) {
  if (!ESTADOS_PEDIDO.includes(estado)) throw new Error("Estado no válido");
  return db.actualizarEstadoPedido(codigo, estado);
}
