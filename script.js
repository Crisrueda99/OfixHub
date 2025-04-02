document.addEventListener("DOMContentLoaded", function () {
    const toggleNav = document.getElementById("toggleNav");
    const barnav = document.getElementById("barnav");
    const navLinks = barnav.querySelectorAll("a");

    // Función para mostrar u ocultar la barra de navegación
    toggleNav.addEventListener("click", function () {
        barnav.classList.toggle("visible");
    });

    // Cerrar el menú al hacer clic en un enlace (solo en móviles)
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

    // Ejecutar al cargar la página y cuando la pantalla cambie de tamaño
    ajustarNav();
    window.addEventListener("resize", ajustarNav);

    // Función para cargar contenido dinámico
    function cargarContenido(pagina) {
        fetch(pagina)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar la página");
                }
                return response.text();
            })
            .then(data => {
                document.getElementById("contenido").innerHTML = data;
                window.scrollTo(0, 0); // Desplazar hacia arriba al cargar nuevo contenido
            })
            .catch(error => console.error("Error al cargar el contenido:", error));
    }

    // Asignar la función de carga de contenido a los enlaces del navbar
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const pagina = this.getAttribute("onclick");
            if (pagina) {
                cargarContenido(pagina.replace("cargarContenido('", "").replace("')", ""));
            }
        });
    });
});