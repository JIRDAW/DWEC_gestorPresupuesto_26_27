// TODO: Crear las funciones, objetos y variables indicadas en el enun
"use strict"
// TODO: Variable global
let presupuesto = 0;

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

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    if (typeof valor === 'number' && !isNaN(valor) && valor >= 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
    
    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === 'number' && !isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
