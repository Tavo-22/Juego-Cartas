<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ── 1. Recibir el nivel ──
$nivel = isset($_GET['nivel']) ? (int)$_GET['nivel'] : 1;

// ── 2. Definir cuántas parejas por nivel ──
$parejasPorNivel = [
  1 => 4,   // 8  cartas
  2 => 6,   // 12 cartas
  3 => 10   // 20 cartas
];

$totalParejas = $parejasPorNivel[$nivel] ?? 4;

// ── 3. Todas las frutas disponibles ──
$frutas = [
  '🍎', '🍌', '🍇', '🍊', '🍓',
  '🍍', '🥭', '🍉', '🍑', '🫐'
];

// ── 4. Tomar solo las frutas necesarias ──
$frutasNivel = array_slice($frutas, 0, $totalParejas);

// ── 5. Duplicar y barajar ──
$pares = array_merge($frutasNivel, $frutasNivel);
shuffle($pares);

echo json_encode([
  'frutas' => $pares,
  'nivel'  => $nivel,
  'totalParejas' => $totalParejas
]);