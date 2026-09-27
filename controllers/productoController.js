/**
 * controllers/productoController.js
 * -----------------------------------------------------------------------
 * CAPA DE CONTROLADOR — traduce acciones de la interfaz en llamadas
 * al servicio. No contiene reglas de negocio propias: si aquí
 * apareciera un cálculo de precios o una validación, sería una señal
 * de que la responsabilidad está en la capa equivocada (baja cohesión).
 * -----------------------------------------------------------------------
 */
import * as productoService from "../services/productoService.js";

export function obtenerMenu() {
  return productoService.listarDisponibles();
}

export function obtenerCatalogoCompleto() {
  return productoService.listarTodos();
}

export function agregarProducto(datos) {
  try {
    productoService.crear(datos);
    return { ok: true };
  } catch (e) {
    return { ok: false, mensaje: e.message };
  }
}

export function alternarDisponibilidad(id) {
  productoService.cambiarDisponibilidad(id);
}

export function eliminarProducto(id) {
  productoService.eliminar(id);
}
