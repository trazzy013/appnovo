<?php
declare(strict_types=1);

if (PHP_VERSION_ID < 80000) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Esta API requer PHP 8.0 ou superior.']);
    exit;
}

if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Configure o arquivo backend/config.php antes de usar a API.']);
    exit;
}

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Restrinja ao domínio do app quando publicar.
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

// "never" só existe a partir do PHP 8.1. Usamos void para compatibilidade com PHP 8.0.
function respond(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function body(): array {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        respond(['success' => false, 'message' => 'JSON inválido.'], 400);
    }
    return $data;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

function serverError(): void {
    respond(['success' => false, 'message' => 'Ocorreu um erro no servidor. Tente novamente mais tarde.'], 500);
}

function userPayload(array $user): array {
    return ['id' => (int) $user['id'], 'nome' => $user['nome'], 'email' => $user['email'], 'tipo_pele' => $user['tipo_pele']];
}

function createToken(int $userId): string {
    $expires = time() + 60 * 60 * 24 * 30;
    $payload = base64_encode(json_encode(['id' => $userId, 'exp' => $expires]));
    $signature = hash_hmac('sha256', $payload, TOKEN_SECRET);
    return $payload . '.' . $signature;
}
