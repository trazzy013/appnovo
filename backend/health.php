<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

try {
    db()->query('SELECT 1');
    respond(['success' => true, 'message' => 'API Divas e banco de dados estão funcionando.', 'php_version' => PHP_VERSION]);
} catch (Throwable $exception) {
    respond(['success' => false, 'message' => 'Não foi possível conectar ao banco. Confira backend/config.php.', 'php_version' => PHP_VERSION], 500);
}
