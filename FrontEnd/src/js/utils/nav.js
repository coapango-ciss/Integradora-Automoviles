import { logout } from "./session.js";
import { findCurrentEmployee } from "../services/employeeService.js";

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
    let currentRol = rol === "ROLE_ADMIN" ? "Administrador" : "Empleado";
    let currentUser = await findCurrentEmployee();
    console.log(currentUser);

    fetch(navbarFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            const currentPath = window.location.pathname;
            document.querySelectorAll(".nav-item a").forEach(link => {
                if (link.getAttribute("href") === currentPath) {
                    link.classList.add("active");
                }
            });

            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", logout);
            }

            const sessionInfoCard = document.querySelector(".session-info");
            if (sessionInfoCard) {
                sessionInfoCard.innerHTML = `${currentUser.name} | ${currentRol}`;
            }

        });
}
