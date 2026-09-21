# 🚀 Guia de Setup - API AppDivas

## ✅ Pré-requisitos

Você precisa ter instalado:
- **PHP 8.0+** (com PDO MySQL habilitado)
- **MySQL 5.7+** ou **MariaDB**

### Se você não tem XAMPP/WAMP:

#### Opção 1: Instalar XAMPP (Recomendado)
1. Baixe em: https://www.apachefriends.org/download.html
2. Instale no local padrão (C:\xampp)
3. Inicie o XAMPP Control Panel
4. Clique em "Start" para Apache e MySQL

#### Opção 2: Docker (Se preferir)
```bash
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8.0
```

---

## 🔧 Configuração (Passo a Passo)

### Passo 1: Verificar conexão MySQL
Certifique-se de que o MySQL está rodando. Se usar XAMPP, abra o painel de controle e clique em "Start".

### Passo 2: Executar o Setup
Se tiver PHP no PATH:
```bash
cd backend
php setup.php
```

**Se PHP não estiver no PATH:**
- No XAMPP: `C:\xampp\php\php.exe backend\setup.php`
- Ou acesse: `http://localhost/seu-projeto/backend/setup.php` via navegador

### Passo 3: Verificar o Setup
Se vir ✅ Setup concluído com sucesso! - Perfeito!

Se receber erro ❌, verifique:
1. MySQL está rodando?
2. Credenciais em `config.php` estão corretas?
3. Porta 3306 está aberta?

---

## 🌐 Iniciar o Servidor API

### Opção 1: PHP Built-in Server (Desenvolvimento)
```bash
cd backend
php -S localhost:8000
```

A API estará em: `http://localhost:8000`

**Para todas as requisições**, adicione o endpoint correto:
- POST `http://localhost:8000/register.php` - Criar conta
- POST `http://localhost:8000/login.php` - Login
- GET `http://localhost:8000/health.php` - Verificar saúde da API

### Opção 2: XAMPP (Produção Local)
1. Copie a pasta `backend` para: `C:\xampp\htdocs\appdivas\backend`
2. Acesse: `http://localhost/appdivas/backend/register.php`

### Opção 3: IIS (Windows)
Configure no IIS local ou use XAMPP (mais fácil).

---

## 📱 Testar a API

### Criar Conta
```bash
curl -X POST http://localhost:8000/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123",
    "tipo_pele": "Oleosa"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Conta criada com sucesso.",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo_pele": "Oleosa"
  },
  "token": "eyJ..."
}
```

### Fazer Login
```bash
curl -X POST http://localhost:8000/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

### Verificar Saúde da API
```bash
curl http://localhost:8000/health.php
```

---

## 🐛 Troubleshooting

### "Configure o arquivo backend/config.php"
- Execute: `php setup.php` na pasta backend

### "SQLSTATE[HY000]: General error: 1030 Got error"
- Verifique se MySQL está rodando
- Reinicie o MySQL

### "SQLSTATE[HY000]: [28000] Access denied for user"
- Edite `config.php` com credenciais corretas
- Padrão: `root` / `(vazio)`

### "Porta 8000 já está em uso"
```bash
php -S localhost:8001
```

---

## 🔗 Conectar o App Mobile

No seu arquivo React Native, configure a URL da API:

```typescript
const API_URL = 'http://localhost:8000'; // ou seu IP

// Para registro
const response = await fetch(`${API_URL}/register.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, email, senha, tipo_pele })
});

// Para login
const response = await fetch(`${API_URL}/login.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, senha })
});
```

---

## 📚 Estrutura do Backend

```
backend/
├── bootstrap.php       # Funções auxiliares (db(), respond(), etc)
├── config.php         # Configurações (criado automaticamente)
├── register.php       # Endpoint de registro
├── login.php          # Endpoint de login
├── health.php         # Health check
├── setup.php          # Script de inicialização (use uma vez)
├── database.sql       # Schema SQL
└── .htaccess         # Rewrite rules (se usar Apache)
```

---

## ⚠️ Segurança (Importante!)

**Em produção:**
1. Mude `TOKEN_SECRET` em `config.php`
2. Mude credenciais do MySQL
3. Implemente CORS adequadamente
4. Use HTTPS
5. Adicione validação mais rigorosa
6. Implemente rate limiting

---

## ❓ Dúvidas?

Se a API não responder:
1. Verifique console do PHP (erros?)
2. Verifique se a porta 8000 está aberta
3. Verifique se `http://localhost:8000/health.php` responde
4. Confira as credenciais em `config.php`

Qualquer erro, abra as Developer Tools (F12) e veja o erro exato!

---

**Bom desenvolvimento! 🚀**
