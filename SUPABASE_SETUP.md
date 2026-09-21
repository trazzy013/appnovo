# Checklist de publicação Supabase

1. Crie o projeto Supabase e aguarde o banco ficar disponível.
2. Execute [a migração SQL](supabase/migrations/20260920_initial_schema.sql) no SQL Editor.
3. Confirme em **Database > Tables** as tabelas `profiles`, `cart_items` e `quiz_results`.
4. Confirme em **Authentication > Policies** que RLS está ativo nas três tabelas e que cada tabela tem sua política privada.
5. Copie `.env.example` para `.env` e insira Project URL + Publishable key. Não use a chave `service_role`.
6. Reinicie o Expo e crie duas contas de teste. Adicione itens e complete o quiz em cada uma: os dados devem permanecer separados.
7. Para produção, em **Authentication > URL Configuration**, inclua o domínio do site hospedado em Site URL e Redirect URLs. Configure SMTP antes de liberar o app para usuários finais.

Após a etapa 5, Apache, MySQL, XAMPP e o IP do computador não são necessários para o aplicativo.
