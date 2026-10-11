/* JavaScript de Turnify Salud: agrega interacciones a las páginas HTML. */
// ORDEN DEL ARCHIVO: BÚSQUEDA, CARRUSELES, FAVORITOS Y VALIDACIÓN DE FORMULARIOS.

// Prepara una cadena para comparar texto sin distinguir mayúsculas ni tildes.
function normalizar(texto) {
    return texto
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Conecta los formularios de búsqueda con las tarjetas de centros de la página actual.
document.querySelectorAll("[data-filter-form]").forEach((formulario) => {
    const campoUbicacion = formulario.querySelector("[data-filter-location]")
        || formulario.querySelector("#ubicacion");
    const campoEspecialidad = formulario.querySelector("[data-filter-specialty]")
        || formulario.querySelector("#especialidad");
    const tarjetas = [...document.querySelectorAll("[data-center-card]")];
    const estado = document.querySelector("[data-search-status]");
    const mensajeVacio = document.querySelector("[data-empty-results]");

    // Aplica ambos filtros y oculta las tarjetas que no coinciden con la búsqueda.
    function filtrarCentros() {
        const ubicacion = normalizar(campoUbicacion?.value || "");
        const especialidad = normalizar(campoEspecialidad?.value || "");
        let cantidadVisible = 0;

        tarjetas.forEach((tarjeta) => {
            const textoUbicacion = normalizar(`${tarjeta.dataset.name} ${tarjeta.dataset.location}`);
            const textoEspecialidad = normalizar(tarjeta.dataset.specialties || "");
            const coincideUbicacion = !ubicacion || textoUbicacion.includes(ubicacion);
            const coincideEspecialidad = !especialidad || textoEspecialidad.includes(especialidad);
            const coincide = coincideUbicacion && coincideEspecialidad;

            tarjeta.hidden = !coincide;
            if (coincide) cantidadVisible += 1;
        });

        // Comunica el resultado a lectores de pantalla y muestra una ayuda si no hay coincidencias.
        if (estado) {
            estado.textContent = cantidadVisible === tarjetas.length
                ? `Mostrando ${cantidadVisible} centros.
                : `Encontramos ${cantidadVisible} ${cantidadVisible === 1 ? "centro" : "centros"}.`;
        }
        if (mensajeVacio) mensajeVacio.hidden = cantidadVisible > 0;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        filtrarCentros();
        document.querySelector("[data-centers-list]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // En la página de centros, actualizar un campo vuelve a filtrar sin enviar el formulario.
    campoUbicacion?.addEventListener("input", filtrarCentros);
    campoEspecialidad?.addEventListener("change", filtrarCentros);
});

// Los accesos populares completan el filtro de especialidad y ejecutan la búsqueda.
document.querySelectorAll("[data-filter-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
        const selector = document.querySelector("#especialidad");
        const formulario = chip.closest("section")?.querySelector("[data-filter-form]");
        if (!selector || !formulario) return;
        selector.value = chip.dataset.filterChip;
        formulario.requestSubmit();
    });
});

// Los dos carruseles de Inicio avanzan con flechas y también admiten el gesto táctil.
function prepararCarrusel(selectorCarrusel, selectorTarjeta, selectorAnterior, selectorSiguiente) {
    const carrusel = document.querySelector(selectorCarrusel);
    if (!carrusel) return;

    function moverCarrusel(direccion) {
        const primeraTarjeta = carrusel.querySelector(selectorTarjeta);
        if (!primeraTarjeta) return;

        const estilos = getComputedStyle(carrusel);
        const espacio = Number.parseFloat(estilos.columnGap || estilos.gap) || 0;
        carrusel.scrollBy({
            left: direccion * (primeraTarjeta.getBoundingClientRect().width + espacio),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        });
    }

    document.querySelector(selectorAnterior)?.addEventListener("click", () => moverCarrusel(-1));
    document.querySelector(selectorSiguiente)?.addEventListener("click", () => moverCarrusel(1));
}

prepararCarrusel("[data-quick-carousel]", "[data-quick-item]", "[data-quick-prev]", "[data-quick-next]");
prepararCarrusel("[data-centers-carousel]", "[data-center-card]:not([hidden])", "[data-carousel-prev]", "[data-carousel-next]");

// Guarda los centros favoritos en este navegador para conservarlos al recargar.
const claveFavoritos = "turnify-centros-favoritos";
function leerFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(claveFavoritos) || "[]");
    } catch {
        return [];
    }
}

function actualizarBotonFavorito(boton, estaGuardado) {
    boton.setAttribute("aria-pressed", String(estaGuardado));
    boton.textContent = estaGuardado ? "♥" : "♡";
}

const favoritos = new Set(leerFavoritos());
document.querySelectorAll("[data-favorite]").forEach((boton) => {
    const tarjeta = boton.closest("[data-center-card]");
    const nombreCentro = tarjeta?.dataset.name;
    if (!nombreCentro) return;

    actualizarBotonFavorito(boton, favoritos.has(nombreCentro));
    boton.addEventListener("click", () => {
        if (favoritos.has(nombreCentro)) favoritos.delete(nombreCentro);
        else favoritos.add(nombreCentro);

        actualizarBotonFavorito(boton, favoritos.has(nombreCentro));
        try {
            localStorage.setItem(claveFavoritos, JSON.stringify([...favoritos]));
        } catch {
            // La página sigue funcionando aunque el navegador no permita guardar preferencias.
        }
    });
});

// Muestra una confirmación ilustrativa; no envía datos porque el sitio no tiene servidor.
document.querySelectorAll("[data-contact-form]").forEach((formulario) => {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = new FormData(formulario).get("nombre");
        const mensaje = formulario.querySelector("[data-form-feedback]");
        mensaje.textContent = `¡Gracias, ${nombre}! La consulta quedó lista como demostración.`;
        mensaje.className = "form-feedback mt-3 mb-0 text-success fw-semibold";
        formulario.reset();
    });
});

// Completa el centro indicado en el enlace y confirma la solicitud de turno de muestra.
const formularioTurno = document.querySelector("[data-booking-form]");
if (formularioTurno) {
    const selectorCentro = formularioTurno.querySelector("#centro");
    const centroDesdeEnlace = new URLSearchParams(window.location.search).get("centro");
    if (centroDesdeEnlace && selectorCentro) selectorCentro.value = centroDesdeEnlace;

    // Impide elegir una fecha anterior al día de hoy.
    const campoFecha = formularioTurno.querySelector("#fecha");
    if (campoFecha) {
        const hoy = new Date();
        const fechaLocal = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60_000)
            .toISOString()
            .slice(0, 10);
        campoFecha.min = fechaLocal;
    }

    formularioTurno.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombreCentro = selectorCentro.selectedOptions[0].textContent;
        const mensaje = formularioTurno.querySelector("[data-form-feedback]");
        mensaje.textContent = `Solicitud de demostración preparada para ${nombreCentro}. No se envió a un centro real.`;
        mensaje.className = "form-feedback mt-3 mb-0 text-success fw-semibold";
        formularioTurno.reset();
        if (centroDesdeEnlace) selectorCentro.value = centroDesdeEnlace;
    });
}

// Valida los formularios de ingreso y registro sin guardar ni enviar credenciales.
document.querySelectorAll("[data-auth-form]").forEach((formulario) => {
    const tipo = formulario.dataset.authForm;
    const campoContrasena = formulario.querySelector('[name="password"]');
    const confirmarContrasena = formulario.querySelector('[name="confirm-password"]');
    const mensaje = formulario.querySelector("[data-auth-feedback]");

    if (confirmarContrasena) {
        const validarConfirmacion = () => {
            confirmarContrasena.setCustomValidity(
                confirmarContrasena.value && campoContrasena.value !== confirmarContrasena.value
                    ? "Las contraseñas no coinciden."
                    : ""
            );
        };
        confirmarContrasena.addEventListener("input", validarConfirmacion);
        campoContrasena.addEventListener("input", validarConfirmacion);
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (tipo === "register" && campoContrasena.value !== confirmarContrasena.value) {
            confirmarContrasena.setCustomValidity("Las contraseñas no coinciden.");
            confirmarContrasena.reportValidity();
            return;
        }

        mensaje.textContent = tipo === "register"
            ? "Formulario validado para la demostración. No se creó ni guardó una cuenta."
            : "Formulario validado para la demostración. La autenticación requiere un servidor.";
        mensaje.className = "form-feedback auth-feedback text-success fw-semibold";
    });
});

// Los iconos sociales quedan visibles hasta que se definan las cuentas oficiales.
document.querySelectorAll("[data-social-placeholder]").forEach((enlace) => {
    enlace.addEventListener("click", (evento) => evento.preventDefault());
});
