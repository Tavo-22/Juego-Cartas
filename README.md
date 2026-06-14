# 🚗 Juego de Cartas - Memory Match

Juego de memoria desarrollado con PHP, JavaScript, Axios y CSS. El objetivo es formar parejas de cartas iguales a través de 20 niveles de dificultad progresiva.

## 📋 Descripción

El juego consiste en un clásico juego de memoria donde el jugador debe encontrar y emparejar cartas iguales. A medida que avanza, la dificultad aumenta con más cartas en cada nivel. Las imágenes son completamente personalizables, permitiendo cambiar la temática del juego fácilmente.

## 🛠️ Tecnologías utilizadas

- PHP: Backend para servir la aplicación y manejar la lógica del servidor
- JavaScript: Control de la interacción del usuario y la lógica del juego en el cliente
- Axios: Para realizar llamadas asíncronas al servidor sin recargar la página
- CSS: Estilos visuales para una experiencia de usuario atractiva y responsiva

## ✨ Características principales

- 20 niveles con dificultad creciente
- Imágenes personalizables por temática
- Interfaz interactiva y dinámica
- Contador de intentos por nivel e intentos totales
- Pantalla de nivel superado entre cada nivel
- Diseño responsivo para escritorio y móvil horizontal
- Aviso de rotación en móvil vertical

## 📁 Estructura del proyecto

proyecto/
  imagenes/
    carros/
      carro1.png
      ...
      carro40.png
  index.html
  style.css
  app.js
  api.php
  config.js
  README.md

## 🎮 Instalación y ejecución

1. Clona este repositorio en tu servidor local o remoto
2. Asegúrate de tener PHP instalado
3. Abre la terminal en la carpeta del proyecto y ejecuta:

php -S localhost:3000

4. Abre http://localhost:3000/index.html en tu navegador
5. Disfruta del juego

## 🔧 Cómo cambiar la temática

Solo edita config.js:

const CONFIG = {
  categoria: 'banderas',
  ruta: 'imagenes/banderas/',
  extension: 'png',
  prefijo: 'bandera',
  total: 40
};

Y crea la carpeta con las imágenes siguiendo el formato:

imagenes/
  banderas/
    bandera1.png
    bandera2.png
    ...
    bandera40.png

## 📊 Niveles del juego

Nivel 1  - 8  cartas - 4  parejas - 4  columnas
Nivel 2  - 12 cartas - 6  parejas - 4  columnas
Nivel 3  - 16 cartas - 8  parejas - 4  columnas
Nivel 4  - 20 cartas - 10 parejas - 4  columnas
Nivel 5  - 24 cartas - 12 parejas - 4  columnas
Nivel 6  - 24 cartas - 12 parejas - 6  columnas
Nivel 7  - 30 cartas - 15 parejas - 6  columnas
Nivel 8  - 36 cartas - 18 parejas - 6  columnas
Nivel 9  - 42 cartas - 21 parejas - 6  columnas
Nivel 10 - 48 cartas - 24 parejas - 6  columnas
Nivel 11 - 48 cartas - 24 parejas - 8  columnas
Nivel 12 - 56 cartas - 28 parejas - 8  columnas
Nivel 13 - 56 cartas - 28 parejas - 8  columnas
Nivel 14 - 64 cartas - 32 parejas - 8  columnas
Nivel 15 - 72 cartas - 36 parejas - 8  columnas
Nivel 16 - 72 cartas - 36 parejas - 9  columnas
Nivel 17 - 72 cartas - 36 parejas - 9  columnas
Nivel 18 - 80 cartas - 40 parejas - 10 columnas
Nivel 19 - 80 cartas - 40 parejas - 10 columnas
Nivel 20 - 80 cartas - 40 parejas - 10 columnas

## 📱 Responsive

- Escritorio: funciona en cualquier tamaño de pantalla
- Móvil horizontal: funciona correctamente
- Móvil vertical: muestra mensaje para girar el dispositivo

## 🌿 Ramas del repositorio

- v1-frutas: versión original con emojis de frutas y 3 niveles
- v2-carros: versión actual con imágenes PNG y 20 niveles
