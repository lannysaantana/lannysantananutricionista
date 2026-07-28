-- ============================================================================
-- Lanny Santana Nutricionista — Pivô para teleconsulta-only + formulário
-- de agendamento expandido.
-- Run this in the Supabase SQL editor AFTER 003_orders.sql.
--
-- Aposentadoria do atendimento presencial: os 5 planos antigos são
-- desativados (não deletados — preserva a integridade referencial de
-- pedidos já existentes) e 3 novos planos, todos por teleconsulta, entram
-- no lugar. `orders` ganha as novas colunas de dados pessoais/saúde que o
-- formulário passa a coletar.
-- ============================================================================

-- ----------------------------------------------------------------------
-- Novos campos do paciente em `orders`. Todos nullable (exceto uses_glp1)
-- porque pedidos antigos não terão esses valores retroativos.
-- ----------------------------------------------------------------------
alter table orders
  add column if not exists birth_date date,
  add column if not exists sex text,
  add column if not exists whatsapp text,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists profession text,
  add column if not exists height_cm numeric(5, 1),
  add column if not exists weight_kg numeric(5, 1),
  add column if not exists medications_in_use text,
  add column if not exists uses_glp1 boolean not null default false,
  add column if not exists glp1_medication text;

-- ----------------------------------------------------------------------
-- Aposenta os planos presenciais/antigos (soft-hide, não deletar).
-- ----------------------------------------------------------------------
update service_plans
set is_active = false
where key in ('presencial', 'teleconsulta', 'protocolo_trimestral', 'glp1_essencial', 'glp1_premium');

-- ----------------------------------------------------------------------
-- Novos planos — todos teleconsulta, sem tiers (mesmo padrão hoje usado
-- por protocolo_trimestral/glp1_*: um único pacote com sessões definidas
-- em lib/packages.ts).
-- ----------------------------------------------------------------------
insert into service_plans (
  key, name, duration_minutes, base_price_cents, features, sort_order,
  badge, has_tiers
) values
(
  'consulta_online', 'Consulta Nutricional Online', 60, 34700,
  '["Consulta online de até 60 minutos", "Avaliação por Bioimpedância 3D", "Avaliação completa da rotina e objetivos", "Avaliação de exames laboratoriais (quando disponíveis)", "Plano alimentar personalizado", "Estratégias nutricionais individualizadas", "Orientação sobre suplementação quando indicada", "Lista de substituições alimentares", "Material de apoio", "Suporte via WhatsApp por até 7 dias após a consulta para dúvidas relacionadas ao plano alimentar", "Cupons exclusivos de parceiros e marcas de suplementos", "Observação: não inclui consulta de retorno"]'::jsonb,
  1, null, false
),
(
  'plano_plus', 'Plano Plus', 60, 67700,
  '["Primeira Consulta completa (60 minutos) com Bioimpedância 3D", "Plano alimentar personalizado e definição de metas", "Retorno em 15 dias para ajustes do plano e esclarecimento de dúvidas", "Nova Consulta completa 30 dias após a primeira, com nova Bioimpedância 3D e comparação da evolução", "Suporte via WhatsApp durante todo o acompanhamento", "Check-ins semanais", "Ajustes rápidos do plano quando necessário", "Orientações para viagens e alimentação fora de casa", "Lista de substituições alimentares", "Cupons exclusivos", "Acesso gratuito ao LannyFitClub", "Materiais exclusivos"]'::jsonb,
  2, 'MAIS ESCOLHIDO', false
),
(
  'glp1_suporte_metabolico', 'Plano GLP-1 | Suporte Metabólico', 60, 98790,
  '["Avaliação Inicial completa (60 minutos) com Bioimpedância 3D e avaliação clínica", "Plano alimentar individualizado com estratégias para preservação de massa muscular", "Orientação sobre suplementação", "4 encontros de acompanhamento, a cada 20 dias, cada um com nova Bioimpedância 3D", "Ajustes alimentares e manejo dos sintomas relacionados ao medicamento em cada encontro", "Suporte via WhatsApp durante todo o programa", "Check-ins semanais", "Estratégias para viagens e restaurantes", "Lista de substituições alimentares", "Cupons exclusivos", "Acesso ao LannyFitClub", "Materiais exclusivos"]'::jsonb,
  3, null, false
)
on conflict (key) do update set
  name = excluded.name,
  duration_minutes = excluded.duration_minutes,
  base_price_cents = excluded.base_price_cents,
  features = excluded.features,
  sort_order = excluded.sort_order,
  badge = excluded.badge,
  has_tiers = excluded.has_tiers,
  is_active = true;
