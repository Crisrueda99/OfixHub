document.addEventListener("DOMContentLoaded", async function () {
    // ==============================
    // VARIABLES Y ELEMENTOS DEL DOM
    // ==============================
    const toggleNav = document.getElementById("toggleNav");
    const barnav = document.getElementById("barnav");
    const navLinks = barnav.querySelectorAll("a");
    const contenido = document.getElementById("contenido");
    const logo = document.querySelector(".logo");
    const footer = document.querySelector("footer");

    // ==============================
    // CARGA DE PALETAS DESDE JSON
    // ==============================
    let paletas = [];
    try {
        const response = await fetch('config/paletas.json');
        paletas = await response.json();
    } catch (error) {
        console.error('Error al cargar paletas:', error);
        // Paleta por defecto en caso de error
        paletas = [
            {
                "nombre": "Café",
                "background": "#f5f5f5",
                "texto": "#3e2723",
                "navBackground": "#6d4c41",
                "linkColor": "white",
                "linkBorderColor": "#5d4037",
                "linkBackground": "#8d6e63",
                "boxBackground": "#ffffff",
                "footerBackground": "#6d4c41",
                "footerTextColor": "white"
            }
        ];
    }

    // ==============================
    // CARGAR TEMA GUARDADO
    // ==============================
    const savedThemeIndex = localStorage.getItem('selectedTheme');
    if (savedThemeIndex !== null && paletas[savedThemeIndex]) {
        cambiarPaleta(paletas[savedThemeIndex]);
    }

    // ==============================
    // FUNCIONES PRINCIPALES
    // ==============================
    function toggleMenu() {
        barnav.classList.toggle("visible");
    }

    function cerrarMenuMovil() {
        if (window.innerWidth <= 768) {
            barnav.classList.remove("visible");
        }
    }

    function ajustarNav() {
        barnav.classList.toggle("visible", window.innerWidth > 768);
    }

    function marcarEnlaceActivo(pagina) {
        navLinks.forEach(link => link.classList.remove("activo"));
        const enlaceActivo = [...navLinks].find(link => link.getAttribute("href") === pagina);
        if (enlaceActivo) enlaceActivo.classList.add("activo");
    }

    window.cargarContenido = function (pagina) {
        fetch(pagina)
            .then(response => response.text())
            .then(data => {
                contenido.innerHTML = data;
                window.scrollTo(0, 0);
                marcarEnlaceActivo(pagina);
            })
            .catch(error => console.error("Error al cargar contenido:", error));
    };

    // ==============================
    // FUNCIONES DE CAMBIO DE TEMA
    // ==============================
    function cambiarPaleta(colores) {
        document.body.style.backgroundColor = colores.background;
        document.body.style.color = colores.texto;
        barnav.style.backgroundColor = colores.navBackground;
        
        navLinks.forEach(link => {
            link.style.color = colores.linkColor;
            link.style.borderColor = colores.linkBorderColor;
            link.style.backgroundColor = colores.linkBackground;
        });

        document.querySelectorAll(".box").forEach(box => {
            box.style.backgroundColor = colores.boxBackground;
        });

        footer.style.backgroundColor = colores.footerBackground;
        footer.querySelectorAll("p").forEach(p => {
            p.style.color = colores.footerTextColor || colores.texto;
        });
    }

    function cambiarPaletaAleatoria() {
        const randomIndex = Math.floor(Math.random() * paletas.length);
        const selectedPalette = paletas[randomIndex];
        cambiarPaleta(selectedPalette);
        localStorage.setItem('selectedTheme', randomIndex);
    }

    // ==============================
    // EVENT LISTENERS
    // ==============================
    toggleNav.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", cerrarMenuMovil));
    window.addEventListener("resize", ajustarNav);
    logo.addEventListener("click", cambiarPaletaAleatoria);
    cargarContenido("pages/inicio.html");
    ajustarNav();
});

// ==============================
// FORMULARIO DE CONTACTO
// ==============================
function enviarFormulario() {
    const form = document.getElementById('form-google');
    const popup = document.getElementById('popup');
    const okButton = document.getElementById('popup-ok');

    form.submit();
    popup.style.display = 'flex';

    okButton.onclick = () => {
        popup.style.display = 'none';
        form.reset();
    };
}