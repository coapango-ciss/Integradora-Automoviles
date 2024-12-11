import { logout } from "./session.js";

export async function loadNavbar(rol) {
    let navbarFile = "navbar-default.html"; // Archivo predeterminado

    if (rol === "ROLE_ADMIN") {
        navbarFile = "navbar-admin.html";
    } else if (rol === "ROLE_EMPLOYEE") {
        navbarFile = "navbar-employee.html";
    } else {
        alert("Acceso denegado");
        return; // Detener la carga si no hay acceso
    }

    // Cargar la barra de navegación
    fetch(navbarFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            // Resaltar el enlace activo
            const currentPath = window.location.pathname;
            document.querySelectorAll(".nav-item a").forEach(link => {
                if (link.getAttribute("href") === currentPath) {
                    link.classList.add("active");
                }
            });

            // Vincular el botón de logout
            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", logout);
            }
        });
}
