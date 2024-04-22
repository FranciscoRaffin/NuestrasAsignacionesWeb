var conteo = 1;
var fotograma = 0;
function animacion() {
         if (fotograma==0){fotograma++
             return " ◰."}
    else if (fotograma==1) {fotograma++
        return " ◳.."}
    else if (fotograma==2) {fotograma++
        return " ◲..."}
    else {fotograma = 0
        return " ◱...."}
    
}

function mensajeDeCarga() {
    if (conteo >= bernal_colab.length) {
        return "Asignaciones cargadas correctamente!";
    } else {
        return `Buscando empleado ${conteo} de ${bernal_colab.length}${animacion()}`;
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

async function mostrarAsignacionesPorDia() {
    if (conteo <= bernal_colab.length){
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

            const tabla = document.createElement('table');
            tabla.classList.add('asignaciones-table');

            const encabezado = tabla.createTHead();
            const filaEncabezado = encabezado.insertRow();
            const encabezados = ['Fecha', 'Nombre', 'Hora de entrada', 'Hora de salida'];
            encabezados.forEach(encabezado => {
                const th = document.createElement('th');
                th.textContent = encabezado;
                filaEncabezado.appendChild(th);
            });

            const cuerpo = tabla.createTBody();

            // Ordenar las fechas
            const fechasOrdenadas = Object.keys(asignacionesPorFecha).sort();

            // Iterar sobre las fechas ordenadas y crear las filas de la tabla
            fechasOrdenadas.forEach((fecha, index) => {
                // Insertar fila vacía de color negro entre los días, excepto después del último día
                if (index > 0) {
                    const filaEspaciadora = cuerpo.insertRow();
                    filaEspaciadora.classList.add('espacio-entre-dias');
                    const celdaEspaciadora = filaEspaciadora.insertCell();
                    celdaEspaciadora.colSpan = encabezados.length;
                }

                // Ordenar las asignaciones dentro de cada fecha por la hora de entrada
                asignacionesPorFecha[fecha].sort((a, b) => {
                    return a.asignacion.horaEntrada.localeCompare(b.asignacion.horaEntrada);
                });

                asignacionesPorFecha[fecha].forEach(asignacion => {
                    const fila = cuerpo.insertRow();
                    fila.insertCell().textContent = fecha;
                    fila.insertCell().textContent = asignacion.nombre; // Mostrar nombre en lugar de legajo
                    fila.insertCell().textContent = asignacion.asignacion.horaEntrada;
                    fila.insertCell().textContent = asignacion.asignacion.horaSalida;
                });
            });

            const contenedor = document.getElementById('asignaciones-container');
            contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar la tabla
            contenedor.appendChild(tabla);
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
        document.getElementById('contenido-fetch').innerText = "Las asignaciones ya fueron cargadas (para ver en el otro modo recarga la página)"
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
