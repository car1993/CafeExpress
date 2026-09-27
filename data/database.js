/**
 * data/database.js
 * -----------------------------------------------------------------------
 * CAPA DE BASE DE DATOS (persistencia simulada en memoria).
 *
 * Ocultamiento de información:
 *   Los arreglos `productos` y `pedidos` son variables privadas del
 *   módulo (nunca se exportan). El resto de la aplicación NO puede
 *   tocarlos directamente ni corromper su estado: solo puede interactuar
 *   con ellos a través de las funciones exportadas, y cada función
 *   devuelve copias (spread `{...}`) para que nadie modifique los
 *   objetos originales por accidente.
 *
 * Alta cohesión:
 *   Todo lo que hay en este archivo trata de un único tema: cómo se
 *   guardan y leen los datos crudos. No contiene reglas de negocio
 *   (eso vive en la capa de servicio).
 * -----------------------------------------------------------------------
 */

let productos = [
  { id: 1, nombre: "Espresso",        categoria: "Bebidas calientes", precio: 5000,  disponible: true,  emoji: "☕" },
  { id: 2, nombre: "Cappuccino",       categoria: "Bebidas calientes", precio: 7000,  disponible: true,  emoji: "☕" },
  { id: 3, nombre: "Latte vainilla",   categoria: "Bebidas calientes", precio: 8000,  disponible: true,  emoji: "☕" },
  { id: 4, nombre: "Frappé de mocha",  categoria: "Bebidas frías",     precio: 9500,  disponible: true,  emoji: "🥤" },
  { id: 5, nombre: "Limonada de coco", categoria: "Bebidas frías",     precio: 7500,  disponible: true,  emoji: "🥥" },
  { id: 6, nombre: "Cheesecake",       categoria: "Postres",           precio: 9000,  disponible: true,  emoji: "🍰" },
  { id: 7, nombre: "Brownie",          categoria: "Postres",           precio: 6500,  disponible: false, emoji: "🍫" },
  { id: 8, nombre: "Croissant",        categoria: "Snacks",            precio: 5500,  disponible: true,  emoji: "🥐" },
];
let pedidos = [];
let seqProducto = 8;
let seqPedido = 1031;

export function getProductos() {
  return productos.map(p => ({ ...p }));
}

export function getProducto(id) {
  const p = productos.find(p => p.id === id);
  return p ? { ...p } : undefined;
}

export function guardarProducto(datos) {
  if (datos.id) {
    const existente = productos.find(p => p.id === datos.id);
    if (existente) Object.assign(existente, datos);
    return { ...existente };
  }
  const nuevo = { ...datos, id: ++seqProducto };
  productos.push(nuevo);
  return { ...nuevo };
}

export function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
}

export function getPedidos() {
  return pedidos.map(p => ({ ...p }));
}

export function getPedidoPorCodigo(codigo) {
  const p = pedidos.find(p => p.codigo === codigo);
  return p ? { ...p } : undefined;
}

export function guardarPedido(pedido) {
  const nuevo = { ...pedido, codigo: "CE-" + (++seqPedido) };
  pedidos.unshift(nuevo);
  return { ...nuevo };
}

export function actualizarEstadoPedido(codigo, estado) {
  const p = pedidos.find(p => p.codigo === codigo);
  if (p) p.estado = estado;
  return p ? { ...p } : undefined;
}
