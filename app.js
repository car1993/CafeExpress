/**
 * app.js — punto de entrada.
 * Su única responsabilidad es arrancar cada módulo de interfaz.
 * Si se agrega una vista nueva, se registra aquí en una línea;
 * ninguna vista existente necesita saber que la nueva existe.
 */
import * as navigation from "./ui/navigation.js";
import * as menuView from "./ui/menuView.js";
import * as carritoView from "./ui/carritoView.js";
import * as estadoView from "./ui/estadoView.js";
import * as adminProductosView from "./ui/adminProductosView.js";
import * as adminPedidosView from "./ui/adminPedidosView.js";
import * as reportesView from "./ui/reportesView.js";

menuView.init();
carritoView.init();
estadoView.init();

navigation.init({
  onAdminUnlocked() {
    adminProductosView.init();
    adminPedidosView.init();
    reportesView.init();
  }
});
