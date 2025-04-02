document.addEventListener("DOMContentLoaded", function () {
    const toggleNav = document.getElementById("toggleNav");
    const barnav = document.getElementById("barnav");
    const navLinks = barnav.querySelectorAll("a");

    // Función para mostrar/ocultar la barra de navegación
    toggleNav.addEventListener("click", function () {
        barnav.classList.toggle("visible");
    });

    // Cerrar el menú en móviles cuando se haga clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                barnav.classList.remove("visible");
            }
        });
    });

    // Ajustar la visibilidad del navbar al cambiar el tamaño de la ventana
    function ajustarNav() {
        if (window.innerWidth > 768) {
            barnav.classList.add("visible");
        } else {
            barnav.classList.remove("visible");
        }
    }

    ajustarNav();
    window.addEventListener("resize", ajustarNav);

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
                document.getElementById("contenido").innerHTML = data;
                window.scrollTo(0, 0);
            })
            .catch(error => console.error("Error al cargar el contenido:", error));
    };
});
