// TODO: Crear las funciones, objetos y variables indicadas en el enun
"use strict"
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (typeof nuevoPresupuesto === 'number' && !isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0)
    {
            presupuesto = nuevoPresupuesto;
            return presupuesto
    }
    else 
    {
        console.error("El presupuesto debe ser un número no negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (typeof valor === 'number' && !isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    if (fecha && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        res += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        res += `Etiquetas:\n`;
        for (let etiqueta of this.etiquetas) {
            res += `- ${etiqueta}\n`;
        }
        return res;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
    
    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === 'number' && !isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function (nuevaFecha) {
        if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let index = gastos.findIndex(g => g.id === id);
    if (index !== -1) {
        gastos.splice(index, 1);
    }
}
function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
