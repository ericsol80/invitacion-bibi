document.addEventListener("DOMContentLoaded", function () {

    // ==================================
    // CUENTA REGRESIVA
    // ==================================

    const fechaEvento =
        new Date("2026-08-15T18:00:00-06:00").getTime();

    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");

    function actualizarContador() {

        if (
            !elementoDias ||
            !elementoHoras ||
            !elementoMinutos ||
            !elementoSegundos
        ) {
            return;
        }

        const diferencia = fechaEvento - Date.now();

        if (diferencia <= 0) {
            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";
            return;
        }

        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutos = Math.floor(
            (diferencia % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const segundos = Math.floor(
            (diferencia % (1000 * 60)) / 1000
        );

        elementoDias.textContent =
            String(dias).padStart(2, "0");

        elementoHoras.textContent =
            String(horas).padStart(2, "0");

        elementoMinutos.textContent =
            String(minutos).padStart(2, "0");

        elementoSegundos.textContent =
            String(segundos).padStart(2, "0");
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);


    // ==================================
    // BOTÓN VER DETALLES
    // ==================================

    const botonDetalles =
        document.getElementById("btnDetalles");

    const seccionInformacion =
        document.getElementById("informacion");

    if (botonDetalles && seccionInformacion) {
        botonDetalles.addEventListener("click", function (evento) {
            evento.preventDefault();

            seccionInformacion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    // ==================================
    // BOTÓN GOOGLE MAPS
    // ==================================

    const botonMapa =
        document.getElementById("btnMapa");

    if (botonMapa) {
        botonMapa.addEventListener("click", function (evento) {
            evento.preventDefault();

            const destino =
                "Terraza Arámbula, Santa Anita, Jalisco";

            const urlMapa =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(destino);

            window.open(urlMapa, "_blank");
        });
    }


    // ==================================
    // BOTÓN WHATSAPP
    // ==================================

    const botonWhatsApp =
        document.getElementById("btnWhats");

    if (botonWhatsApp) {
        botonWhatsApp.addEventListener("click", function (evento) {
            evento.preventDefault();

            const telefono = "3318060545";

            const mensaje = encodeURIComponent(
`Hola Bibi 😊

Tengo una duda sobre tu cumpleaños del 15 de agosto.`
            );

            const urlWhatsApp =
                `https://wa.me/${telefono}?text=${mensaje}`;

            window.open(urlWhatsApp, "_blank");
        });
    }


    // ==================================
    // FORMULARIO
    // ==================================

    const formulario =
        document.getElementById("formConfirmacion");

    const botonEnviar =
        document.getElementById("btnEnviar");

    const mensajeFormulario =
        document.getElementById("mensajeFormulario");

    const urlBaseDatos =
        "https://script.google.com/macros/s/AKfycbyAN27BJBFCforNflSDsXWUElu3ocCVVR4VrbVYkLMDP181Iw3gJEq5ay143oivccpW/exec";

    if (formulario && botonEnviar && mensajeFormulario) {

        formulario.addEventListener("submit", async function (evento) {

            evento.preventDefault();

            const nombre =
                document.getElementById("nombre").value.trim();

            const asistentes =
                document.getElementById("asistentes").value;

            const respuesta =
                document.getElementById("respuesta").value;

            if (!nombre || !asistentes || !respuesta) {
                mensajeFormulario.textContent =
                    "Completa todos los campos.";

                mensajeFormulario.className =
                    "mensaje-formulario error";

                return;
            }

            botonEnviar.disabled = true;
            botonEnviar.textContent = "Enviando...";

            mensajeFormulario.textContent =
                "Guardando confirmación...";

            mensajeFormulario.className =
                "mensaje-formulario";

            const datos = new URLSearchParams();

            datos.append("nombre", nombre);
            datos.append("asistentes", asistentes);
            datos.append("respuesta", respuesta);

            try {

                await fetch(urlBaseDatos, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: datos.toString()
                });

                mensajeFormulario.textContent =
                    "✓ Confirmación enviada. Revisa que aparezca en la lista.";

                mensajeFormulario.className =
                    "mensaje-formulario correcto";

                formulario.reset();

            } catch (error) {

                console.error("Error al enviar:", error);

                mensajeFormulario.textContent =
                    "No se pudo enviar. Inténtalo otra vez.";

                mensajeFormulario.className =
                    "mensaje-formulario error";
            }

            botonEnviar.disabled = false;
            botonEnviar.textContent =
                "Confirmar asistencia";
        });
    }

});