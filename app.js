// ── Variables globales ──
let cartasVolteadas = [];
let parejasEncontradas = 0;
let bloqueado = false;

let intentosNivel = 0;
let intentosTotales = 0;

let nivelActual = 1;
const TOTAL_NIVELES = 20;

let totalParejasNivel = 0;

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
  document.getElementById('tablero').innerHTML = '<p id="msg-cargando">Cargando... 🚗</p>';

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
  document.getElementById('tablero').innerHTML = '<p id="msg-cargando">Cargando... 🚗</p>';

  try {
    const respuesta = await axios.get(
      `api.php?nivel=${nivel}&categoria=${CONFIG.categoria}&prefijo=${CONFIG.prefijo}&extension=${CONFIG.extension}&total=${CONFIG.total}`
    );

    totalParejasNivel = respuesta.data.totalParejas;

    // ── Columnas exactas por nivel ──
    const columnasPorNivel = {
      1:4,  2:4,  3:4,  4:4,  5:4,
      6:6,  7:6,  8:6,  9:6,  10:6,
      11:8, 12:8, 13:8, 14:8, 15:8,
      16:9, 17:9, 18:10, 19:10, 20:10
    };

    const columnas = columnasPorNivel[nivel] || 4;

    const tablero = document.getElementById('tablero');
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    tablero.classList.remove('cols-4','cols-5','cols-6','cols-7','cols-8','cols-9','cols-10');
    tablero.classList.add(`cols-${columnas}`);

    renderizarCartas(respuesta.data.imagenes);
  } catch (error) {
    document.getElementById('tablero').innerHTML = '<p>Error cargando las imágenes 😢</p>';
    console.error(error);
  }
}

// ── renderizarCartas ──
function renderizarCartas(imagenes) {
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';

  imagenes.forEach((imagen, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.fruta = imagen;
    carta.dataset.index = index;

    carta.innerHTML = `
      <div class="carta-inner">
        <div class="cara-atras">🚗</div>
        <div class="cara-frente">
          <img src="${imagen}" alt="carta" />
        </div>
      </div>
    `;

    carta.addEventListener('click', manejarClick);
    tablero.appendChild(carta);
  });
}

// ── manejarClick ──
function manejarClick() {
  if (bloqueado) return;
  if (this.classList.contains('volteada')) return;
  if (cartasVolteadas.length === 2) return;

  this.classList.add('volteada');
  cartasVolteadas.push(this);

  if (cartasVolteadas.length === 2) {
    intentosNivel++;
    document.getElementById('intentos').textContent = intentosNivel;
    verificarPareja();
  }
}

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
//document.getElementById('btn-saltar-nivel').addEventListener('click', siguienteNivel);

// ── Arrancar ──
iniciarJuego();

