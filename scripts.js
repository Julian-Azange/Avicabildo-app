/* Input valor */



document.getElementById('enviarBtn').addEventListener('click', function () {
    // Obtener los datos del formulario
    var fecha = document.getElementById('fecha');
    var descripcion = document.getElementById('descripcion');
    var cantidad = document.getElementById('cantidad');
    var valor = document.getElementById('valor');
    var observaciones = document.getElementById('observaciones');

    // Validar que los campos no estén vacíos
    if (!fecha.value || !descripcion.value || !cantidad.value || !valor.value) {
        // Aplicar clases de validación de Bootstrap y mostrar tooltip
        fecha.classList.add('is-invalid');
        descripcion.classList.add('is-invalid');
        cantidad.classList.add('is-invalid');
        valor.classList.add('is-invalid');

        // Mostrar tooltip usando Bootstrap
        $('[data-toggle="tooltip"]').tooltip();

        return;
    }

    // Validar que los campos de cantidad y valor sean numéricos
    if (isNaN(cantidad.value) || isNaN(valor.value)) {
        // Aplicar clases de validación de Bootstrap y mostrar tooltip
        cantidad.classList.add('is-invalid');
        valor.classList.add('is-invalid');

        // Mostrar tooltip usando Bootstrap
        $('[data-toggle="tooltip"]').tooltip();

        return;
    }

    // Obtener los datos almacenados en el caché (si existen)
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];

    // Agregar los nuevos datos a la lista
    var newData = {
        fecha: fecha.value,
        descripcion: descripcion.value,
        cantidad: cantidad.value,
        valor: valor.value,
        observaciones: observaciones.value
    };

    cachedData.push(newData);

    // Guardar la lista actualizada en el caché
    localStorage.setItem(paginaClave, JSON.stringify(cachedData));

    // Renderizar la tabla con los datos del caché
    renderizarTabla();

    // Limpiar el formulario y restablecer clases de validación de Bootstrap
    fecha.value = '';
    descripcion.value = '';
    cantidad.value = '';
    valor.value = '';
    observaciones.value = '';

    // Restablecer clases de validación de Bootstrap
    fecha.classList.remove('is-invalid');
    descripcion.classList.remove('is-invalid');
    cantidad.classList.remove('is-invalid');
    valor.classList.remove('is-invalid');

    // Cerrar el modal
    $('#tablaModal').modal('show');
});

// Agregar eventos de cambio para restablecer clases de validación al modificar los campos
document.getElementById('fecha').addEventListener('input', function () {
    this.classList.remove('is-invalid');
});

document.getElementById('descripcion').addEventListener('input', function () {
    this.classList.remove('is-invalid');
});

document.getElementById('cantidad').addEventListener('input', function () {
    this.classList.remove('is-invalid');
});

document.getElementById('valor').addEventListener('input', function () {
    this.classList.remove('is-invalid');
});




function eliminarFila(button) {
    var rowIndex = button.closest('tr').rowIndex;
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];
    var valorEliminado = parseFloat(cachedData[rowIndex - 1].valor);

    // Eliminar la fila correspondiente en el caché
    cachedData.splice(rowIndex - 1, 1);

    // Guardar la lista actualizada en el caché
    localStorage.setItem(paginaClave, JSON.stringify(cachedData));

    // Renderizar la tabla con los datos del caché
    renderizarTabla();

    // Restar el valor eliminado del total
    restarDelTotal(valorEliminado);

    calcularTotal();
}

function restarDelTotal(valor) {
    var totalElement = document.getElementById('totalValor');
    var total = parseFloat(totalElement.textContent.replace(/\./g, '').replace(/\$/g, '').replace(/,/g, '').replace('Total: ', ''));
    total -= valor;
    totalElement.textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
}

function calcularTotal() {
    var total = 0;
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];

    // Iterar sobre los datos y sumar los valores
    for (var i = 0; i < cachedData.length; i++) {
        total += parseInt(cachedData[i].valor);
    }

    // Actualizar el valor total en el pie de la tabla
    document.getElementById('totalValor').textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
}

function renderizarTabla() {
    var tablaDatos = document.getElementById('tablaDatos');
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];

    // Limpiar la tabla antes de renderizar los datos
    tablaDatos.innerHTML = '';

    // Renderizar las filas con los datos del caché
    for (var i = 0; i < cachedData.length; i++) {
        var newRow = tablaDatos.insertRow(i);

        newRow.insertCell(0).innerHTML = i + 1;
        newRow.insertCell(1).innerHTML = cachedData[i].fecha;
        newRow.insertCell(2).innerHTML = cachedData[i].descripcion;
        newRow.insertCell(3).innerHTML = cachedData[i].cantidad;
        newRow.insertCell(4).innerHTML = cachedData[i].valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        newRow.insertCell(5).innerHTML = cachedData[i].observaciones;
        newRow.insertCell(6).innerHTML = '<button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>';

        // Obtener el botón de eliminar de la fila recién creada
        var botonEliminar = newRow.querySelector('button');

        // Agregar el evento de clic al botón de eliminar
        botonEliminar.addEventListener('click', function () {
            eliminarFila(this);
        });
    }

    // Calcular y mostrar el total
    calcularTotal();
}

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    renderizarTabla();
});


