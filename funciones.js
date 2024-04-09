

function fetchAsignacion(legajo) {

    return fetch(`https://api.asignaciones.com.ar/start.php?CP=BK&legajo=${legajo}`)
    .then(response => response.text()) // Retorna el contenido como texto
    .then(data => {
      // Actualiza el contenido del elemento en el HTML
      document.getElementById('contenido-fetch').innerText = `fetching ${legajo}...`
      //const tablaAsignaciones = generarTablaAsignaciones(data.toString)
      //document.body.appendChild(tablaAsignaciones);
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


async function mostrarAsignaciones() {
    try {
        for (const empleado of bernal_colab) {
            const legajo = empleado[0];
            const nombre = empleado[1];
            const asignaciones = await fetchAsignacion(legajo); // Esperar a que se resuelva la promesa
            mostrarAsignacionEnPagina(legajo, nombre, asignaciones);
        }
    } catch (error) {
        console.error('Error al mostrar las asignaciones:', error);
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






const volverAlInicio = () => window.location.href = "index.html" 
const irASolicitarHorario = () => window.location.href = "pedir_horario.html"