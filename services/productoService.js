/**
 * services/productoService.js
 * -----------------------------------------------------------------------
 * CAPA DE SERVICIO — reglas de negocio de productos.
 *
 * Bajo acoplamiento: este módulo es la ÚNICA puerta de entrada a
 * data/database.js para todo lo relacionado con productos. Los
 * controladores nunca importan database.js directamente; si mañana
 * cambia cómo se guardan los productos (por ejemplo, a una API real),
 * sólo se modifica este archivo.
 * -----------------------------------------------------------------------
 */
import * as db from "../data/database.js";

export function listarDisponibles() {
  return db.getProductos().filter(p => p.disponible);
}

export function listarTodos() {
  return db.getProductos();
}

export function obtenerPorId(id) {
  return db.getProducto(id);
}

export function crear({ nombre, precio, categoria }) {
  if (!nombre || !precio || Number(precio) <= 0) {
    throw new Error("Datos de producto inválidos");
  }
  return db.guardarProducto({ nombre, precio: Number(precio), categoria, disponible: true, emoji: "🍽️" });
}

export function cambiarDisponibilidad(id) {
  const p = db.getProducto(id);
  if (!p) return;
  db.guardarProducto({ id, disponible: !p.disponible });
}

export function eliminar(id) {
  db.eliminarProducto(id);
}
