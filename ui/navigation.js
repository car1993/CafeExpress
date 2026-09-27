/**
 * ui/navigation.js — coordina qué vista se muestra, pero no dibuja
 * datos de negocio (eso es responsabilidad de cada vista).
 */
export function init({ onAdminUnlocked }) {
  // Cliente: menú <-> estado del pedido
  document.querySelectorAll("#cliente-subnav .cat-chip").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#cliente-subnav .cat-chip").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const sub = b.dataset.sub;
      document.getElementById("cliente-menu").style.display = sub === "menu" ? "block" : "none";
      document.getElementById("cliente-estado").style.display = sub === "estado" ? "block" : "none";
    });
  });

  // Cliente <-> Administrador
  document.querySelectorAll(".role-btn").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".role-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const role = b.dataset.role;
      document.getElementById("view-cliente").classList.toggle("active", role === "cliente");
      document.getElementById("view-admin").classList.toggle("active", role === "admin");
    });
  });

  // Acceso de administrador
  document.getElementById("gate-btn").addEventListener("click", () => {
    const val = document.getElementById("gate-pass").value;
    if (val === "cafe123") {
      document.getElementById("admin-gate").style.display = "none";
      document.getElementById("admin-panel").style.display = "block";
      onAdminUnlocked();
    } else {
      document.getElementById("gate-err").style.display = "block";
    }
  });

  // Pestañas del administrador
  document.querySelectorAll(".admin-tab").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      document.querySelectorAll(".admin-view").forEach(v => v.classList.remove("active"));
      document.getElementById("admin-" + b.dataset.atab).classList.add("active");
    });
  });
}
