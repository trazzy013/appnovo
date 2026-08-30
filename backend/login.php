<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['success' => false, 'message' => 'Método não permitido.'], 405);
$input = body();
$email = filter_var(trim((string) ($input['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$senha = (string) ($input['senha'] ?? '');
if (!$email || $senha === '') respond(['success' => false, 'message' => 'Informe e-mail e senha.'], 422);

try {
    $query = db()->prepare('SELECT id, nome, email, senha_hash, tipo_pele FROM usuarios WHERE email = ? LIMIT 1');
    $query->execute([$email]);
    $user = $query->fetch();
    if (!$user || !password_verify($senha, $user['senha_hash'])) respond(['success' => false, 'message' => 'E-mail ou senha incorretos.'], 401);

    respond(['success' => true, 'message' => 'Login realizado.', 'user' => userPayload($user), 'token' => createToken((int) $user['id'])]);
} catch (Throwable $exception) {
    serverError();
}
