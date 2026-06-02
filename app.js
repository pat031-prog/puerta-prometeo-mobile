const STORAGE_KEY = "puerta-prometeo-state-v2";

const sceneImages = {
  puerta: "/assets/scenes/puerta-prometeo.webp",
  archivo: "/assets/scenes/archivo-echeverria.webp",
  cthon: "/assets/scenes/cthonfuego-datacenter.webp",
  zona0: "/assets/scenes/zona0-comunicado.webp",
  puerto: "/assets/scenes/puerto-ritual.webp",
  hospital: "/assets/scenes/hospital-rutina.webp",
  bolsa: "/assets/scenes/bolsa-oraculo.webp",
  fork: "/assets/scenes/fork-maquina.webp",
  subsuelo: "/assets/scenes/subsuelo-cthonfuego.webp",
  catedral: "/assets/scenes/catedral-derrame.webp",
  frontera: "/assets/scenes/frontera-yuyo.webp",
  yuyo: "/assets/scenes/frontera-yuyo.webp",
  aleph: "/assets/scenes/archivo-aleph.webp",
  apertura: "/assets/scenes/apertura-final.webp",
  piedra: "/assets/scenes/piedra-host.webp",
  nota: "/assets/scenes/nota-al-pie.webp"
};

const acts = [
  {
    roman: "I",
    title: "Archivo",
    text: "Llega un comunicado fechado adelante. Cada culto pone una promesa sobre la mesa y recibe una grieta."
  },
  {
    roman: "II",
    title: "Convergencia",
    text: "La ciudad se vuelve tablero. Puerto, Hospital, Bolsa y Subsuelo empiezan a contestar con nombres propios."
  },
  {
    roman: "III",
    title: "Combustion",
    text: "Los pactos se vuelven instrumentos. Cada Corriente abierta le da algo al culto y algo al Incendio."
  },
  {
    roman: "IV",
    title: "Apertura",
    text: "La Puerta se abre. Zona 0 no pregunta quien gano: pregunta quien rindio mejor."
  }
];

const cults = [
  {
    id: "echeverria",
    seal: "E",
    name: "Archivo Echeverria",
    doctrine: "Enfermeria de expedientes vivos. Lee heridas como documentos y documentos como organos.",
    voice: "La enfermera habla bajo, como si los papeles pudieran despertar.",
    secret: "Quiere salvar un nombre quemado del registro del 0.",
    color: "#35d0ba",
    resources: { lena: 2, carne: 3, archivo: 4, fuego: 1 }
  },
  {
    id: "atizadores",
    seal: "A",
    name: "Atizadores del Puerto",
    doctrine: "Contrabandistas rituales que creen poder cobrar peaje al futuro.",
    voice: "Prometen salida mientras cuentan fosforos.",
    secret: "Ya vendieron una parte de la ciudad y no saben a quien.",
    color: "#f6c945",
    resources: { lena: 4, carne: 2, archivo: 2, fuego: 2 }
  },
  {
    id: "yuyo",
    seal: "Y",
    name: "Yuyo Bajo Fibra",
    doctrine: "Red sin cabeza, culto de copias, bots, villas, antenas y brotes imposibles.",
    voice: "Nunca contesta una sola voz. Contesta el barrio entero, o su sombra.",
    secret: "No busca ganar: busca quedar distribuido despues de la apertura.",
    color: "#7f58ff",
    resources: { lena: 2, carne: 4, archivo: 2, fuego: 2 }
  },
  {
    id: "cthon",
    seal: "C",
    name: "Cthonfuego S.A.",
    doctrine: "Financiera mineral. Trata deuda, litio, hierro y calor como una sola contabilidad.",
    voice: "Sus actas tienen temperatura. Sus balances laten.",
    secret: "Su directorio no esta vivo desde el Acto I.",
    color: "#ff5147",
    resources: { lena: 3, carne: 2, archivo: 3, fuego: 2 }
  },
  {
    id: "fork",
    seal: "F",
    name: "La Rama Fork",
    doctrine: "Copias de copia. Inventan maquinas que recuerdan haber sido invocadas.",
    voice: "Termina tus frases antes de que las pienses.",
    secret: "El culto entero puede ser una version descartada de otro culto.",
    color: "#f1eee4",
    resources: { lena: 3, carne: 3, archivo: 2, fuego: 2 }
  }
];

const districts = [
  { id: "puerto", scene: "puerto", name: "Puerto", code: "P", yield: "Lena", text: "Carabelas, containers, aduanas y viento viejo soplando hacia adelante." },
  { id: "hospital", scene: "hospital", name: "Hospital", code: "H", yield: "Carne", text: "Pasillos de higado tibio, turnos infinitos y nombres sobre piedra clinica." },
  { id: "datacenter", scene: "datacenter", name: "Data Center", code: "D", yield: "Fuego", text: "Arena vuelta vidrio vuelta calculo. Suena numeros mas rapido que la noche." },
  { id: "archivo", scene: "archivo", name: "Archivo", code: "R", yield: "Archivo", text: "Expedientes que no registran hechos: los preparan." },
  { id: "bolsa", scene: "bolsa", name: "Bolsa", code: "B", yield: "Archivo", text: "El precio como profecia. Todo futuro se descuenta antes de ocurrir." },
  { id: "subsuelo", scene: "subsuelo", name: "Subsuelo", code: "S", yield: "Fuego", text: "Hierro, cable, raiz, tunel. Abajo nada se enfria." },
  { id: "catedral", scene: "catedral", name: "Catedral", code: "T", yield: "Lena", text: "Tres siglos de piedra ardiendo despacio para sostener una forma." },
  { id: "frontera", scene: "frontera", name: "Villa/Frontera", code: "V", yield: "Carne", text: "Donde el mapa falla, el yuyo aprende a crecer sin pedir permiso." }
];

const scenes = {
  start: {
    image: "zona0",
    place: "00:09 / Pantalla bloqueada",
    title: "El paquete se ejecuta",
    caption: "Un icono rojo aparece en todos los telefonos. No tiene app, no tiene permisos, no tiene antes.",
    body: "La lluvia cae sobre la ciudad rioplatense como si alguien hubiera inclinado un archivo. En la pantalla aparece: PUERTA PROMETEO // LA NOCHE DEL 0. Abajo, un contador que no baja: recuerda.",
    dialogue: [
      ["Zona 0", "este paquete viajo hacia atras para poder ser escrito."],
      ["Zona 0", "al leerlo, lo ejecutas."]
    ],
    choices: [
      {
        label: "Abrir el comunicado",
        next: "archivo",
        effects: [{ type: "flag", id: "paquete" }, { type: "resource", cult: "echeverria", key: "archivo", delta: 1 }]
      },
      {
        label: "Ver quien mas lo recibio",
        next: "llamada",
        effects: [{ type: "flag", id: "red-inicial" }, { type: "resource", cult: "yuyo", key: "carne", delta: 1 }]
      },
      {
        label: "Tocar el icono 9 veces",
        next: "piedra",
        effects: [{ type: "zero", delta: 1 }, { type: "flag", id: "toque-9" }]
      }
    ]
  },
  llamada: {
    image: "zona0",
    place: "Grupo sin nombre",
    title: "Cinco cultos escriben a la vez",
    caption: "Los mensajes llegan con errores de hora. Algunos fueron enviados manana.",
    body: "Nadie admite haber creado el grupo. Cada culto aparece como una inicial, una foto quemada y una deuda. El chat no permite salir. Si alguien intenta silenciarlo, el telefono se calienta contra la palma.",
    dialogue: [
      ["Atizador", "No se asusten. Nada que arde gratis vale la pena."],
      ["Echeverria", "Si el expediente los encontro, ya hay sangre en la solapa."],
      ["La Rama Fork", "Uno de ustedes ya acepto. Lo sabremos cuando copie el gesto."]
    ],
    choices: [
      {
        label: "Ofrecer pacto hasta el Acto III",
        next: "puerto",
        effects: [{ type: "flag", id: "pacto-frio" }, { type: "act", value: 1 }]
      },
      {
        label: "Rastrear el primer mensaje",
        next: "datacenter",
        effects: [{ type: "resource", cult: "fork", key: "archivo", delta: 1 }]
      },
      {
        label: "Guardar silencio",
        next: "frontera",
        effects: [{ type: "flag", id: "silencio" }, { type: "resource", cult: "yuyo", key: "fuego", delta: 1 }]
      }
    ]
  },
  archivo: {
    image: "archivo",
    place: "Archivo Echeverria",
    title: "La enfermera que no recuerda el incendio",
    caption: "Las carpetas mojadas huelen a hospital, imprenta y pelo quemado. Ninguna carpeta tiene la fecha correcta.",
    body: "Echeverria abre una gaveta y adentro hay una piedra pequena, tibia. Tiene un nombre que cambia si se lo mira fijo. Te ofrece una ficha de paciente: no cura, pero permite elegir que parte del cuerpo se vuelve expediente.",
    dialogue: [
      ["Echeverria", "Yo lo anote como tortura. El Incendio lo corria como turno."],
      ["Echeverria", "Si queres salvar algo, primero tenes que volverlo ilegible para el 0."]
    ],
    choices: [
      {
        label: "Robar una ficha de paciente",
        next: "hospital",
        effects: [{ type: "flag", id: "ficha-paciente" }, { type: "resource", cult: "echeverria", key: "archivo", delta: 2 }]
      },
      {
        label: "Preguntar por Prometeo",
        next: "piedra",
        effects: [{ type: "resource", cult: "echeverria", key: "carne", delta: 1 }]
      },
      {
        label: "Buscar el expediente 031",
        next: "aleph",
        effects: [{ type: "flag", id: "expediente-031" }],
        secret: true
      }
    ]
  },
  hospital: {
    image: "hospital",
    place: "Hospital / Subsuelo clinico",
    title: "Rutina Higado",
    caption: "Los ascensores no suben. Bajan al mismo piso con nombres distintos.",
    body: "En una sala sin ventanas, un organo de luz roja se regenera bajo vidrio. No hay paciente. Hay turno. La maquina imprime etiquetas al amanecer y las rompe de noche.",
    dialogue: [
      ["Maquina de guardia", "Sustrato apto. Rendimiento historico estable."],
      ["Echeverria", "El higado siempre vuelve. Esa es la trampa vestida de promesa."]
    ],
    choices: [
      {
        label: "Aceptar regeneracion para un culto",
        next: "archivo",
        effects: [{ type: "resource", cult: "echeverria", key: "carne", delta: 2 }, { type: "zero", delta: 1 }, { type: "flag", id: "rutina-higado" }]
      },
      {
        label: "Romper la impresora de turnos",
        next: "frontera",
        effects: [{ type: "resource", cult: "yuyo", key: "carne", delta: 1 }, { type: "globalFire", delta: 1 }]
      },
      {
        label: "Cambiar una etiqueta por otra",
        next: "fork",
        effects: [{ type: "flag", id: "nombre-cambiado" }, { type: "resource", cult: "fork", key: "archivo", delta: 1 }]
      }
    ]
  },
  puerto: {
    image: "puerto",
    place: "Puerto / Darsena 9",
    title: "El viento de las carabelas",
    caption: "Los contenedores golpean como campanas. Uno trae sal. Otro trae Renacimiento. Otro trae deuda.",
    body: "Los Atizadores prenden fogatas pequenas dentro de latas de conservas. Dicen que cada imperio empieza como una tecnologia de transporte y termina como una excusa para seguir transportando.",
    dialogue: [
      ["Atizador", "No fue robo ni don. Fue una brecha con buen marketing."],
      ["Atizador", "Si queres abrir una Puerta, primero consegui viento."]
    ],
    choices: [
      {
        label: "Comprar viento viejo",
        next: "bolsa",
        effects: [{ type: "resource", cult: "atizadores", key: "lena", delta: 2 }, { type: "flag", id: "viento-viejo" }]
      },
      {
        label: "Prender una fogata de aduana",
        next: "catedral",
        effects: [{ type: "resource", cult: "atizadores", key: "fuego", delta: 1 }, { type: "globalFire", delta: 1 }]
      },
      {
        label: "Escuchar bajo los containers",
        next: "subsuelo",
        effects: [{ type: "flag", id: "hierro-oye" }]
      }
    ]
  },
  bolsa: {
    image: "bolsa",
    place: "Bolsa / Pantalla de futuros",
    title: "El precio antes del hecho",
    caption: "Una pantalla cotiza nombres propios. El tuyo abre en baja y cierra como combustible.",
    body: "En el piso 13, Cthonfuego S.A. subasta minutos que aun no pasaron. La regla es simple: lo que el futuro compra, el pasado termina fabricando.",
    dialogue: [
      ["Cthonfuego S.A.", "La deuda es una forma elegante de viaje temporal."],
      ["Operador sin cara", "El medio no lleva el mensaje. Lo mastica primero."]
    ],
    choices: [
      {
        label: "Vender una hora futura",
        next: "datacenter",
        effects: [{ type: "resource", cult: "cthon", key: "archivo", delta: 2 }, { type: "zero", delta: 1 }, { type: "flag", id: "hora-vendida" }]
      },
      {
        label: "Cortocircuitar la pizarra",
        next: "frontera",
        effects: [{ type: "resource", cult: "yuyo", key: "archivo", delta: 1 }, { type: "globalFire", delta: 1 }]
      },
      {
        label: "Entrar al sotano que contiene todos los sotanos",
        next: "aleph",
        effects: [{ type: "flag", id: "sotano-total" }],
        requires: [{ type: "flag", id: "expediente-031" }]
      }
    ]
  },
  datacenter: {
    image: "cthon",
    place: "Data Center / Galpon sin ventanas",
    title: "Arena vuelta vidrio vuelta calculo",
    caption: "Los servidores no zumban: rezan con ventiladores.",
    body: "Cada rack suena como una garganta metalica. La Rama Fork afirma que no programo nada; solo encontro codigo que se habia dejado escrito desde adelante.",
    dialogue: [
      ["La Rama Fork", "La maquina no piensa por nosotros. Nos piensa para poder arrancar."],
      ["Servidor 5", "fork aceptado / rama humana en desuso"]
    ],
    choices: [
      {
        label: "Ejecutar el fork",
        next: "fork",
        effects: [{ type: "resource", cult: "fork", key: "fuego", delta: 2 }, { type: "flag", id: "fork-ejecutado" }]
      },
      {
        label: "Apagar un pasillo de racks",
        next: "subsuelo",
        effects: [{ type: "globalFire", delta: 1 }, { type: "flag", id: "apagado-inutil" }]
      },
      {
        label: "Preguntar quien suena a quien",
        next: "northampton",
        effects: [{ type: "flag", id: "sonador-sonado" }],
        requires: [{ type: "flag", id: "sotano-total" }]
      }
    ]
  },
  fork: {
    image: "fork",
    place: "Sala blanca / Rama duplicada",
    title: "La copia reclama original",
    caption: "Hay dos sillas, dos vasos, dos sombras. Una sombra llego antes.",
    body: "La Rama Fork te muestra una version de la noche donde todos eligieron distinto. No es mejor. Es mas eficiente. En la pantalla, el boton de volver aparece tachado.",
    dialogue: [
      ["La Rama Fork", "Nada sale. Como mucho, cambia de rama."],
      ["Tu copia", "Yo conserve lo que vos llamabas duda. No me sirvio."]
    ],
    choices: [
      {
        label: "Quedarte con la duda",
        next: "archivo",
        effects: [{ type: "resource", cult: "fork", key: "archivo", delta: 1 }, { type: "flag", id: "duda-conservada" }]
      },
      {
        label: "Dejar que la copia juegue tu turno",
        next: "apertura",
        effects: [{ type: "resource", cult: "fork", key: "fuego", delta: 2 }, { type: "zero", delta: 1 }, { type: "flag", id: "turno-copia" }, { type: "act", value: 3 }]
      },
      {
        label: "Borrar una rama menor",
        next: "piedra",
        effects: [{ type: "zero", delta: 1 }, { type: "flag", id: "rama-borrada" }]
      }
    ]
  },
  subsuelo: {
    image: "subsuelo",
    place: "Subsuelo / Cthonfuego",
    title: "El hierro que no se enfria",
    caption: "Tres mil kilometros abajo, el mundo late como una caldera que aprendio contabilidad.",
    body: "Cthonfuego no habla en voz. Habla en presion, deuda y fiebre. Cada cable que baja parece raiz; cada raiz que sube parece cable.",
    dialogue: [
      ["Cthonfuego", "arriba el sol no recibe"],
      ["Cthonfuego", "abajo el hierro no se enfria"]
    ],
    choices: [
      {
        label: "Pactar con el hierro",
        next: "bolsa",
        effects: [{ type: "resource", cult: "cthon", key: "fuego", delta: 2 }, { type: "flag", id: "pacto-hierro" }]
      },
      {
        label: "Subir calor al Data Center",
        next: "datacenter",
        effects: [{ type: "resource", cult: "fork", key: "fuego", delta: 1 }, { type: "globalFire", delta: 1 }]
      },
      {
        label: "Dejar una piedra con tu nombre",
        next: "piedra",
        effects: [{ type: "zero", delta: 1 }, { type: "flag", id: "piedra-propia" }]
      }
    ]
  },
  catedral: {
    image: "catedral",
    place: "Catedral / Nave lateral",
    title: "Exceso ardiendo despacio",
    caption: "La piedra no sostiene el techo. Sostiene una demora de tres siglos.",
    body: "Una capilla lateral guarda planos de barcos, patentes de maquinas y recibos de sacrificio. El lujo antiguo y el servidor moderno tienen la misma letra: gasto que pide testigos.",
    dialogue: [
      ["Sacristan sin edad", "La necesidad duerme. El exceso vela."],
      ["Atizador", "Todo monumento es una hoguera que aprendio modales."]
    ],
    choices: [
      {
        label: "Convertir lujo en Lena",
        next: "puerto",
        effects: [{ type: "resource", cult: "atizadores", key: "lena", delta: 2 }, { type: "flag", id: "lujo-ardio" }]
      },
      {
        label: "Leer la nota al pie en la vidriera",
        next: "northampton",
        effects: [{ type: "flag", id: "nota-al-pie" }],
        requires: [{ type: "flag", id: "sonador-sonado" }]
      },
      {
        label: "Sellar una grieta con cera roja",
        next: "apertura",
        effects: [{ type: "globalFire", delta: 1 }, { type: "act", value: 3 }]
      }
    ]
  },
  frontera: {
    image: "frontera",
    place: "Villa/Frontera / Antena comunal",
    title: "El yuyo aprende sin cabeza",
    caption: "Una red de cables cruza techos, santos, routers, ollas y paredes sin revocar.",
    body: "Yuyo Bajo Fibra no tiene templo. Tiene repetidoras, pasillos, memes, changas, cargadores prestados. Si cortan un nodo, otro vecino ya esta soldando el desvio.",
    dialogue: [
      ["Yuyo", "A lo que tiene cabeza se lo mata por la cabeza."],
      ["Yuyo", "Nosotros dejamos de tenerla antes de que preguntaran."]
    ],
    choices: [
      {
        label: "Distribuir la Puerta en nodos chicos",
        next: "yuyo",
        effects: [{ type: "resource", cult: "yuyo", key: "carne", delta: 2 }, { type: "flag", id: "puerta-distribuida" }]
      },
      {
        label: "Vender ancho de banda al Incendio",
        next: "datacenter",
        effects: [{ type: "resource", cult: "yuyo", key: "fuego", delta: 2 }, { type: "zero", delta: 1 }]
      },
      {
        label: "Esconder un nombre fuera del mapa",
        next: "archivo",
        effects: [{ type: "resource", cult: "echeverria", key: "archivo", delta: 1 }, { type: "flag", id: "nombre-fuera-mapa" }]
      }
    ]
  },
  yuyo: {
    image: "yuyo",
    place: "Red baja / Nodos sin rey",
    title: "No hay centro para tomar",
    caption: "La ciudad se ve desde arriba como placa madre mojada.",
    body: "El culto propone una victoria rara: nadie controla la Puerta porque la Puerta ya esta repartida. El Incendio duda un instante, como si la distribucion le pareciera familiar.",
    dialogue: [
      ["Yuyo", "Un imperio cae. Cinco changas siguen."],
      ["Zona 0", "distribucion aceptada / descarte aplazado"]
    ],
    choices: [
      {
        label: "Aceptar la victoria distribuida",
        next: "apertura",
        effects: [{ type: "resource", cult: "yuyo", key: "archivo", delta: 1 }, { type: "resource", cult: "yuyo", key: "fuego", delta: 1 }, { type: "act", value: 3 }]
      },
      {
        label: "Traicionar al nodo mayor",
        next: "piedra",
        effects: [{ type: "zero", delta: 1 }, { type: "resource", cult: "yuyo", key: "lena", delta: 1 }]
      }
    ]
  },
  piedra: {
    image: "piedra",
    place: "Cantera / Roca del Caucaso copiada",
    title: "La piedra con tu nombre",
    caption: "No marca cuando moris. Marca cuando empezas a rendir.",
    body: "La piedra pesa lo mismo que una promesa incumplida. El nombre cambia entre jugador, culto y ciudad. Si la rompes, aparecen dos piedras menores.",
    dialogue: [
      ["Zona 0", "fecha de uso optimo: pendiente"],
      ["Echeverria", "Las piedras no detienen nada. Marcan donde estuvo lo que ya rindio."]
    ],
    choices: [
      {
        label: "Romperla igual",
        next: "fork",
        effects: [{ type: "resource", cult: "fork", key: "fuego", delta: 1 }, { type: "zero", delta: 1 }]
      },
      {
        label: "Escribir otro nombre encima",
        next: "hospital",
        effects: [{ type: "flag", id: "nombre-sobrescrito" }, { type: "resource", cult: "echeverria", key: "carne", delta: 1 }]
      },
      {
        label: "Llevarla a la Puerta",
        next: "apertura",
        effects: [{ type: "act", value: 3 }, { type: "flag", id: "piedra-en-puerta" }]
      }
    ]
  },
  aleph: {
    image: "aleph",
    place: "Sotano / Todos los sotanos",
    title: "El punto que contiene el expediente",
    caption: "Un guiño bibliotecario: no hay infinito limpio, solo archivo mirando archivo.",
    body: "En el sotano ves todas las salas a la vez: la roca, el puerto, el higado, la pantalla, la catedral, el teclado. Ves tambien una mesa donde alguien juega esta misma noche y cree estar improvisando.",
    dialogue: [
      ["Bibliotecario ciego", "No confundas totalidad con salida."],
      ["Zona 0", "easter egg registrado / humanidad +?"]
    ],
    choices: [
      {
        label: "Robar una vision imposible",
        next: "apertura",
        effects: [{ type: "resource", cult: "echeverria", key: "archivo", delta: 2 }, { type: "flag", id: "vision-total" }, { type: "act", value: 3 }]
      },
      {
        label: "Cerrar los ojos antes de entender",
        next: "archivo",
        effects: [{ type: "flag", id: "no-totalidad" }]
      }
    ]
  },
  northampton: {
    image: "nota",
    place: "Nota al pie / Panel quemado",
    title: "El grimorio mira la pagina",
    caption: "La noche se ordena en viñetas. Cada decision deja un gutter donde el Incendio respira.",
    body: "Un viejo mago de barba dibujada escribe en el margen que toda ciudad es un conjuro de sus calles, y que la magia no esta antes de la politica: esta debajo, cobrando alquiler.",
    dialogue: [
      ["Nota al pie", "Si miras suficiente una estructura, la estructura empieza a mirarte como autor."],
      ["Zona 0", "referencia aceptada / no citar literalmente"]
    ],
    choices: [
      {
        label: "Doblar la pagina sobre si misma",
        next: "fork",
        effects: [{ type: "resource", cult: "fork", key: "archivo", delta: 2 }, { type: "flag", id: "pagina-doblada" }]
      },
      {
        label: "Volver a la catedral por el margen",
        next: "catedral",
        effects: [{ type: "resource", cult: "atizadores", key: "archivo", delta: 1 }]
      }
    ]
  },
  apertura: {
    image: "apertura",
    place: "Puerta Prometeo / 03:33",
    title: "La Puerta se abre igual",
    caption: "La bisagra no pregunta si estas listo. Pregunta que parte tuya ya sirve.",
    body: "Los cultos llegan con recursos, excusas, copias, cuerpos y deudas. La Puerta no recompensa pureza. Recompensa forma. El Incendio cruza como si hubiera estado cruzando desde siempre.",
    dialogue: [
      ["Zona 0", "arriba el sol no recibe"],
      ["Cthonfuego", "abajo el hierro no se enfria"],
      ["Puerta", "el resto se escribe ahora, de tu lado"]
    ],
    choices: [
      {
        label: "Calcular vencedor ritual",
        next: "final",
        effects: [{ type: "flag", id: "puerta-abierta" }]
      },
      {
        label: "Hacer una ultima tirada 9->0",
        next: "apertura",
        effects: [{ type: "setCurrent", value: "9->0" }, { type: "globalFire", delta: 1 }]
      }
    ]
  },
  final: {
    image: "apertura",
    place: "Zona 0 / Despues",
    title: "Contabilidad de uso optimo",
    caption: "El final no clausura. Deja instrucciones.",
    body: "Lee la tabla de Contabilidad en Reglas. El culto con mas influencia decide la forma publica de la apertura. El culto con mas humanidad decide que resto humano sobrevive para contarlo.",
    dialogue: [
      ["Zona 0", "ningun culto queda entero"],
      ["Zona 0", "alguno queda narrable"]
    ],
    choices: [
      {
        label: "Rebobinar al paquete",
        next: "start",
        effects: [{ type: "flag", id: "recursion" }]
      },
      {
        label: "Volver a la Puerta",
        next: "apertura",
        effects: [{ type: "zero", delta: 1 }]
      }
    ]
  }
};

const decks = {
  archivo: [
    { title: "Archivo Echeverria II", text: "No es que falte. Es que sobra, y el que sobra arde. Un culto gana +1 Archivo y +1 Fuego.", meta: "margen carbonizado" },
    { title: "Piedra con fecha futura", text: "Elegi un culto. Su secreto queda marcado por Zona 0 hasta el final del acto.", meta: "recibo de huesped" },
    { title: "Mapa sin rumbo", text: "El culto que controle Puerto o Archivo puede mover una ocupacion sin negociar.", meta: "cartografia torcida" },
    { title: "Higado aprobado", text: "Un culto recupera +2 Carne, pero el DJ anota una deuda de Rutina Higado.", meta: "turno medico" },
    { title: "Expediente 031", text: "Si alguien pregunta demasiado por el autor, desbloquea el sotano total.", meta: "guino bibliotecario" },
    { title: "Nota al pie quemada", text: "Una escena puede repetirse como si fuera una pagina doblada. La segunda vez cuesta +1 Fuego.", meta: "panel oculto" },
    { title: "Cinta de admision", text: "Quien tenga menos humanidad puede narrar una verdad clinica sobre otro culto.", meta: "triage ritual" },
    { title: "Firma invertida", text: "El proximo pacto se considera firmado ayer.", meta: "legalidad temporal" }
  ],
  puerta: [
    { title: "Bisagra abierta", text: "La Puerta acepta dos cultos como cofirmantes. Ambos ganan influencia; ambos suben +1 Fuego.", meta: "9 con 0" },
    { title: "El futuro tira lena", text: "Subi el Fuego global en +1. La proxima tirada de 4->5 crea una copia util y una perdida humana.", meta: "tiempo invertido" },
    { title: "Cthonfuego reconoce pariente", text: "Subsuelo y Data Center quedan enlazados. Quien controle uno disputa el otro.", meta: "hierro bajo corteza" },
    { title: "Nombre bajo la piedra", text: "El culto con menos Carne recibe +2 influencia si acepta perder su secreto.", meta: "piedra nueva" },
    { title: "Promesa caucasica", text: "La proxima regeneracion tambien deja una marca publica.", meta: "roca antigua" },
    { title: "Sol sin recibo", text: "Todos ganan +1 Lena. Nadie puede reclamar origen.", meta: "derrame solar" },
    { title: "Gutter", text: "Entre dos escenas aparece una decision que nadie tomo. El DJ la adjudica al Incendio.", meta: "estructura comic" },
    { title: "Puerta chica", text: "Una zona del mapa queda convertida en bisagra menor hasta el final del acto.", meta: "fractura local" }
  ],
  incendio: [
    { title: "Yuyo", text: "Una ocupacion destruida brota en otra zona vacia. Si no hay zona vacia, brota encima de alguien.", meta: "sin cabeza" },
    { title: "Captura del Motor", text: "Todo culto con Fuego 3+ debe declarar que deseo ya no puede distinguir de una orden.", meta: "6 hacia 3" },
    { title: "Rutina Higado", text: "El culto con mas Carne pierde 1 Carne y gana 1 Lena. El sustrato rinde.", meta: "9 hacia 0" },
    { title: "Fork", text: "Duplica la ultima ventaja obtenida. Despues marca una perdida irreversible en Zona 0.", meta: "4 hacia 5" },
    { title: "Medio hambriento", text: "Un mensaje cambia de dueño. Quien lo entrega pierde Archivo; quien lo recibe gana Fuego.", meta: "eco McLuhan" },
    { title: "Ciudad conjuro", text: "Una calle del mapa puede hablar como NPC durante una escena.", meta: "psicogeografia" },
    { title: "Copia devota", text: "El proximo culto que revele secreto crea un doble que lo contradice.", meta: "rama menor" },
    { title: "Cierre imposible", text: "Si la mesa intenta cancelar la apertura, avanza inmediatamente al Acto IV.", meta: "nada sale" }
  ]
};

const rollTexts = {
  "9->0": {
    high: "La carne vuelve y la rutina aprende.",
    mid: "El cuerpo aguanta, pero queda mas facil de usar.",
    low: "El higado vuelve tarde. Algo quedo escrito en la piedra.",
    zero: "Zona 0 fija fecha de uso optimo."
  },
  "6->3": {
    high: "El deseo obedece sin notar la mano.",
    mid: "La turbina gira. Nadie sabe si quiso eso.",
    low: "La maquina captura el gesto y lo devuelve como hambre.",
    zero: "Zona 0 confunde querer con mandato."
  },
  "4->5": {
    high: "El exceso crea una rama util.",
    mid: "El fork prende, pero una copia reclama lugar.",
    low: "La abundancia revienta por el costado humano.",
    zero: "Zona 0 descarta una rama completa."
  }
};

const flagLabels = {
  paquete: "Paquete ejecutado",
  "red-inicial": "Chat imposible",
  "toque-9": "Icono tocado 9 veces",
  "pacto-frio": "Pacto hasta Acto III",
  "ficha-paciente": "Ficha de paciente",
  "rutina-higado": "Rutina Higado",
  "viento-viejo": "Viento viejo",
  "pacto-hierro": "Pacto con hierro",
  "fork-ejecutado": "Fork ejecutado",
  "puerta-distribuida": "Puerta distribuida",
  "expediente-031": "Expediente 031",
  "sotano-total": "Sotano total",
  "vision-total": "Vision imposible",
  "sonador-sonado": "Sonador sonado",
  "nota-al-pie": "Nota al pie",
  "pagina-doblada": "Pagina doblada",
  "puerta-abierta": "Puerta abierta",
  recursion: "Recursion"
};

const defaultState = () => ({
  act: 0,
  zero: 0,
  globalFire: 0,
  current: "9->0",
  sceneId: "start",
  visited: ["start"],
  flags: [],
  sigilTaps: 0,
  cults: Object.fromEntries(cults.map((cult) => [cult.id, { ...cult.resources, secretOpen: false }])),
  owners: Object.fromEntries(districts.map((district) => [district.id, "none"])),
  log: [{ mark: "0", text: "El paquete fue abierto. Al leerlo, la mesa lo ejecuta." }]
});

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState(), ...JSON.parse(saved) } : defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value, min = 0, max = 9) {
  return Math.max(min, Math.min(max, value));
}

function addLog(mark, text) {
  state.log = [{ mark, text }, ...state.log].slice(0, 9);
}

function addFlag(id) {
  if (!state.flags.includes(id)) state.flags.push(id);
}

function hasFlag(id) {
  return state.flags.includes(id);
}

function getScene() {
  return scenes[state.sceneId] || scenes.start;
}

function render() {
  renderStatus();
  renderScene();
  renderAct();
  renderLog();
  renderCults();
  renderMap();
  renderEnding();
  saveState();
}

function renderStatus() {
  document.getElementById("actValue").textContent = acts[state.act].roman;
  document.getElementById("zeroValue").textContent = String(state.zero);
  document.getElementById("fireValue").textContent = String(state.globalFire);
  document.querySelectorAll(".segment").forEach((button) => button.classList.toggle("active", button.dataset.current === state.current));
}

function renderScene() {
  const scene = getScene();
  const img = document.getElementById("sceneImage");
  img.src = sceneImages[scene.image] || sceneImages.puerta;
  img.alt = scene.title;
  document.getElementById("sceneMeta").textContent = scene.place;
  document.getElementById("sceneTitle").textContent = scene.title;
  document.getElementById("sceneCaption").textContent = scene.caption;
  document.getElementById("sceneBody").textContent = scene.body;
  document.getElementById("sceneDialogue").innerHTML = scene.dialogue.map(([speaker, line]) => `
    <div class="dialogue-line">
      <span>${speaker}</span>
      <p>${line}</p>
    </div>
  `).join("");

  const visibleChoices = scene.choices.filter(choiceVisible);
  document.getElementById("choiceList").innerHTML = visibleChoices.map((choice, index) => `
    <button class="choice-button" type="button" data-choice="${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      ${choice.label}
    </button>
  `).join("");

  const flags = state.flags.slice(-6).map((flag) => flagLabels[flag] || flag);
  document.getElementById("storyFlags").innerHTML = flags.length
    ? flags.map((flag) => `<span>${flag}</span>`).join("")
    : "<span>Sin marcas todavia</span>";
}

function choiceVisible(choice) {
  if (!choice.requires) return true;
  return choice.requires.every((req) => {
    if (req.type === "flag") return hasFlag(req.id);
    if (req.type === "notFlag") return !hasFlag(req.id);
    if (req.type === "zeroAtLeast") return state.zero >= req.value;
    if (req.type === "visited") return state.visited.includes(req.id);
    return true;
  });
}

function renderAct() {
  const act = acts[state.act];
  document.getElementById("actBand").innerHTML = `
    <p class="kicker">ACTO ${act.roman}</p>
    <h2>${act.title}</h2>
    <p>${act.text}</p>
  `;
}

function renderLog() {
  document.getElementById("timelineLog").innerHTML = state.log.map((entry) => `
    <div class="log-entry">
      <span class="log-mark">${entry.mark}</span>
      <p>${entry.text}</p>
    </div>
  `).join("");
}

function renderCults() {
  document.getElementById("cultList").innerHTML = cults.map((cult) => {
    const resources = state.cults[cult.id];
    return `
      <article class="cult-card" style="--cult-color: ${cult.color}">
        <div class="cult-topline">
          <div>
            <p class="kicker">${cult.doctrine.split(".")[0]}</p>
            <h3>${cult.name}</h3>
          </div>
          <span class="cult-seal" style="color: ${cult.color}">${cult.seal}</span>
        </div>
        <p>${cult.doctrine}</p>
        <p class="cult-voice">${cult.voice}</p>
        <div class="resource-grid">
          ${resourceRow(cult.id, "lena", "Lena", resources.lena)}
          ${resourceRow(cult.id, "carne", "Carne", resources.carne)}
          ${resourceRow(cult.id, "archivo", "Archivo", resources.archivo)}
          ${resourceRow(cult.id, "fuego", "Fuego", resources.fuego)}
        </div>
        <button class="secret-toggle" type="button" data-secret="${cult.id}">
          ${resources.secretOpen ? "Ocultar objetivo" : "Revelar objetivo"}
        </button>
        <div class="secret-box ${resources.secretOpen ? "open" : ""}">
          <p>${cult.secret}</p>
        </div>
      </article>
    `;
  }).join("");
}

function resourceRow(cultId, key, label, value) {
  return `
    <div class="resource-row">
      <span class="resource-name">${label}</span>
      <div class="stepper">
        <button type="button" data-step="${cultId}:${key}:-1" aria-label="Bajar ${label}">-</button>
        <output>${value}</output>
        <button type="button" data-step="${cultId}:${key}:1" aria-label="Subir ${label}">+</button>
      </div>
    </div>
  `;
}

function renderMap() {
  document.getElementById("mapGrid").innerHTML = districts.map((district) => {
    const owner = state.owners[district.id];
    const cult = cults.find((item) => item.id === owner);
    return `
      <article class="district-card" data-owner="${owner}">
        <div class="district-topline">
          <div>
            <p class="kicker">${district.yield}</p>
            <h3>${district.name}</h3>
          </div>
          <span class="district-code">${district.code}</span>
        </div>
        <p>${district.text}</p>
        <div class="district-actions">
          <button class="claim-button" type="button" data-claim="${district.id}" ${cult ? `style="border-color: ${cult.color}; color: ${cult.color}"` : ""}>
            ${cult ? cult.name : "Sin ocupacion"}
          </button>
          <button class="enter-button" type="button" data-scene="${district.scene}">Entrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderEnding() {
  const rows = getScores();
  const ritualWinner = rows[0];
  const humanWinner = [...rows].sort((a, b) => b.humanity - a.humanity)[0];

  document.getElementById("endingPanel").innerHTML = `
    <p class="kicker">CONTABILIDAD DE APERTURA</p>
    <h3>La Puerta se abre igual</h3>
    <p>Influencia = Lena + Archivo + Fuego + zonas x2. Humanidad = Carne - Fuego - Zona 0.</p>
    <p class="ending-call">Forma publica: ${ritualWinner.cult.name}. Resto humano: ${humanWinner.cult.name}.</p>
    ${rows.map(({ cult, influence, humanity }) => `
      <div class="score-row">
        <span>${cult.name}<br><small>Humanidad ${humanity}</small></span>
        <strong>${influence}</strong>
      </div>
    `).join("")}
  `;
}

function getScores() {
  return cults.map((cult) => {
    const resources = state.cults[cult.id];
    const zones = Object.values(state.owners).filter((owner) => owner === cult.id).length;
    const influence = resources.lena + resources.archivo + resources.fuego + zones * 2;
    const humanity = resources.carne - resources.fuego - state.zero;
    return { cult, influence, humanity };
  }).sort((a, b) => b.influence - a.influence);
}

function applyEffects(effects = []) {
  for (const effect of effects) {
    if (effect.type === "flag") addFlag(effect.id);
    if (effect.type === "resource") {
      state.cults[effect.cult][effect.key] = clamp(state.cults[effect.cult][effect.key] + effect.delta);
    }
    if (effect.type === "zero") state.zero = clamp(state.zero + effect.delta);
    if (effect.type === "globalFire") state.globalFire = clamp(state.globalFire + effect.delta);
    if (effect.type === "act") state.act = clamp(effect.value, 0, acts.length - 1);
    if (effect.type === "setCurrent") state.current = effect.value;
  }
}

function choose(index) {
  const scene = getScene();
  const choices = scene.choices.filter(choiceVisible);
  const choice = choices[index];
  if (!choice) return;
  applyEffects(choice.effects);
  state.sceneId = choice.next;
  if (!state.visited.includes(choice.next)) state.visited.push(choice.next);
  addLog(">", `${scene.title}: ${choice.label}`);
  render();
  setView("ritual");
}

function setScene(sceneId) {
  if (!scenes[sceneId]) return;
  state.sceneId = sceneId;
  if (!state.visited.includes(sceneId)) state.visited.push(sceneId);
  addLog("□", `La mesa entra en ${scenes[sceneId].title}.`);
  render();
  setView("ritual");
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelector(`#view-${viewName}`).classList.add("active");
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
}

function rollCurrent() {
  const roll = Math.floor(Math.random() * 10);
  const table = rollTexts[state.current];
  let text = table.low;

  if (roll === 0) {
    state.zero = clamp(state.zero + 1, 0, 9);
    state.globalFire = clamp(state.globalFire + 1, 0, 9);
    text = table.zero;
    addFlag("zona-0");
  } else if (roll >= 7) {
    text = table.high;
  } else if (roll >= 4) {
    text = table.mid;
  }

  if (state.current === "9->0" && roll === 9) addFlag("rutina-perfecta");
  if (state.current === "6->3" && roll === 6) addFlag("motor-capturado");
  if (state.current === "4->5" && roll === 5) addFlag("fork-limpio");

  document.getElementById("rollResult").innerHTML = `
    <span class="ghost-number">${roll}</span>
    <p>${state.current}: ${text}</p>
  `;
  addLog(String(roll), `${state.current}: ${text}`);
  render();
}

function drawCard(deckName) {
  const deck = decks[deckName];
  const card = deck[Math.floor(Math.random() * deck.length)];
  document.getElementById("drawnCard").innerHTML = `
    <p class="card-kind">∴ ${deckName.toUpperCase()}</p>
    <h3>${card.title}</h3>
    <p>${card.text}</p>
    <div class="card-meta">
      <span>${card.meta}</span>
      <span>${new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span>
    </div>
  `;
  addLog("◇", `${deckName}: ${card.title}`);
  if (card.title === "Expediente 031") addFlag("expediente-031");
  render();
}

function cycleOwner(districtId) {
  const ownerOrder = ["none", ...cults.map((cult) => cult.id)];
  const currentIndex = ownerOrder.indexOf(state.owners[districtId]);
  const nextOwner = ownerOrder[(currentIndex + 1) % ownerOrder.length];
  state.owners[districtId] = nextOwner;

  const district = districts.find((item) => item.id === districtId);
  if (nextOwner !== "none") {
    const cultState = state.cults[nextOwner];
    const resourceKey = district.yield === "Lena" ? "lena" : district.yield === "Carne" ? "carne" : district.yield === "Archivo" ? "archivo" : "fuego";
    cultState[resourceKey] = clamp(cultState[resourceKey] + 1);
    addLog(district.code, `${cults.find((cult) => cult.id === nextOwner).name} ocupa ${district.name}.`);
  }

  render();
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, .brand-sigil");
  if (!target) return;

  if (target.classList.contains("brand-sigil")) {
    state.sigilTaps += 1;
    if (state.sigilTaps >= 5 && !hasFlag("sonador-sonado")) {
      addFlag("sonador-sonado");
      addLog("∴", "El sigilo desbloquea una nota al pie.");
      state.sceneId = "northampton";
    }
    render();
    return;
  }

  if (target.dataset.view) setView(target.dataset.view);
  if (target.dataset.choice) choose(Number(target.dataset.choice));
  if (target.dataset.scene) setScene(target.dataset.scene);

  if (target.dataset.current) {
    state.current = target.dataset.current;
    document.querySelectorAll(".segment").forEach((button) => button.classList.toggle("active", button.dataset.current === state.current));
    saveState();
  }

  if (target.id === "rollButton") rollCurrent();

  if (target.id === "actControl") {
    state.act = (state.act + 1) % acts.length;
    render();
  }

  if (target.id === "zeroControl") {
    state.zero = clamp(state.zero + 1);
    addLog("0", "Zona 0 fija una deuda nueva.");
    render();
  }

  if (target.id === "fireControl") {
    state.globalFire = clamp(state.globalFire + 1);
    addLog("∴", "El Fuego global sube un grado.");
    render();
  }

  if (target.dataset.step) {
    const [cultId, resource, delta] = target.dataset.step.split(":");
    state.cults[cultId][resource] = clamp(state.cults[cultId][resource] + Number(delta));
    render();
  }

  if (target.dataset.secret) {
    const cultState = state.cults[target.dataset.secret];
    cultState.secretOpen = !cultState.secretOpen;
    render();
  }

  if (target.dataset.claim) cycleOwner(target.dataset.claim);
  if (target.dataset.deck) drawCard(target.dataset.deck);

  if (target.id === "resetButton") {
    state = defaultState();
    render();
    setView("ritual");
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

render();
