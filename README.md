# Lanny Santana Nutricionista — Sistema de Agendamento

Sistema completo de agendamento de consultas: landing page premium, wizard de
agendamento em etapas, calendário de disponibilidade, checkout de pagamento e
painel administrativo. Construído em **Next.js 15 (App Router)**, **TypeScript**,
**Tailwind CSS**, **Framer Motion** e **Supabase**.

## Stack

- Next.js 15 / React 19 / TypeScript
- Tailwind CSS + design tokens da marca
- Framer Motion (animações)
- React Hook Form + Zod (formulários e validação)
- TanStack Query (dados assíncronos)
- Zustand (estado do wizard de agendamento)
- Supabase (banco de dados + auth do admin)
- Lucide Icons

## Estrutura

```
app/            rotas (App Router): landing, /agendar, /pagamento/sucesso, /admin
components/     ui/, landing/, booking/, admin/, chatbot/, providers/
hooks/          zustand store, TanStack Query hooks
services/       camada de integração: calendarService, paymentService,
                appointmentService, whatsappService, emailService, chatbotService
types/          tipos de domínio (booking, appointment, database, chat)
lib/            clientes Supabase, fontes, config e utilitários gerais
utils/          formatadores, validadores (zod), exportação CSV/Excel
public/         assets estáticos (logo, robots.txt)
```

## Como rodar

Pré-requisito: **Node.js 18.18+** e npm (não estavam instalados no ambiente em
que este projeto foi gerado — instale-os antes de continuar).

```bash
npm install
cp .env.example .env.local   # preencha as variáveis (veja abaixo)
npm run dev
```

Acesse `http://localhost:3000`.

## Identidade visual

| Token | Cor |
|---|---|
| Verde Sálvia | `#7A8574` |
| Verde Escuro | `#5E685A` |
| Off White | `#F7F4ED` |
| Bege | `#EFE8DD` |
| Dourado Fosco | `#C9AF73` |
| Texto | `#2D2D2D` |

Tipografia: **Playfair Display** (títulos), **Cormorant Garamond** (subtítulos),
**Poppins** (texto), carregadas via `next/font` em [lib/fonts.ts](lib/fonts.ts).

### Logo

A arte oficial da marca está em `public/logo/`, exportada em SVG e PNG nas
variações sálvia (fundo claro) e creme (fundo escuro):

- `logo-horizontal-light.svg` / `logo-horizontal-dark.svg` — lockup horizontal
  usado pelo componente [Logo](components/ui/Logo.tsx) no header/footer,
  trocado automaticamente conforme o tema claro/escuro.
- `logo-stacked-light.svg` / `logo-stacked-dark.svg` — versão empilhada
  (ícone sobre o nome), útil para usos maiores (hero, materiais impressos).
- `icon-mark-sage.png` — apenas o símbolo circular, usado como base para o
  favicon (`app/icon.png`) e o ícone de tela inicial iOS (`app/apple-icon.png`).

Para trocar a arte, basta substituir esses arquivos mantendo os mesmos nomes.

## Variáveis de ambiente

Veja [.env.example](.env.example) para a lista completa e comentada. Resumo:

- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` — banco de dados e autenticação do painel admin.
- **Pagamento**: gateway ativo é o Mercado Pago (Checkout Pro). Defina
  `MERCADOPAGO_ACCESS_TOKEN` (server-only) para o botão "Confirmar e pagar"
  gerar uma cobrança real; sem ele, o checkout retorna erro.
- **Agenda**: `NEXT_PUBLIC_CALENDAR_PROVIDER` (`mock` | `google` | `calendly`)
  — por padrão usa um provedor mock com horários de exemplo.
- **WhatsApp / Resend / OpenAI**: chaves para as integrações preparadas (ver
  seção abaixo).

## Banco de dados (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Rode o SQL em [lib/supabase/schema.sql](lib/supabase/schema.sql) no SQL
   Editor — cria a tabela `appointments`, enums, índices e as policies de RLS
   (o público só pode inserir; leitura/edição exigem usuário autenticado).
3. Crie um usuário em **Authentication → Users** para acessar `/admin`.
4. Copie a URL e as chaves do projeto para `.env.local`.

## Arquitetura de integrações (preparada, não finalizada)

Cada serviço externo tem uma camada dedicada em `services/`, com interface
clara e comentários `TODO` indicando exatamente onde plugar a chamada real:

- [services/calendarService.ts](services/calendarService.ts) — `CalendarProvider`
  com implementação mock + esqueletos para Google Calendar e Calendly.
- [services/paymentService.ts](services/paymentService.ts) — chama
  `app/api/checkout/route.ts`, que gera a cobrança real no Mercado Pago
  (Checkout Pro). `app/api/webhooks/mercadopago/route.ts` recebe a
  confirmação de pagamento e atualiza o pedido no Supabase.
- [services/whatsappService.ts](services/whatsappService.ts) — WhatsApp
  Business Cloud API.
- [services/emailService.ts](services/emailService.ts) — e-mails transacionais
  via Resend.
- [services/chatbotService.ts](services/chatbotService.ts) — FAQ baseado em
  regras para o **Assistente Lanny**, com o ponto de extensão para a API da
  OpenAI já sinalizado.

Nenhuma dessas integrações faz chamadas de rede reais até que as respectivas
chaves sejam configuradas — o fluxo de agendamento continua funcionando de
ponta a ponta em modo demonstração.

## Painel administrativo

Acesse `/admin/login` com um usuário criado no Supabase Auth. O painel
(`/admin`) permite buscar pacientes, filtrar por data/status/tipo de consulta,
editar ou cancelar agendamentos, confirmar pagamento manualmente e exportar a
lista filtrada em Excel ou CSV.

## Deploy (Vercel)

1. Suba o repositório no GitHub/GitLab.
2. Importe o projeto na [Vercel](https://vercel.com/new).
3. Configure as variáveis de ambiente de `.env.example` no painel da Vercel.
4. Deploy — o projeto já inclui `next.config.ts`, `sitemap.ts`, `robots.txt` e
   metadados de SEO/Open Graph prontos para produção.

## Scripts

```bash
npm run dev        # ambiente de desenvolvimento
npm run build      # build de produção
npm run start       # servidor de produção (após build)
npm run lint        # ESLint
npm run typecheck   # checagem de tipos (tsc --noEmit)
```
