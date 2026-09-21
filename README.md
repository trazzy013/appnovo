# Divas — banco online com Supabase

O Divas é um aplicativo Expo/React Native. A autenticação e todos os dados mutáveis agora usam **Supabase Auth + PostgreSQL**, então não dependem de XAMPP, PHP, MySQL ou do computador de desenvolvimento.

## O que é persistido online

| Dados | Tabela | Acesso |
| --- | --- | --- |
| Perfil, tipo de pele, tema e notificações | `profiles` | Somente a própria pessoa usuária |
| Produtos adicionados ao carrinho | `cart_items` | Somente a própria pessoa usuária |
| Histórico e resultado do diagnóstico | `quiz_results` | Somente a própria pessoa usuária |

O catálogo em `app/data/products.ts` é conteúdo estático do aplicativo; ele não é dado de usuário e continua no código. O diretório `backend/` contém a antiga API PHP/MySQL apenas como referência e não é usado pelo aplicativo.

## Configurar o Supabase (uma vez)

1. Crie um projeto em [Supabase](https://supabase.com/dashboard).
2. Abra **SQL Editor** e execute o arquivo [20260920_initial_schema.sql](supabase/migrations/20260920_initial_schema.sql).
3. Em **Authentication > Providers > Email**, mantenha o provedor de e-mail habilitado. Para produção, configure confirmação de e-mail e SMTP próprio.
4. Em **Settings > API**, copie apenas o **Project URL** e a **Publishable key**.
5. Copie `.env.example` para `.env` e preencha:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave_publica
```

Esses dois valores podem estar no app: as permissões são protegidas pelas políticas RLS. **Nunca** coloque `service_role`, senha de banco ou qualquer chave secreta em `.env` do Expo, no código ou no Git.

## Executar e publicar

```bash
npm install
npm start
```

Reinicie o Expo sempre que alterar `.env`. A mesma configuração funciona no Expo Go, emulador, web e build publicado — não existe IP local nem serviço para manter ligado.

Para hospedagem web, defina as mesmas variáveis `EXPO_PUBLIC_*` no provedor de build antes de executar o build. Para builds Android/iOS, configure-as no ambiente de build/EAS. O banco e o Auth continuam hospedados no Supabase.

## Segurança

- Senhas são gerenciadas pelo Supabase Auth e nunca passam pelo banco público `profiles`.
- O trigger `handle_new_user` cria o perfil associado ao UUID de `auth.users` no servidor.
- RLS está habilitado nas três tabelas. Toda política compara `auth.uid()` ao dono da linha para leitura e escrita.
- O cliente só usa a Publishable key; privilégios administrativos ficam exclusivamente no painel/servidor do Supabase.

## Validação local

```bash
npx tsc --noEmit
npm run lint
```
