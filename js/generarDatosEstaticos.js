"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId(
    "presupuesto",
    gestionPresupuesto.mostrarPresupuesto()
);

const gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId(
    "gastos-totales",
    gestionPresupuesto.calcularTotalGastos()
);

gestionPresupuestoWeb.mostrarDatoEnId(
    "balance-total",
    gestionPresupuesto.calcularBalance()
);

const gastosCompletos = gestionPresupuesto.listarGastos();
for (const gasto of gastosCompletos) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

const filtrado1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"});
for (const gasto of filtrado1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

const filtrado2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (const gasto of filtrado2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

const filtrado3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (const gasto of filtrado3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

const filtrado4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (const gasto of filtrado4) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

const agrupDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "dia");

const agrupMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

const agrupAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "anyo");
