/**
 * ui/eventBus.js
 * -----------------------------------------------------------------------
 * Bajo acoplamiento entre vistas: menuView, carritoView, adminProductosView,
 * etc. NUNCA se importan entre sí directamente. Cuando algo cambia,
 * publican un evento; a quien le interese, se suscribe. Así se puede
 * agregar o quitar una vista sin que las demás se enteren ni se rompan.
 * -----------------------------------------------------------------------
 */
const canal = document.createDocumentFragment
  ? document.createElement("div")
  : {};

export function on(evento, callback) {
  canal.addEventListener(evento, (e) => callback(e.detail));
}

export function emit(evento, detalle) {
  canal.dispatchEvent(new CustomEvent(evento, { detail: detalle }));
}
