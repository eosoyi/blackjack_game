/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];

const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const btnPedir = document.querySelector("#btPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const puntosHTML = document.querySelectorAll("small");
const cartaJugador = document.querySelector("#jugador-cartas");
const cartaComputadora = document.querySelector("#computadora-cartas");

let puntosJugador = 0;
let puntosComputadora = 0;

// funcion crea una nueva baraja
const createDeck = () => {
  for (let i = 2; i < 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }

    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
  }

  deck = _.shuffle(deck);
  //console.log(deck)

  return deck;
};

// funcion para pedir una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en la baraja";
  }
  const carta = deck.pop();
  return carta;
};

// funcion para saber el valor de una carta
const valorCarta = (carta) => {
  // estraemos la primera letra
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt = `${carta}.png`;
    imgCarta.classList.add("carta");

    cartaComputadora.append(imgCarta);

    if (puntosJugador > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      window.alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      window.alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      window.alert("Jugador gana");
    } else {
      window.alert("Computadora gana");
    }
  }, 100);
};

createDeck();

btnPedir.addEventListener("click", function (e) {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.alt = `${carta}.png`;
  imgCarta.classList.add("carta");

  cartaJugador.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", function (e) {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", function () {
    deck = [];
    deck = createDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    cartaJugador.innerHTML = '';
    cartaComputadora.innerHTML= '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});
