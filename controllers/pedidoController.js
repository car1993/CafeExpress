/**
 * controllers/pedidoController.js
 * -----------------------------------------------------------------------
 * CAPA DE CONTROLADOR — coordina el flujo de "hacer un pedido".
 *
 * Ocultamiento de información: el carrito de compras es un detalle de
 * la sesión actual del cliente, no un dato de negocio permanente, así
 * que vive como variable privada de ESTE módulo (no en la base de
 * datos ni accesible desde la interfaz). La interfaz sólo puede leerlo
 * u operarlo a través de las funciones exportadas.
 * -----------------------------------------------------------------------
 */
import * as pedidoService from "../services/pedidoService.js";
import * as productoService from "../services/productoService.js";

let carrito = []; // [{ id, cantidad }] — estado privado del módulo

export function agregarAlCarrito(id) {
  const item = carrito.find(i => i.id === id);
  if (item) item.cantidad++; else carrito.push({ id, cantidad: 1 });
}

export function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) carrito = carrito.filter(i => i.id !== id);
}

export function obtenerCarrito() {
  return carrito.map(i => ({ ...productoService.obtenerPorId(i.id), cantidad: i.cantidad }));
}

export function confirmarPedido(cliente, mesa) {
  try {
    const pedido = pedidoService.crearPedido({ cliente, mesa, items: carrito });
    carrito = [];
    return { ok: true, pedido };
  } catch (e) {
    return { ok: false, mensaje: e.message };
  }
}

export function consultarEstado(codigo) {
  return pedidoService.buscarPorCodigo(codigo);
}

export function listarPedidos() {
  return pedidoService.listarTodos();
}

export function actualizarEstado(codigo, estado) {
  return pedidoService.actualizarEstado(codigo, estado);
}
