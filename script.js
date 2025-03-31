document.addEventListener("DOMContentLoaded", function () {
    const toggleNav = document.getElementById("toggleNav");
    const barnav = document.getElementById("barnav");
    const navLinks = barnav.querySelectorAll("a"); 

    // Función para mostrar u ocultar el menú en móviles
    toggleNav.addEventListener("click", function () {
        barnav.classList.toggle("visible");
    });

    // Cerrar menú al hacer clic en un enlace (solo en móviles)
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                barnav.classList.remove("visible");
            }
        });
    });

    // Ajustar la visibilidad del navbar cuando cambia el tamaño de la ventana
    function ajustarNav() {
        if (window.innerWidth > 768) {
            barnav.classList.add("visible");
        } else {
            barnav.classList.remove("visible");
        }
    }

    // Ejecutar al cargar la página y cuando la pantalla cambie de tamaño
    ajustarNav();
    window.addEventListener("resize", ajustarNav);

    // Funcionalidad del botón en el footer
    const footerBtn = document.getElementById("footerBtn");
    footerBtn.addEventListener("click", function () {
        alert("¡Contáctanos al correo: contacto@mipagina.com!");
    });
});

// Función para cargar contenido dinámico
function cargarContenido(pagina) {
    fetch(pagina)
    .then(response => response.text())
    .then(data => {
        document.getElementById("contenido").innerHTML = data;
    })
    .catch(error => console.error("Error al cargar el contenido:", error));
}
