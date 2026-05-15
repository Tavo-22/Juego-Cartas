// ── Variables globales ──
let cartasVolteadas = [];
let parejasEncontradas = 0;
let bloqueado = false;

// Intentos del nivel actual — se reinicia en cada nivel
let intentosNivel = 0;

// Intentos totales — se acumula en todos los niveles
let intentosTotales = 0;

// Nivel actual
let nivelActual = 1;
const TOTAL_NIVELES = 3;

// Total de parejas del nivel actual — lo recibimos de api.php
let totalParejasNivel = 0;

// ── 2. Llamada a api.php con Axios ──
// ── iniciarJuego ──
async function iniciarJuego() {
  cartasVolteadas = [];
  parejasEncontradas = 0;
  bloqueado = false;
  intentosNivel = 0;
  intentosTotales = 0;
  nivelActual = 1;

  document.getElementById('intentos').textContent = 0;
  document.getElementById('parejas').textContent = 0;
  document.getElementById('nivel-actual').textContent = nivelActual;
  document.getElementById('overlay-victoria').classList.remove('visible');
  document.getElementById('overlay-nivel').classList.remove('visible');
  document.getElementById('tablero').innerHTML = '<p id="msg-cargando">Cargando frutas... 🍓</p>';

  await cargarNivel(nivelActual);
}

// ── cargarNivel ──
async function cargarNivel(nivel) {
  cartasVolteadas = [];
  parejasEncontradas = 0;
  bloqueado = false;
  intentosNivel = 0;
  

  document.getElementById('intentos').textContent = 0;
  document.getElementById('parejas').textContent = 0;
  document.getElementById('nivel-actual').textContent = nivel;
  document.getElementById('tablero').innerHTML = '<p id="msg-cargando">Cargando frutas... 🍓</p>';

  try {
    const respuesta = await axios.get(`api.php?nivel=${nivel}`);
    totalParejasNivel = respuesta.data.totalParejas;

    // ── Columnas según el nivel ──
    const columnas = nivel === 3 ? 5 : 4;
    document.getElementById('tablero').style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;

    renderizarCartas(respuesta.data.frutas);
  } catch (error) {
    document.getElementById('tablero').innerHTML = '<p>Error cargando las frutas 😢</p>';
    console.error(error);
  }
}

// ── 3. Renderizar cartas en el tablero ──
function renderizarCartas(frutas) {
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';

  frutas.forEach((fruta, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.fruta = fruta;
    carta.dataset.index = index;

    carta.innerHTML = `
      <div class="carta-inner">
        <div class="cara-atras">❓</div>
        <div class="cara-frente">${fruta}</div>
      </div>
    `;

    carta.addEventListener('click', manejarClick);
    tablero.appendChild(carta);
  });
}

// ── 4. Manejar click en una carta ──
function manejarClick() {
  if (bloqueado) return;
  if (this.classList.contains('volteada')) return;
  if (cartasVolteadas.length === 2) return;

  this.classList.add('volteada');
  cartasVolteadas.push(this);

  if (cartasVolteadas.length === 2) {
    intentosNivel++;  // ← ¿tienes este?
    document.getElementById('intentos').textContent = intentosNivel;
    verificarPareja();
  }
}

// ── 5. Verificar si las dos cartas son pareja ──
// ── verificarPareja ──
function verificarPareja() {
  const [carta1, carta2] = cartasVolteadas;
  const esPareja = carta1.dataset.fruta === carta2.dataset.fruta;

  if (esPareja) {
    carta1.removeEventListener('click', manejarClick);
    carta2.removeEventListener('click', manejarClick);
    parejasEncontradas++;
    document.getElementById('parejas').textContent = parejasEncontradas;
    cartasVolteadas = [];

    if (parejasEncontradas === totalParejasNivel) {
      if (nivelActual < TOTAL_NIVELES) {
        mostrarNivelSuperado();
      } else {
        mostrarVictoria();
      }
    }

  } else {
    bloqueado = true;
    setTimeout(() => {
      carta1.classList.remove('volteada');
      carta2.classList.remove('volteada');
      cartasVolteadas = [];
      bloqueado = false;
    }, 1000);
  }
}

// ── mostrarNivelSuperado ──
function mostrarNivelSuperado() {
  intentosTotales += intentosNivel;

  document.getElementById('intentos-nivel-superado').textContent = intentosNivel;
  document.getElementById('nivel-superado-numero').textContent = nivelActual;
  document.getElementById('overlay-nivel').classList.add('visible');
}

// ── mostrarVictoria ──
function mostrarVictoria() {
  intentosTotales += intentosNivel;

  document.getElementById('intentos-finales').textContent = intentosTotales;
  document.getElementById('overlay-victoria').classList.add('visible');
}

// ── siguienteNivel ──
function siguienteNivel() {
  nivelActual++;
  document.getElementById('overlay-nivel').classList.remove('visible');
  cargarNivel(nivelActual);
}

// ── Eventos ──
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJuego);
document.getElementById('btn-jugar-de-nuevo').addEventListener('click', iniciarJuego);
document.getElementById('btn-siguiente-nivel').addEventListener('click', siguienteNivel);

// ── Arrancar ──
iniciarJuego();