var conteo = 1;
var fotograma = 0;
var imagen = ["🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛"];

function animacion() {
    fotograma++
    if (fotograma == imagen.length){
        fotograma = 0
    }
    return `${imagen[fotograma]}`
    
}

function mensajeDeCarga() {
    if (conteo >= bernal_colab.length) {
        return "👁 Asignaciones cargadas con éxito";
    } else {
        return `${animacion()} Buscando empleados: ${conteo} de ${bernal_colab.length}`;
    }
}

function fetchAsignacion(legajo) {
    return fetch(`https://api.asignaciones.com.ar/start.php?CP=BK&legajo=${legajo}`)
    .then(response => response.text()) // Retorna el contenido como texto
    .then(data => {
        // Actualiza el contenido del elemento en el HTML
        document.getElementById('contenido-fetch').innerText = mensajeDeCarga();
        conteo++;
        return data;
    })
    .catch(error => {
        console.error('Error al obtener el contenido:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const mostrarAsignacionesBtn = document.getElementById('mostrar-asignaciones-btn');
    mostrarAsignacionesBtn.addEventListener('click', mostrarAsignaciones);
});


function fechaEspecial(fecha) {
    if (fecha == "DOMINGO 09/06") {
        return " (Viene gente de otro local no incluida)"
    } else if (["LUNES 24/06","MARTES 25/06","MIERCOLES 26/06"].includes(fecha)) {
        return " 🍔 STACKER DAY 🍔"
    } else return ""

    
}

async function mostrarAsignacionesPorDia() {
    if (conteo <= bernal_colab.length) {
        try {
            const asignacionesPorFecha = {}; // Objeto para almacenar las asignaciones agrupadas por fecha

            for (const empleado of bernal_colab) {
                const legajo = empleado[0];
                const nombre = empleado[1];
                const asignaciones = await fetchAsignacion(legajo); // Esperar a que se resuelva la promesa
                const asignacionesData = JSON.parse(asignaciones);

                if (asignacionesData && asignacionesData.asignaciones && asignacionesData.asignaciones.length > 0) {
                    asignacionesData.asignaciones.forEach(asignacion => {
                        const fecha = asignacion.fecha;
                        if (!asignacionesPorFecha[fecha]) {
                            asignacionesPorFecha[fecha] = [];
                        }
                        asignacionesPorFecha[fecha].push({ nombre, asignacion });
                    });
                }
            }

            const contenedor = document.getElementById('asignaciones-container');
            contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar las tablas

            // Ordenar las fechas
            const fechasOrdenadas = Object.keys(asignacionesPorFecha).sort((a, b) => {
                // Convertir las fechas de texto en objetos de fecha para compararlas
                const fechaA = new Date(a.split(' ')[1]); // Seleccionar solo la parte DD/MM de la cadena
                const fechaB = new Date(b.split(' ')[1]);
                return fechaA - fechaB; // Ordenar en orden cronológico
            });

            // Crear tabla para cada fecha ordenada
            fechasOrdenadas.forEach(fecha => {
                const tabla = document.createElement('table');
                tabla.classList.add('asignaciones-table');

                // Crear un elemento h5 para mostrar la fecha
                const fechaElemento = document.createElement('h5');
                fechaElemento.textContent = fecha + fechaEspecial(fecha);
                contenedor.appendChild(fechaElemento); // Agregar la fecha al contenedor

                const encabezado = tabla.createTHead();
                const filaEncabezado = encabezado.insertRow();
                const encabezados = ['Nombre', 'Hora de entrada', 'Hora de salida'];
                encabezados.forEach(encabezado => {
                    const th = document.createElement('th');
                    th.textContent = encabezado;
                    filaEncabezado.appendChild(th);
                });

                const cuerpo = tabla.createTBody();

                // Ordenar las asignaciones dentro de cada fecha por la hora de entrada
                asignacionesPorFecha[fecha].sort((a, b) => {
                    return a.asignacion.horaEntrada.localeCompare(b.asignacion.horaEntrada);
                });

                asignacionesPorFecha[fecha].forEach(asignacion => {
                    const fila = cuerpo.insertRow();
                    fila.insertCell().textContent = asignacion.nombre; // Mostrar nombre en lugar de legajo
                    fila.insertCell().textContent = asignacion.asignacion.horaEntrada;
                    fila.insertCell().textContent = asignacion.asignacion.horaSalida;
                });

                // Agregar la tabla al contenedor
                contenedor.appendChild(tabla);
            });

        } catch (error) {
            console.error('Error al mostrar las asignaciones:', error);
        }
    } else {
        document.getElementById('contenido-fetch').innerText = "Las asignaciones ya fueron cargadas (para ver en el otro modo recarga la página)"
    }
}
async function mostrarAsignaciones() {
    if (conteo <= bernal_colab.length){
    try {
        for (const empleado of bernal_colab) {
            const legajo = empleado[0];
            const nombre = empleado[1];
            const asignaciones = await fetchAsignacion(legajo); // Esperar a que se resuelva la promesa
            mostrarAsignacionEnPagina(legajo, nombre, asignaciones);
        }
    } catch (error) {
        console.error('Error al mostrar las asignaciones:', error);
    }} else {
        document.getElementById('contenido-fetch').innerText = "↻ Las asignaciones ya fueron cargadas: para ver en el otro modo recarga la página"
    }
}

function mostrarAsignacionEnPagina(legajo, nombre, asignacionesJSON) {
    const contenedor = document.getElementById('asignaciones-container');
    const empleadoDiv = document.createElement('div');
    const legajoTitulo = document.createElement('h4');
    legajoTitulo.textContent = `${nombre} (${legajo})`;
    empleadoDiv.appendChild(legajoTitulo);

    // Convertir la cadena JSON de asignaciones en un objeto JavaScript
    const asignaciones = JSON.parse(asignacionesJSON);

    // Verificar si hay asignaciones disponibles
    if (asignaciones && asignaciones.asignaciones && asignaciones.asignaciones.length > 0) {
        // Crear tabla
        const tabla = document.createElement('table');
        tabla.classList.add('asignaciones-table');

        // Encabezado de la tabla
        const encabezado = tabla.createTHead();
        const filaEncabezado = encabezado.insertRow();
        const encabezados = ['Fecha', 'Hora de entrada', 'Hora de salida'];
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            filaEncabezado.appendChild(th);
        });

        // Cuerpo de la tabla
        const cuerpo = tabla.createTBody();
        asignaciones.asignaciones.forEach(asignacion => {
            const fila = cuerpo.insertRow();
            fila.insertCell().textContent = asignacion.fecha;
            fila.insertCell().textContent = asignacion.horaEntrada;
            fila.insertCell().textContent = asignacion.horaSalida;
            //fila.insertCell().textContent = asignacion.tienda;
        });

        empleadoDiv.appendChild(tabla);
    } else {
        // Si no hay asignaciones disponibles, mostrar un mensaje
        const errorMensaje = document.createElement('p');
        errorMensaje.textContent = 'No hay asignaciones disponibles.';
        empleadoDiv.appendChild(errorMensaje);
    }

    contenedor.appendChild(empleadoDiv);
}

const volverAlInicio = () => window.location.href = "index.html";
const irASolicitarHorario = () => window.location.href = "pedir_horario.html";