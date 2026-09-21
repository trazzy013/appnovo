# 🚀 GUIA RÁPIDO - Rodar Backend AppDivas

## 📦 O que foi preparado?

✅ **backend/config.php** - Configuração do banco (criada)
✅ **backend/setup.php** - Script para criar banco e tabelas (criado)  
✅ **SETUP_API.md** - Guia detalhado (criado)
✅ **setup.bat** - Script automático de setup (criado)
✅ **run-api.bat** - Script para rodar servidor (criado)
✅ **run-api.ps1** - Script PowerShell (criado)
✅ **find-php.ps1** - Script para encontrar PHP (criado)

---

## ⚡ OPÇÃO 1: Usar Scripts Automáticos (Recomendado)

### Passo 1: Ter XAMPP instalado
Se NÃO tem XAMPP:
1. Baixe: **https://www.apachefriends.org/download.html**
2. Instale em: `C:\xampp` (local padrão)
3. Abra **XAMPP Control Panel**
4. Clique **Start** em **Apache** e **MySQL**

### Passo 2: Executar Setup (uma vez)
```bash
# Na pasta raiz do projeto (onde está setup.bat)
setup.bat
```

Se não funcionar, abra PowerShell e execute:
```bash
.\find-php.ps1
```
Isso encontra onde PHP está e mostra o caminho.

### Passo 3: Iniciar Servidor API
```bash
# Na pasta raiz do projeto
run-api.bat
```

**Sucesso!** API rodando em: `http://localhost:8000`

---

## ⚡ OPÇÃO 2: Usando PowerShell (Mais Detalhado)

### Passo 1: Encontrar PHP
```powershell
.\find-php.ps1
```
Anote o caminho do PHP encontrado.

### Passo 2: Setup Manual
```powershell
cd backend
php setup.php
```

### Passo 3: Iniciar API
```powershell
.\run-api.ps1
```

---

## ⚡ OPÇÃO 3: Fazer Tudo Manualmente

### Passo 1: Criar Banco de Dados
```bash
# Encontre o PHP (geralmente em C:\xampp\php\php.exe)
C:\xampp\php\php.exe backend/setup.php
```

### Passo 2: Iniciar Servidor
```bash
C:\xampp\php\php.exe -S localhost:8000 -t backend
```

---

## ✅ Testar se Funcionou

### Teste 1: Health Check
```bash
curl http://localhost:8000/health.php
```

### Teste 2: Criar Conta
```bash
curl -X POST http://localhost:8000/register.php ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"Teste\",\"email\":\"teste@teste.com\",\"senha\":\"123456\"}"
```

### Teste 3: Fazer Login
```bash
curl -X POST http://localhost:8000/login.php ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"teste@teste.com\",\"senha\":\"123456\"}"
```

---

## 🔗 Endpoints da API

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/register.php` | Criar conta |
| POST | `/login.php` | Fazer login |
| GET | `/health.php` | Verificar saúde da API |

### Body para /register.php:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "tipo_pele": "Oleosa"
}
```

### Body para /login.php:
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

---

## ❓ Problemas Comuns

### "PHP não encontrado"
→ Execute: `.\find-php.ps1`
→ Resultado mostrará onde PHP está
→ Edite `run-api.bat` ou `run-api.ps1` com o caminho correto

### "MySQL não conecta"
→ Verifique se MySQL está rodando:
   - XAMPP Control Panel → Start MySQL
→ Se usar credenciais diferentes, edite `backend/config.php`
→ Padrão: usuário=`root`, senha=`` (vazia)

### "Porta 8000 em uso"
→ Use outra porta:
```bash
php -S localhost:8001
```

### Setup não cria banco
→ Execute manualmente:
```bash
cd backend
C:\xampp\php\php.exe setup.php
```
→ Veja o erro exato na tela

---

## 📱 Conectar App Mobile (React Native/Expo)

No seu código do app, use:

```typescript
// contexts/AuthContext.tsx
export const API_BASE_URL = 'http://localhost:8000'; // ou seu IP

// Registrar
const register = async (nome: string, email: string, senha: string) => {
  const response = await fetch(`${API_BASE_URL}/register.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  });
  const data = await response.json();
  if (data.token) {
    // Salvar token
    await AsyncStorage.setItem('token', data.token);
  }
  return data;
};

// Login
const login = async (email: string, senha: string) => {
  const response = await fetch(`${API_BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const data = await response.json();
  if (data.token) {
    await AsyncStorage.setItem('token', data.token);
  }
  return data;
};
```

---

## 📚 Próximos Passos

1. **Endpoints para Perfil** (próximo)
   - GET `/perfil.php` - Ver dados do usuário
   - PUT `/perfil.php` - Atualizar perfil
   - POST `/perfil-foto.php` - Fazer upload de foto

2. **Endpoints de Produtos** (próximo)
   - GET `/produtos.php` - Listar produtos
   - GET `/produtos/[id].php` - Detalhe do produto
   - POST `/carrinho.php` - Adicionar ao carrinho

3. **Melhorias**
   - Autenticação por bearer token
   - Validação de permissões
   - Cache de dados
   - Tratamento de erros melhorado

---

## 🎯 Checklist

- [ ] XAMPP instalado e MySQL rodando
- [ ] `backend/config.php` criado ✅
- [ ] `backend/setup.php` executado
- [ ] Banco de dados criado
- [ ] Servidor PHP rodando em `localhost:8000`
- [ ] Health check funciona
- [ ] Registro de conta funciona
- [ ] Login funciona

---

**Pronto? Comece com: `setup.bat` (se usar XAMPP)**

Boa sorte! 🚀
