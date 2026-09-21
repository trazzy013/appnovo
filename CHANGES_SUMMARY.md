# 📋 Resumo das Alterações - Setup API AppDivas

## ✅ Arquivos Criados

### Backend
1. **`backend/config.php`** ✨ NOVO
   - Configuração do banco de dados
   - Credenciais: `root` (sem senha)
   - Banco: `divas`
   - Porta: `3306` (padrão MySQL)

2. **`backend/setup.php`** ✨ NOVO
   - Script de inicialização do banco de dados
   - Cria banco `divas`
   - Cria tabelas: `usuarios` e `perfis`
   - Execute com: `php backend/setup.php`

### Na Raiz do Projeto
3. **`SETUP_API.md`** ✨ NOVO
   - Guia completo de configuração
   - Instruções passo-a-passo
   - Exemplos de requisições (curl)
   - Troubleshooting

4. **`setup.bat`** ✨ NOVO
   - Script de setup automatizado (Windows)
   - Verifica PHP e MySQL
   - Execute: `setup.bat`

5. **`run-api.bat`** ✨ NOVO
   - Inicia servidor PHP (Windows)
   - Execute: `run-api.bat`
   - Servidor roda em: `http://localhost:8000`

6. **`run-api.ps1`** ✨ NOVO
   - Inicia servidor PHP (PowerShell)
   - Execute: `.\run-api.ps1`
   - Mais flexível que .bat

---

## 🚀 Como Usar (Rápido)

### 1️⃣ Instalar Dependências (Primeira Vez)
Se ainda não tem XAMPP:
- Baixe: https://www.apachefriends.org/
- Instale no local padrão
- Inicie XAMPP Control Panel e ligue MySQL

### 2️⃣ Configurar Banco de Dados (Primeira Vez)
**Opção A - Automático (recomendado):**
```bash
# Windows CMD
setup.bat

# PowerShell
.\setup.bat
```

**Opção B - Manual:**
```bash
cd backend
php setup.php
```

### 3️⃣ Iniciar Servidor API
**Opção A - Script (recomendado):**
```bash
# Windows
run-api.bat

# PowerShell
.\run-api.ps1
```

**Opção B - Manual:**
```bash
cd backend
php -S localhost:8000
```

### 4️⃣ Testar a API
```bash
# Verificar saúde
curl http://localhost:8000/health.php

# Criar conta
curl -X POST http://localhost:8000/register.php \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@test.com","senha":"123456"}'

# Fazer login
curl -X POST http://localhost:8000/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@test.com","senha":"123456"}'
```

---

## 📱 Conectar App Mobile

Em seus arquivos React/Expo, use:

```typescript
const API_BASE_URL = 'http://localhost:8000'; // ou seu IP da máquina

// Registro
fetch(`${API_BASE_URL}/register.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@example.com',
    senha: 'senha123',
    tipo_pele: 'Oleosa'
  })
})

// Login
fetch(`${API_BASE_URL}/login.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'joao@example.com',
    senha: 'senha123'
  })
})
```

---

## 🗄️ Banco de Dados

### Tabela: usuarios
```sql
id           INT (auto-incremento)
nome         VARCHAR(100)
email        VARCHAR(190) UNIQUE
senha_hash   VARCHAR(255)
tipo_pele    ENUM ('Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível')
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

### Tabela: perfis (extensível para dados de perfil)
```sql
id              INT (auto-incremento)
usuario_id      INT (chave estrangeira)
foto_url        VARCHAR(500)
bio             TEXT
telefone        VARCHAR(20)
data_nascimento DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## 🔐 Segurança

Padrões atuais (desenvolvimento):
- ✅ Senhas com `password_hash()`
- ✅ Validação de email
- ✅ Proteção contra SQL injection (prepared statements)
- ✅ CORS habilitado
- ⚠️ Token JWT básico (melhorar em produção)

**Para Produção:**
1. Mude `TOKEN_SECRET` em `config.php`
2. Altere credenciais MySQL
3. Use HTTPS
4. Implemente rate limiting
5. Adicione autenticação header para endpoints protegidos

---

## ❓ Se Algo Não Funcionar

### PHP não encontrado
- Instale XAMPP (Opção mais fácil)
- Ou edite `run-api.bat/.ps1` com caminho correto do PHP

### MySQL não conecta
- Verifique se MySQL está rodando
- XAMPP: abra Control Panel e clique "Start" em MySQL
- Edite `config.php` se credenciais são diferentes

### Porta 8000 já em uso
- Execute: `php -S localhost:8001` (use 8001 ou outra porta)

### Veja a documentação completa
- Abra `SETUP_API.md` no seu editor

---

## 📚 Estrutura Final do Backend

```
backend/
├── bootstrap.php        # Funções: db(), respond(), body()
├── config.php          # Credenciais MySQL ✨ NOVO
├── setup.php           # Script setup ✨ NOVO
├── database.sql        # Schema SQL
├── register.php        # POST /register.php
├── login.php           # POST /login.php
├── health.php          # GET /health.php
└── .htaccess           # Apache rewrites
```

---

## ✨ Próximos Passos Opcionais

1. **Endpoints adicionais:**
   - GET `/perfil.php` - Ver perfil
   - PUT `/perfil.php` - Atualizar perfil
   - POST `/logout.php` - Logout (limpar token)

2. **Melhorias:**
   - Autenticação por header `Authorization: Bearer TOKEN`
   - Middleware de autenticação
   - Rate limiting
   - Logs de erro

3. **Integração:**
   - Conectar contexto React com API
   - Salvar token no AsyncStorage
   - Interceptar requisições com token

---

**Tudo pronto! 🎉**

Qualquer dúvida, veja `SETUP_API.md` ou verifique os erros no console.
