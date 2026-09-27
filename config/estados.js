/**
 * config/estados.js
 * -----------------------------------------------------------------------
 * Punto único de configuración compartida por varios módulos.
 * Escalabilidad: si mañana se agrega un nuevo estado de pedido
 * (por ejemplo "Cancelado"), sólo se edita ESTE arreglo; ningún otro
 * archivo necesita cambiar porque todos leen ESTADOS_PEDIDO desde aquí.
 * -----------------------------------------------------------------------
 */
export const ESTADOS_PEDIDO = ["Recibido", "En preparación", "Listo", "Entregado"];

export const CATEGORIAS_SUGERIDAS = ["Bebidas calientes", "Bebidas frías", "Postres", "Snacks"];
