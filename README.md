# Divas — rotina de beleza personalizada

Aplicativo mobile criado com Expo/React Native para ajudar cada pessoa a encontrar cosméticos e cuidados adequados ao seu tipo de pele. O projeto agora inclui uma jornada de conta (login, cadastro, perfil e configurações) e uma API PHP com MySQL.

## O que foi criado

- Tela de login com validação e retorno de erro claro.
- Cadastro com nome, e-mail, senha e tipo de pele.
- Perfil da pessoa usuária, diagnóstico de pele e saída da conta.
- Configurações mais completas, com acesso à conta, notificações e tema escuro.
- Tela **Sobre o Divas**, acessível pelo menu e pelas configurações.
- API PHP de cadastro e login com senhas protegidas usando `password_hash`.
- Banco MySQL com e-mail único, evitando contas duplicadas.

## Como executar o aplicativo

1. Instale o Node.js e abra esta pasta no terminal.
2. Instale as dependências: `npm install`.
3. Copie `.env.example` para um arquivo chamado `.env` e ajuste a URL para o local onde a API PHP estará disponível.
4. Inicie o app com `npm start` e abra pelo Expo Go ou emulador.

### URL da API

No arquivo `.env`, use uma destas opções:

```env
# Emulador Android com XAMPP instalado no mesmo computador
EXPO_PUBLIC_API_URL=http://10.0.2.2/divas-api

# Dispositivo físico: use o IP local do seu computador
# EXPO_PUBLIC_API_URL=http://192.168.0.10/divas-api
```

Não use `localhost` no celular: nele, `localhost` significa o próprio celular, não seu computador.

## Como preparar o PHP e o banco

1. Instale o XAMPP com **PHP 8.0 ou superior**, depois inicie **Apache** e **MySQL**. A API verifica a versão do PHP e informa se ela for incompatível.
2. Copie a pasta `backend` para a pasta pública do Apache. No XAMPP normalmente ela fica em `C:\xampp\htdocs\divas-api`.
3. Abra o phpMyAdmin (`http://localhost/phpmyadmin`), escolha **Importar** e selecione `backend/database.sql`.
4. Copie `backend/config.example.php` como `backend/config.php` e informe seu usuário e senha do MySQL. No XAMPP padrão, normalmente o usuário é `root` e a senha fica vazia.
5. Troque `TOKEN_SECRET` por uma frase secreta longa antes de publicar o projeto.
6. Ajuste `EXPO_PUBLIC_API_URL` como explicado acima e reinicie o Expo.

Para testar a API, abra `http://localhost/divas-api/health.php` no navegador. A resposta deve informar que a API e o banco estão funcionando e exibir a versão do PHP.

## Como o login funciona

1. A tela envia nome/e-mail/senha para `register.php` ou e-mail/senha para `login.php`.
2. A API verifica os dados. Ela nunca guarda a senha em texto: o PHP gera um hash seguro.
3. Se os dados estiverem corretos, a API devolve o perfil e um token de acesso para o app.
4. O app mostra o perfil e usa o tipo de pele informado para personalizar a experiência.

## Estrutura importante

```text
app/login.tsx                    tela de login
app/cadastro.tsx                 criação de conta
app/perfil.tsx                   perfil da pessoa usuária
app/src/context/AuthContext.tsx  comunicação com a API e estado do login
backend/register.php             cadastro seguro no PHP
backend/login.php                autenticação no PHP
backend/database.sql             estrutura do MySQL
```

## Próximos passos recomendados

Para publicar de verdade, a próxima melhoria é guardar o token de forma persistente e segura no aparelho e criar endpoints autenticados para editar perfil, favoritos e resultados do quiz. Mantenha `backend/config.php` fora do Git: ele contém as credenciais do banco.
