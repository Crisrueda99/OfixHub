document.addEventListener("DOMContentLoaded", function () {
    // ==============================
    // VARIABLES Y ELEMENTOS DEL DOM
    // ==============================
    const toggleNav = document.getElementById("toggleNav"); // Botón para mostrar/ocultar menú en móviles
    const barnav = document.getElementById("barnav"); // Barra de navegación
    const navLinks = barnav.querySelectorAll("a"); // Enlaces dentro de la barra de navegación
    const contenido = document.getElementById("contenido"); // Contenedor del contenido dinámico
    const logo = document.querySelector(".logo"); // Logo para cambiar paleta de colores
    const footer = document.querySelector("footer"); // Footer para cambiar paleta de colores

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

    // ==============================
    // FUNCIONES PARA CAMBIAR LA PALETA DE COLORES
    // ==============================

    // Función para cambiar la paleta de colores de la página
    function cambiarPaleta(colores) {
        document.body.style.backgroundColor = colores.background;
        document.body.style.color = colores.texto;
        barnav.style.backgroundColor = colores.navBackground;
        barnav.querySelectorAll("a").forEach(link => {
            link.style.color = colores.linkColor;
            link.style.borderColor = colores.linkBorderColor;
            link.style.backgroundColor = colores.linkBackground;
        });
        document.querySelectorAll(".box").forEach(box => {
            box.style.backgroundColor = colores.boxBackground;
        });
        footer.style.backgroundColor = colores.footerBackground;
        footer.querySelectorAll("p").forEach(p => {
            p.style.color = colores.footerTextColor || colores.texto; // Agregamos la opción de cambiar el color del texto del footer
        });
    }

    // Función que asigna una paleta aleatoria entre las opciones
    function cambiarPaletaAleatoria() {
        const paletas = [
            { // Paleta café
                background: "#f5f5f5",
                texto: "#3e2723",
                navBackground: "#6d4c41",
                linkColor: "white",
                linkBorderColor: "#5d4037",
                linkBackground: "#8d6e63",
                boxBackground: "#ffffff",
                footerBackground: "#6d4c41",
                footerTextColor: "white" // Agregar color de texto para el footer
            },
            { // Paleta morada
                background: "#f3e6f8",
                texto: "#5d2f8e",
                navBackground: "#7a4d9c",
                linkColor: "white",
                linkBorderColor: "#6a3f8e",
                linkBackground: "#9e74b9",
                boxBackground: "white",
                footerBackground: "#7a4d9c",
                footerTextColor: "white"
            },
            { // Paleta azul
                background: "#e0f7fa",
                texto: "#01579b",
                navBackground: "#0288d1",
                linkColor: "white",
                linkBorderColor: "#0277bd",
                linkBackground: "#4fc3f7",
                boxBackground: "white",
                footerBackground: "#0288d1",
                footerTextColor: "white"
            },
            { // Paleta rosa
                background: "#fce4ec",
                texto: "#880e4f",
                navBackground: "#d81b60",
                linkColor: "white",
                linkBorderColor: "#c2185b",
                linkBackground: "#f06292",
                boxBackground: "white",
                footerBackground: "#d81b60",
                footerTextColor: "white"
            },
            { // Paleta gris
                background: "#f5f5f5",
                texto: "#616161",
                navBackground: "#757575",
                linkColor: "white",
                linkBorderColor: "#616161",
                linkBackground: "#9e9e9e",
                boxBackground: "white",
                footerBackground: "#757575",
                footerTextColor: "white"
            }
        ];

        const paletaAleatoria = paletas[Math.floor(Math.random() * paletas.length)];
        cambiarPaleta(paletaAleatoria);
    }

    // ==============================
    // FUNCIONALIDAD DE CAMBIO DE PALETA AL HACER CLIC EN EL LOGO
    // ==============================
    logo.addEventListener("click", cambiarPaletaAleatoria);

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