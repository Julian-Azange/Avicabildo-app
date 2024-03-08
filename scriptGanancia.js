// Variable para la clave única de la página
var paginaClave = 'claveLocalGanancias';


function calcularTotalTabla(clave) {
    var total = 0;
    var cachedData = JSON.parse(localStorage.getItem(clave)) || [];

    for (var i = 0; i < cachedData.length; i++) {
        total += parseFloat(cachedData[i].valor);
    }

    return total;
}

function calcularGanancia() {
    var totalCompras = calcularTotalTabla('claveLocalCompras');
    var totalVentas = calcularTotalTabla('claveLocalVentas');
    var totalPerdidas = calcularTotalTabla('claveLocalPerdidas');
    var ganancia = totalVentas - (totalCompras + totalPerdidas);
    return ganancia;
}

function obtenerTotalCompra() {
    var totalCompra = 0;
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];

    // Sumar los valores de compra
    for (var i = 0; i < cachedData.length; i++) {
        if (cachedData[i].tipo === 'compra') {
            totalCompra += parseFloat(cachedData[i].valor);
        }
    }

    return totalCompra;
}

function obtenerTotalPerdida() {
    var totalPerdida = 0;
    var cachedData = JSON.parse(localStorage.getItem(paginaClave)) || [];

    // Sumar los valores de pérdida
    for (var i = 0; i < cachedData.length; i++) {
        if (cachedData[i].tipo === 'perdida') {
            totalPerdida += parseFloat(cachedData[i].valor);
        }
    }

    return totalPerdida;
}


function renderizarTablaGanancias() {
    var tablaGanancias = document.getElementById('tablaGanancias');
    var ganancia = calcularGanancia();

    // Limpiar la tabla antes de renderizar los datos
    tablaGanancias.innerHTML = '';

    // Agregar fila con el valor de ganancia
    var newRow = tablaGanancias.insertRow();
    newRow.insertCell(0).innerHTML = 1; // Número de ítem
    newRow.insertCell(1).innerHTML = new Date().toLocaleDateString(); // Fecha
    newRow.insertCell(2).innerHTML = ganancia.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Valor de ganancia
}

// Renderizar la tabla de ganancias al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    renderizarTablaGanancias();
});


