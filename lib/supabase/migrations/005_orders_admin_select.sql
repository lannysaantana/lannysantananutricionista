-- ============================================================================
-- Lanny Santana Nutricionista — corrige a falta de permissão de leitura em
-- `orders` para o painel admin.
--
-- Migração 003 adicionou SELECT para "authenticated" em service_plans,
-- payment_settings, order_sessions e pre_consultation_forms, mas por
-- descuido nunca adicionou o equivalente em `orders` — só INSERT (anon),
-- UPDATE e DELETE (authenticated). Resultado: o painel admin não conseguia
-- listar nenhum pedido, mesmo eles existindo no banco.
-- ============================================================================

create policy "authenticated can read orders"
  on orders for select
  to authenticated
  using (true);
