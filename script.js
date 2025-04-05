document.addEventListener("DOMContentLoaded", function () {
    // ==============================
    // VARIABLES Y ELEMENTOS DEL DOM
    // ==============================
    const toggleNav = document.getElementById("toggleNav"); // Botón para mostrar/ocultar menú en móviles
    const barnav = document.getElementById("barnav"); // Barra de navegación
    const navLinks = barnav.querySelectorAll("a"); // Enlaces dentro de la barra de navegación
    const contenido = document.getElementById("contenido"); // Contenedor del contenido dinámico

    // ==============================
    // FUNCIÓN: MOSTRAR/OCULTAR NAV EN MÓVILES
    // ==============================
    function toggleMenu() {
        barnav.classList.toggle("visible");
    }
    toggleNav.addEventListener("click", toggleMenu);

    // ==============================
    // FUNCIÓN: CERRAR MENÚ EN MÓVILES AL HACER CLIC EN UN ENLACE
    // ==============================
    function cerrarMenuMovil() {
        if (window.innerWidth <= 768) {
            barnav.classList.remove("visible");
        }
    }
    navLinks.forEach(link => link.addEventListener("click", cerrarMenuMovil));

    // ==============================
    // FUNCIÓN: AJUSTAR VISIBILIDAD DEL MENÚ SEGÚN EL TAMAÑO DE PANTALLA
    // ==============================
    function ajustarNav() {
        barnav.classList.toggle("visible", window.innerWidth > 768);
    }
    window.addEventListener("resize", ajustarNav);
    ajustarNav(); // Ajustar menú al cargar la página

    // ==============================
    // FUNCIÓN: MARCAR OPCIÓN ACTIVA EN EL MENÚ
    // ==============================
    function marcarEnlaceActivo(pagina) {
        navLinks.forEach(link => link.classList.remove("activo")); // Eliminar activo de todos
        const enlaceActivo = [...navLinks].find(link => link.getAttribute("href") === pagina);
        if (enlaceActivo) {
            enlaceActivo.classList.add("activo"); // Marcar como activo
        }
    }

    // ==============================
    // FUNCIÓN: CARGAR CONTENIDO DINÁMICO SIN RECARGAR LA PÁGINA
    // ==============================
    window.cargarContenido = function (pagina) {
        fetch(pagina)
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar la página");
                return response.text();
            })
            .then(data => {
                contenido.innerHTML = data;
                window.scrollTo(0, 0); // Desplazar al inicio tras cargar contenido
                marcarEnlaceActivo(pagina); // Actualizar el menú activo
            })
            .catch(error => console.error("Error al cargar el contenido:", error));
    };

    // ==============================
    // CARGAR AUTOMÁTICAMENTE LA PÁGINA DE INICIO
    // ==============================
    cargarContenido("inicio.html");
});



// ==============================
// CÓDIGO PARA EL FORMULARIO DE CONTACTO
// ==============================

function enviarFormulario() {
    const form = document.getElementById('form-google');
    const popup = document.getElementById('popup');
    const okButton = document.getElementById('popup-ok');

    form.submit(); // Enviar a Google Forms
    popup.style.display = 'flex'; // Mostrar popup

    okButton.onclick = () => {
        popup.style.display = 'none'; // Ocultar popup
        form.reset(); // Limpiar formulario
    };
}
