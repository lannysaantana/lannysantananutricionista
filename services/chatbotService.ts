import type { ChatMessage, FaqEntry } from "@/types/chat";

/**
 * Rule-based FAQ used by "Assistente Lanny" until a real LLM is wired up.
 * Keep answers short — this is a widget, not a full conversation surface.
 */
export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "Como funciona a consulta?",
    keywords: ["como funciona", "consulta funciona", "primeira consulta"],
    answer:
      "Na primeira consulta, a Lanny entende seu histórico, rotina e objetivos para montar um plano alimentar 100% individualizado. Pode ser presencial ou por teleconsulta.",
  },
  {
    question: "Quanto tempo dura?",
    keywords: ["quanto tempo", "duração", "dura a consulta"],
    answer: "A consulta inicial dura em média 50 minutos, com tempo dedicado a ouvir seu histórico com calma.",
  },
  {
    question: "O que preciso levar?",
    keywords: ["o que levar", "preciso levar", "documentos"],
    answer:
      "Leve exames recentes (se tiver), lista de medicamentos em uso e, se possível, anote suas principais dúvidas antes da consulta.",
  },
  {
    question: "Como funciona a teleconsulta?",
    keywords: ["teleconsulta", "consulta online", "video chamada", "videochamada"],
    answer:
      "A teleconsulta acontece por videochamada em horário marcado. Você recebe o link por e-mail e WhatsApp antes do horário agendado.",
  },
  {
    question: "Como é o pagamento?",
    keywords: ["pagamento", "pagar", "preço", "valor", "quanto custa"],
    answer:
      "O pagamento é feito de forma segura, no ato do agendamento, via PIX, boleto ou cartão. Você recebe a confirmação assim que o pagamento é aprovado.",
  },
];

const FALLBACK_ANSWER =
  "Ótima pergunta! Para esse detalhe, o ideal é falar diretamente com a equipe da Lanny pelo WhatsApp — posso te ajudar com dúvidas sobre consulta, teleconsulta, o que levar e pagamento.";

function matchFaq(input: string): FaqEntry | null {
  const normalized = input.toLowerCase();
  return (
    FAQ_ENTRIES.find((entry) =>
      entry.keywords.some((keyword) => normalized.includes(keyword))
    ) ?? null
  );
}

/**
 * Resolves a reply for the given conversation. Currently rule-based; when
 * OPENAI_API_KEY is configured this is the seam to swap in a real call to
 * the OpenAI Responses API (e.g. via an /api/chat route handler), passing
 * `history` as context and FAQ_ENTRIES as grounding/system knowledge.
 */
export async function getAssistantReply(
  userMessage: string,
  _history: ChatMessage[]
): Promise<string> {
  const match = matchFaq(userMessage);
  if (match) return match.answer;

  // TODO: when OPENAI_API_KEY is set, POST to /api/chat which calls
  // OpenAI with FAQ_ENTRIES + _history as context and streams the reply.
  return FALLBACK_ANSWER;
}
