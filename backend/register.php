<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['success' => false, 'message' => 'Método não permitido.'], 405);
$input = body();
$nome = trim((string) ($input['nome'] ?? ''));
$email = filter_var(trim((string) ($input['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$senha = (string) ($input['senha'] ?? '');
$tipoPele = trim((string) ($input['tipo_pele'] ?? ''));

if (strlen($nome) < 2 || !$email || strlen($senha) < 6) respond(['success' => false, 'message' => 'Informe nome, e-mail válido e senha de no mínimo 6 caracteres.'], 422);
if (!in_array($tipoPele, ['Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível'], true)) $tipoPele = null;

try {
    $pdo = db();
    $check = $pdo->prepare('SELECT id FROM usuarios WHERE email = ? LIMIT 1');
    $check->execute([$email]);
    if ($check->fetch()) respond(['success' => false, 'message' => 'Este e-mail já possui uma conta.'], 409);

    $insert = $pdo->prepare('INSERT INTO usuarios (nome, email, senha_hash, tipo_pele) VALUES (?, ?, ?, ?)');
    $insert->execute([$nome, $email, password_hash($senha, PASSWORD_DEFAULT), $tipoPele]);
    $id = (int) $pdo->lastInsertId();
    $user = ['id' => $id, 'nome' => $nome, 'email' => $email, 'tipo_pele' => $tipoPele];
    respond(['success' => true, 'message' => 'Conta criada com sucesso.', 'user' => userPayload($user), 'token' => createToken($id)], 201);
} catch (PDOException $exception) {
    // O índice UNIQUE também cobre duas requisições simultâneas para o mesmo e-mail.
    if ($exception->getCode() === '23000') {
        respond(['success' => false, 'message' => 'Este e-mail já possui uma conta.'], 409);
    }
    serverError();
} catch (Throwable $exception) {
    serverError();
}
