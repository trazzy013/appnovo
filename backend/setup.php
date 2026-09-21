<?php
/**
 * Script de Setup - Cria banco de dados e tabelas
 * Execute: php setup.php
 */

declare(strict_types=1);

// Configurações
const DB_HOST = 'localhost';
const DB_NAME = 'divas';
const DB_USER = 'root';
const DB_PASS = '';
const DB_PORT = 3306;

echo "🔧 Iniciando setup do banco de dados...\n";
echo "================================================\n\n";

try {
    // Conectar sem especificar o banco para criar
    echo "📡 Conectando ao MySQL...\n";
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ':' . DB_PORT . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    echo "✅ Conectado ao MySQL com sucesso!\n\n";

    // Criar banco de dados
    echo "📦 Criando banco de dados 'divas'...\n";
    $pdo->exec('CREATE DATABASE IF NOT EXISTS ' . DB_NAME . ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    echo "✅ Banco de dados criado!\n\n";

    // Selecionar banco
    $pdo->exec('USE ' . DB_NAME);

    // Criar tabela usuarios
    echo "📋 Criando tabela 'usuarios'...\n";
    $pdo->exec('
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(190) NOT NULL UNIQUE,
            senha_hash VARCHAR(255) NOT NULL,
            tipo_pele ENUM("Normal", "Seca", "Oleosa", "Mista", "Sensível") NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ');
    echo "✅ Tabela 'usuarios' criada!\n\n";

    // Criar tabela de perfil (opcional)
    echo "📋 Criando tabela 'perfis'...\n";
    $pdo->exec('
        CREATE TABLE IF NOT EXISTS perfis (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT UNSIGNED NOT NULL UNIQUE,
            foto_url VARCHAR(500),
            bio TEXT,
            telefone VARCHAR(20),
            data_nascimento DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ');
    echo "✅ Tabela 'perfis' criada!\n\n";

    echo "================================================\n";
    echo "✅ Setup concluído com sucesso!\n";
    echo "================================================\n\n";
    echo "📝 Resumo:\n";
    echo "  • Banco: " . DB_NAME . "\n";
    echo "  • Host: " . DB_HOST . "\n";
    echo "  • Usuário: " . DB_USER . "\n";
    echo "  • Tabelas: usuarios, perfis\n\n";
    echo "Agora você pode iniciar o servidor PHP:\n";
    echo "  php -S localhost:8000\n\n";

} catch (PDOException $e) {
    echo "❌ ERRO ao conectar ao MySQL:\n";
    echo "   " . $e->getMessage() . "\n\n";
    echo "Verifique se:\n";
    echo "  1. MySQL está rodando\n";
    echo "  2. Usuário: " . DB_USER . "\n";
    echo "  3. Porta: " . DB_PORT . "\n";
    echo "  4. Edite config.php se necessário\n";
    exit(1);
} catch (Exception $e) {
    echo "❌ ERRO:\n";
    echo "   " . $e->getMessage() . "\n";
    exit(1);
}
?>
