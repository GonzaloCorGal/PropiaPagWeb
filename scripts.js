document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    // Desplazamiento suave con offset
    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 70; // Ajusta este valor según la altura de tu navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Cerrar el navbar en dispositivos móviles
                if (navbarCollapse.classList.contains("show")) {
                    navbarToggler.click();
                }
            } else {
                console.warn(`Elemento con id "${targetId}" no encontrado.`);
            }
        });
    });

    // Resaltar enlace activo al hacer scroll
    window.addEventListener("scroll", highlightNavLink);
    highlightNavLink(); // Resaltar enlace al cargar la página
});

function highlightNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Ajusta el offset
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
            link.classList.add("active");
        }
    });
}

function copiarCorreo() {
    const correo = document.getElementById("email").innerText;
    navigator.clipboard.writeText(correo).then(() => {
        alert("Correo copiado al portapapeles: " + correo);
    }).catch(err => {
        console.error("Error al copiar: ", err);
    });
}

function enviarCorreo() {
    const correo = "gonzalocortes43@gmail.com"; // Cambia por tu email real

    // Abrir directamente en Gmail en una nueva pestaña
    window.open(`https://mail.google.com/mail/?view=cm&to=${correo}`, "_blank");
}

// Función para cambiar el idioma
document.getElementById("language-toggle").addEventListener("click", function() {
    const currentLang = document.documentElement.lang;
    if (currentLang === "es") {
        cambiarAIngles();
    } else {
        cambiarAEspañol();
    }
});

function cambiarAIngles() {
    document.documentElement.lang = "en";
    document.getElementById("language-toggle").innerText = "Español";

    // Cambiar textos a inglés utilizando los atributos data-en
    actualizarTexto("en");
}

function cambiarAEspañol() {
    document.documentElement.lang = "es";
    document.getElementById("language-toggle").innerText = "English";

    // Cambiar textos a español utilizando los atributos data-es
    actualizarTexto("es");
}

function actualizarTexto(idioma) {
    // Obtener todos los elementos que tienen los atributos data-*
    const elementos = document.querySelectorAll('[data-es], [data-en]');
    
    // Recorrer los elementos y actualizar el texto según el idioma
    elementos.forEach(function(elemento) {
        // Actualizar el contenido basado en el atributo del idioma
        elemento.innerText = elemento.getAttribute(`data-${idioma}`);
    });
}