<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ── 1. Recibir el nivel ──
$nivel = isset($_GET['nivel']) ? (int)$_GET['nivel'] : 1;

// ── 2. Recibir la configuración desde el frontend ──
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'carros';
$prefijo   = isset($_GET['prefijo'])   ? $_GET['prefijo']   : 'carro';
$extension = isset($_GET['extension']) ? $_GET['extension'] : 'png';
$total     = isset($_GET['total'])     ? (int)$_GET['total'] : 40;

// ── 3. Parejas según el nivel ──
$parejasPorNivel = [
  1=>4,  2=>6,  3=>8,  4=>10, 5=>12,
  6=>12, 7=>15, 8=>18, 9=>21, 10=>24,
  11=>24,12=>28,13=>28,14=>32,15=>36,
  16=>36,17=>36,18=>40,19=>40,20=>40
];

$parejas = $parejasPorNivel[$nivel] ?? 4;

// ── 4. Generar imágenes ──
$imagenes = [];
for ($i = 1; $i <= $total; $i++) {
  $imagenes[] = "imagenes/{$categoria}/{$prefijo}{$i}.{$extension}";
}

// ── 5. Tomar solo las necesarias y barajar ──
$imagenesNivel = array_slice($imagenes, 0, $parejas);
$pares = array_merge($imagenesNivel, $imagenesNivel);
shuffle($pares);

// ── 6. Respuesta JSON ──
echo json_encode([
  'imagenes'     => $pares,
  'nivel'        => $nivel,
  'totalParejas' => $parejas
]);