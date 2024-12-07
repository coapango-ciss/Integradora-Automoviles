import { logout } from "./utils/session.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // Resaltar el enlace activo
        const logoutBtn = document.getElementById("logoutBtn");
        const currentPath = window.location.pathname;
        logoutBtn.addEventListener("click", logout);
        document.querySelectorAll(".nav-item a").forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    });
});