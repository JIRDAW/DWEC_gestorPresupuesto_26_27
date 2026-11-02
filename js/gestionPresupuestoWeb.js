"use strict";

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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};
