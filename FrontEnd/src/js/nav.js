document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // Resaltar el enlace activo
        const currentPath = window.location.pathname;
        document.querySelectorAll(".nav-item a").forEach(link => {
            console.log(currentPath);
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    });
});