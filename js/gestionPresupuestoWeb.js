"use strict";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) {
        return;
    }

    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;

    const divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    const divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;

    const divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
        for (const etiqueta of gasto.etiquetas) {
            const spanEtiqueta = document.createElement("span");
            spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }

    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);

    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) {
        return;
    }

    const divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let nombrePeriodo = periodo;
    if (periodo === "dia") {
        nombrePeriodo = "día";
    } else if (periodo === "anyo") {
        nombrePeriodo = "año";
    } else if (periodo === "mes") {
        nombrePeriodo = "mes";
    }

    const h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divAgrupacion.appendChild(h1);

    for (const [clave, valor] of Object.entries(agrup)) {
        const divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);

        divAgrupacion.appendChild(divDato);
    }

    contenedor.appendChild(divAgrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    const contenedorListado = document.getElementById("listado-gastos-completo");
    if (contenedorListado) {
        contenedorListado.innerHTML = "";
    }

    for (const gasto of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    const presupuestoTexto = prompt("Introduce un nuevo presupuesto:");
    if (presupuestoTexto !== null) {
        const presupuestoValor = Number(presupuestoTexto);
        gestionPresupuesto.actualizarPresupuesto(presupuestoValor);
        repintar();
    }
}

const botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
if (botonActualizarPresupuesto) {
    botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
}

function nuevoGastoWeb() {
    const descripcion = prompt("Introduce la descripción del gasto:");
    const valorTexto = prompt("Introduce el valor del gasto:");
    const fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    const etiquetasTexto = prompt("Introduce las etiquetas separadas por comas:");

    const valor = Number(valorTexto);
    const etiquetas = etiquetasTexto ? etiquetasTexto.split(",") : [];

    const gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

const botonAnyadirGasto = document.getElementById("anyadirgasto");
if (botonAnyadirGasto) {
    botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
}

function EditarHandle() {
    this.handleEvent = function (evento) {
        const fechaDefecto = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        const etiquetasDefecto = this.gasto.etiquetas.join(",");

        const descripcion = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        const valorTexto = prompt("Introduce el valor del gasto:", this.gasto.valor);
        const fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):", fechaDefecto);
        const etiquetasTexto = prompt("Introduce las etiquetas separadas por comas:", etiquetasDefecto);

        const valor = Number(valorTexto);
        const etiquetas = etiquetasTexto ? etiquetasTexto.split(",") : [];

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
};