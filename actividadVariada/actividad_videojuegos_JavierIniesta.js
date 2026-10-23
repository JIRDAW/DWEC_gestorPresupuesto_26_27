"use strict";

/*
ACTIVIDAD · REGISTRO DE PARTIDAS · SESIÓN DE 90 MINUTOS

Javier Iniesta Riera  DAW M

Para ejecutar:
node actividad_c_videojuegos_90min.js

Completa los TODO 1, 2A, 2B, 3, 4A, 4B, 5, 6A y 6B.
Sustituye cada throw de PENDIENTE por el código solicitado.

Los datos, el conversor de fechas, el comprobador y la demostración
final ya están preparados. No modifiques las pruebas.

En tus soluciones, utiliza filter y reduce donde se pide.
No los sustituyas por bucles for, while o forEach.

Todos los juegos son inventados. Las fechas del ejercicio usan UTC.
*/

const partidas = [
  {
    id: 1,
    juego: "Órbita Azul",
    genero: "aventura",
    minutos: 45,
    puntos: 1200,
    fecha: "2026-10-01",
    etiquetas: ["solo"]
  },
  {
    id: 2,
    juego: "Ciudad Pixel",
    genero: "plataformas",
    minutos: 30,
    puntos: 800,
    fecha: "2026-10-03",
    etiquetas: ["cooperativo"]
  },
  {
    id: 3,
    juego: "Rally Solar",
    genero: "carreras",
    minutos: 20,
    puntos: 600,
    fecha: "2026-10-05",
    etiquetas: ["online"]
  },
  {
    id: 4,
    juego: "Órbita Azul",
    genero: "aventura",
    minutos: 60,
    puntos: 1800,
    fecha: "2026-10-08",
    etiquetas: ["solo", "reto"]
  },
  {
    id: 5,
    juego: "Bosque Run",
    genero: "plataformas",
    minutos: 25,
    puntos: 950,
    fecha: "2026-10-12",
    etiquetas: ["cooperativo"]
  },
  {
    id: 6,
    juego: "Laboratorio X",
    genero: "puzles",
    minutos: 40,
    puntos: 1500,
    fecha: "2026-10-15",
    etiquetas: []
  },
  {
    id: 7,
    juego: "Rally Solar",
    genero: "carreras",
    minutos: 35,
    puntos: 1100,
    fecha: "2026-10-18",
    etiquetas: ["online", "reto"]
  }
];

// BLOQUE 1 · TIPOS Y FUNCIÓN FLECHA · 8 MINUTOS

// Predicciones:
// typeof 1200 -> "number"
// typeof "1200" -> "string"
// typeof true -> "boolean"
// typeof undefined -> "undefined"
// typeof null -> "object"
// typeof [] -> "object"
// typeof (() => {}) -> "function"
// Array.isArray(partidas) -> true
//
// Explicación de null:
// typeof null devuelve "object" por una particularidad histórica en la implementación original de JavaScript.
// Para detectar null se debe comprobar con igualdad estricta: valor === null.

console.log(
  "Tipos:",
  typeof 1200,
  typeof "1200",
  typeof true,
  typeof undefined,
  typeof null,
  typeof [],
  typeof (() => {})
);

console.log("¿Es un array?", Array.isArray(partidas));

const esNumeroValido = numero => {
  return typeof numero === "number" && Number.isFinite(numero) && numero >= 0;
};

// BLOQUE 2 · CONSTRUCTOR, MÉTODO, DEFAULTS Y REST · 15 MINUTOS

function Partida(juego, minutos, puntos = 0, ...etiquetas) {
  this.juego = juego; // Esta propiedad ya está resuelta.

  this.minutos = minutos;
  this.puntos = puntos;
  this.etiquetas = etiquetas;

  this.sumarPuntos = function(extra = 100) {
    // La validación ya está resuelta.
    if (!esNumeroValido(extra)) return false;

    this.puntos += extra;
    return true;
  };
}

// BLOQUE 3 · COPIAS · 10 MINUTOS

function prepararCopias(partida, lista) {
  const copiaSpread = { ...partida, genero: "exploracion" };
  const copiaAssign = Object.assign({}, partida, { genero: "exploracion" });
  const copiaArray = [...lista];

  // Este retorno ya está preparado.
  return { copiaSpread, copiaAssign, copiaArray };
}

// BLOQUE 4 · FECHAS · 10 MINUTOS

// Conversor proporcionado. No tienes que implementarlo.
function aTimestamp(valor) {
  if (
    !(
      typeof valor === "string" ||
      typeof valor === "number" ||
      valor instanceof Date
    )
  ) {
    return null;
  }

  const t = new Date(valor).getTime();

  return Number.isFinite(t) ? t : null;
}

function describirFecha(fechaISO) {
  const fecha = new Date(fechaISO);

  if (!Number.isFinite(fecha.getTime())) return null;

  return {
    timestamp: fecha.getTime(),
    anio: fecha.getUTCFullYear(),
    mes: fecha.getUTCMonth() + 1,
    dia: fecha.getUTCDate()
  };
}

function diasEntre(inicio, fin) {
  const a = aTimestamp(inicio);
  const b = aTimestamp(fin);

  if (a === null || b === null) return null;

  return (b - a) / 86400000;
}

// BLOQUE 5 · FILTER Y PARÁMETRO OPCIONAL · 15 MINUTOS

function filtrarPartidas(lista, genero, minimo = 0) {
  return lista.filter(partida => {
    return (
      partida.minutos >= minimo &&
      (genero === undefined || partida.genero === genero)
    );
  });
}

// BLOQUE 6 · REDUCE · 17 MINUTOS

function totalPuntos(lista) {
  return lista.reduce((total, partida) => {
    return total + partida.puntos;
  }, 0);
}

function puntosPorJuego(lista) {
  return lista.reduce((acumulador, partida) => {
    if (acumulador[partida.juego] === undefined) {
      acumulador[partida.juego] = 0;
    }

    acumulador[partida.juego] += partida.puntos;

    // Conserva este retorno.
    return acumulador;
  }, {});
}

// COMPROBADOR PROPORCIONADO · NO MODIFICAR

(() => {
  let ok = 0;
  let pendientes = 0;
  let fallos = 0;

  const fresco = () => JSON.parse(JSON.stringify(partidas));

  const ids = lista => lista.map(partida => partida.id);

  const exigir = (condicion, mensaje) => {
    if (!condicion) {
      throw new Error(mensaje);
    }
  };

  const igual = (real, esperado) => {
    if (typeof esperado === "number") {
      exigir(
        typeof real === "number" &&
        Math.abs(real - esperado) < 1e-8,
        "esperado " + esperado + ", recibido " + String(real)
      );
    } else if (esperado !== null && typeof esperado === "object") {
      exigir(
        real !== null && typeof real === "object",
        "se esperaba objeto/array"
      );

      exigir(
        Array.isArray(real) === Array.isArray(esperado),
        "objeto/array incorrecto"
      );

      igual(
        Object.keys(real).sort().join("|"),
        Object.keys(esperado).sort().join("|")
      );

      Object.keys(esperado).forEach(clave => {
        igual(real[clave], esperado[clave]);
      });
    } else {
      exigir(
        real === esperado,
        "esperado " + String(esperado) +
        ", recibido " + String(real)
      );
    }
  };

  const prueba = (nombre, ejecutar) => {
    try {
      ejecutar();
      ok++;
      console.log("OK        " + nombre);
    } catch (error) {
      const mensaje = error && error.message
        ? error.message
        : String(error);

      if (mensaje.startsWith("PENDIENTE")) {
        pendientes++;
        console.log("PENDIENTE " + nombre);
      } else {
        fallos++;
        console.log("FALLO     " + nombre + " -> " + mensaje);
      }
    }
  };

  // Comprobaciones del bloque 1.

  prueba("1 números válidos", () => {
    igual(esNumeroValido(0), true);
    igual(esNumeroValido(1200), true);
  });

  ["1200", -1, NaN, Infinity, null, undefined, false]
    .forEach((valor, indice) => {
      prueba("1 rechazar dato " + indice, () => {
        igual(esNumeroValido(valor), false);
      });
    });

  // Comprobaciones del bloque 2.

  prueba("2A propiedades y valor por defecto", () => {
    const p = new Partida("Galaxia", 15);

    exigir(p instanceof Partida, "usa constructor y new");

    igual(p.juego, "Galaxia");
    igual(p.minutos, 15);
    igual(p.puntos, 0);
    igual(p.etiquetas, []);
  });

  prueba("2A rest y undefined", () => {
    const p = new Partida(
      "Galaxia",
      15,
      undefined,
      "solo",
      "reto"
    );

    igual(p.puntos, 0);
    igual(p.etiquetas, ["solo", "reto"]);
  });

  prueba("2A null no activa el valor por defecto", () => {
    igual(new Partida("Galaxia", 15, null).puntos, null);
  });

  prueba("2B método y argumento por defecto", () => {
    const p = new Partida("Galaxia", 15, 300);

    igual(p.sumarPuntos(), true);
    igual(p.puntos, 400);

    igual(p.sumarPuntos(50), true);
    igual(p.puntos, 450);

    igual(p.sumarPuntos("50"), false);
    igual(p.puntos, 450);
  });

  prueba("2 instancias independientes", () => {
    const a = new Partida("A", 10);
    const b = new Partida("B", 20);

    a.etiquetas.push("reto");
    a.sumarPuntos();

    igual(b.etiquetas, []);
    igual(b.puntos, 0);
  });

  // Comprobaciones del bloque 3.

  prueba("3 spread y Object.assign", () => {
    const lista = fresco();
    const original = lista[0];
    const antes = JSON.stringify(lista);

    const r = prepararCopias(original, lista);

    exigir(
      r.copiaSpread !== original &&
      r.copiaAssign !== original,
      "objetos nuevos"
    );

    igual(r.copiaSpread, {
      ...original,
      genero: "exploracion"
    });

    igual(r.copiaAssign, r.copiaSpread);
    igual(JSON.stringify(lista), antes);
  });

  prueba("3 array nuevo y copias superficiales", () => {
    const lista = fresco();
    const r = prepararCopias(lista[0], lista);

    exigir(r.copiaArray !== lista, "array nuevo");
    igual(r.copiaArray, lista);

    exigir(
      r.copiaArray[0] === lista[0],
      "las partidas se comparten"
    );

    exigir(
      r.copiaSpread.etiquetas === lista[0].etiquetas,
      "spread es superficial"
    );

    exigir(
      r.copiaAssign.etiquetas === lista[0].etiquetas,
      "assign es superficial"
    );
  });

  // Comprobaciones del bloque 4.

  prueba("4A fecha y getters UTC", () => {
    igual(describirFecha("2026-10-18"), {
      timestamp: 1792281600000,
      anio: 2026,
      mes: 10,
      dia: 18
    });
  });

  prueba("4A fecha inválida", () => {
    igual(describirFecha("mal"), null);
  });

  prueba("4B 17 días y orden inverso", () => {
    igual(
      diasEntre("2026-10-01", "2026-10-18"),
      17
    );

    igual(
      diasEntre("2026-10-18", "2026-10-01"),
      -17
    );
  });

  prueba("4B fecha inválida", () => {
    igual(diasEntre("mal", "2026-10-18"), null);
  });

  // Comprobaciones del bloque 5.

  prueba("5 filtrar por género", () => {
    igual(
      ids(filtrarPartidas(fresco(), "carreras")),
      [3, 7]
    );
  });

  prueba("5 género y mínimo incluidos", () => {
    igual(
      ids(filtrarPartidas(fresco(), "carreras", 35)),
      [7]
    );
  });

  prueba("5 omitir género y exigir duración", () => {
    igual(
      ids(filtrarPartidas(fresco(), undefined, 40)),
      [1, 4, 6]
    );
  });

  prueba("5 todos en un array nuevo", () => {
    const lista = fresco();
    const resultado = filtrarPartidas(lista);

    exigir(resultado !== lista, "array nuevo");
    igual(resultado, lista);
  });

  prueba("5 null y lista vacía", () => {
    igual(filtrarPartidas(fresco(), null), []);
    igual(filtrarPartidas([]), []);
  });

  prueba("5 no cambiar los datos", () => {
    const lista = fresco();
    const antes = JSON.stringify(lista);

    filtrarPartidas(lista, "aventura");

    igual(JSON.stringify(lista), antes);
  });

  // Comprobaciones del bloque 6.

  prueba("6A suma total", () => {
    igual(totalPuntos(fresco()), 7950);
  });

  prueba("6A array vacío", () => {
    igual(totalPuntos([]), 0);
  });

  prueba("6B puntos por juego", () => {
    igual(puntosPorJuego(fresco()), {
      "Órbita Azul": 3000,
      "Ciudad Pixel": 800,
      "Rally Solar": 1700,
      "Bosque Run": 950,
      "Laboratorio X": 1500
    });
  });

  prueba("6B array vacío", () => {
    igual(puntosPorJuego([]), {});
  });

  prueba("6 reducciones sin modificar las partidas", () => {
    const lista = fresco();
    const antes = JSON.stringify(lista);

    totalPuntos(lista);
    puntosPorJuego(lista);

    igual(JSON.stringify(lista), antes);
  });

  prueba("6 combinar filter y reduce", () => {
    igual(
      totalPuntos(
        filtrarPartidas(fresco(), "carreras", 30)
      ),
      1100
    );
  });

  console.log(
    "\nRESULTADO: " +
    ok + " OK · " +
    pendientes + " pendientes · " +
    fallos + " fallos · " +
    (ok + pendientes + fallos) + " comprobaciones"
  );
})();

// DEMOSTRACIÓN FINAL PROPORCIONADA
// No tienes que programarla.

try {
  const seleccion = filtrarPartidas(
    partidas,
    "aventura",
    30
  );

  console.log("Informe de aventura:", {
    sesiones: seleccion.length,
    puntos: totalPuntos(seleccion),
    porJuego: puntosPorJuego(seleccion)
  });

  // Resultado esperado:
  // {
  //   sesiones: 2,
  //   puntos: 3000,
  //   porJuego: { "Órbita Azul": 3000 }
  // }
} catch (error) {
  console.log(
    "La demostración final se ejecutará " +
    "al completar los bloques 5 y 6."
  );
}