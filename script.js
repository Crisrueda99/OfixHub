document.addEventListener("DOMContentLoaded", function () {
    const toggleNav = document.getElementById("toggleNav");
    const barnav = document.getElementById("barnav");
    const navLinks = barnav.querySelectorAll("a");
    const contenido = document.getElementById("contenido");

    // Mostrar/ocultar la barra de navegación en móviles
    toggleNav.addEventListener("click", function () {
        barnav.classList.toggle("visible");
    });

    // Cerrar el menú en móviles al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                barnav.classList.remove("visible");
            }
        });
    });

    // Ajustar la visibilidad de la barra de navegación al redimensionar
    function ajustarNav() {
        if (window.innerWidth > 768) {
            barnav.classList.add("visible");
        } else {
            barnav.classList.remove("visible");
        }
    }

    window.addEventListener("resize", ajustarNav);
    ajustarNav();

    // Función para cargar contenido dinámico
    window.cargarContenido = function (pagina) {
        fetch(pagina)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar la página");
                }
                return response.text();
            })
            .then(data => {
                contenido.innerHTML = data;
                window.scrollTo(0, 0);
            })
            .catch(error => console.error("Error al cargar el contenido:", error));
    };

    // Cargar la página de inicio automáticamente al abrir index.html
    cargarContenido("inicio.html");
});
