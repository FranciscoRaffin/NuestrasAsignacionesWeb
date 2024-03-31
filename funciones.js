

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


function mostrarAsignaciones() {
    
    bernal_colab.forEach(empleado => {

        const legajo = empleado[0];
        const nombre = empleado[1];
        fetchAsignacion(legajo)
            .then(asignaciones => {
                mostrarAsignacionEnPagina(legajo, nombre, asignaciones);
            });
        
        
    });
    
}

function mostrarAsignacionEnPagina(legajo, nombre, asignaciones) {
    const contenedor = document.getElementById('asignaciones-container');
    const empleadoDiv = document.createElement('div');
    const legajoTitulo = document.createElement('h2');
    legajoTitulo.textContent = `Legajo: ${legajo} | Nombre: ${nombre}`;
    empleadoDiv.appendChild(legajoTitulo);


        const errorMensaje = document.createElement('p');
        errorMensaje.textContent = asignaciones;
        empleadoDiv.appendChild(errorMensaje);
  
    contenedor.appendChild(empleadoDiv);
}


function generarTablaAsignaciones(asignacionesData) {
    const asignaciones = asignacionesData.asignaciones;
    const tabla = document.createElement('table');
    tabla.classList.add('asignaciones-table');

    // Crear encabezado de la tabla
    const encabezado = tabla.createTHead();
    const filaEncabezado = encabezado.insertRow();
    const encabezadoFecha = document.createElement('th');
    encabezadoFecha.textContent = 'Fecha';
    filaEncabezado.appendChild(encabezadoFecha);
    const encabezadoHoraEntrada = document.createElement('th');
    encabezadoHoraEntrada.textContent = 'Hora de entrada';
    filaEncabezado.appendChild(encabezadoHoraEntrada);
    const encabezadoHoraSalida = document.createElement('th');
    encabezadoHoraSalida.textContent = 'Hora de salida';
    filaEncabezado.appendChild(encabezadoHoraSalida);

    // Crear cuerpo de la tabla
    const cuerpo = tabla.createTBody();
    asignaciones.forEach(asignacion => {
        const fila = cuerpo.insertRow();
        const celdaFecha = fila.insertCell();
        celdaFecha.textContent = asignacion.fecha;
        const celdaHoraEntrada = fila.insertCell();
        celdaHoraEntrada.textContent = asignacion.horaEntrada;
        const celdaHoraSalida = fila.insertCell();
        celdaHoraSalida.textContent = asignacion.horaSalida;
    });

    return tabla;
}



const volverAlInicio = () => window.location.href = "index.html" 
const irASolicitarHorario = () => window.location.href = "pedir_horario.html"