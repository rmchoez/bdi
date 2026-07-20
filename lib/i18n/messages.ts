import type { Locale } from "./config";

const messages = {
  en: {
    nav: { home: "Home", plans: "Our plans", about: "About us", stories: "Stories", support: "Support" },
    plans: {
      eyebrow: "International health insurance",
      title: "Find a plan that fits your life",
      description: "Explore international health plans designed for individuals, families and companies.",
      details: "View details",
      empty: "No plans are currently available for this language.",
      documentsUnavailable: "Documents are temporarily unavailable. Please try again later.",
      included: "What’s included?",
      documents: "Plan documents",
      back: "Back to all plans",
      download: "Open document",
      documentLabels: {
        TOB: "Download brochure",
        COC: "General conditions",
        SBC: "Summary of benefits",
        SPD: "Plan description",
        default: "Open document",
      },
      standardProducts: "Standard Products",
      showStandardProducts: "View Standard Products",
      hideStandardProducts: "Hide Standard Products",
    },
  },
  es: {
    nav: { home: "Inicio", plans: "Nuestros planes", about: "Nosotros", stories: "Historias", support: "Soporte" },
    plans: {
      eyebrow: "Seguro médico internacional",
      title: "Encuentra un plan para tu vida",
      description: "Explora planes internacionales diseñados para personas, familias y empresas.",
      details: "Ver detalles",
      empty: "No hay planes disponibles actualmente para este idioma.",
      documentsUnavailable: "Los documentos no están disponibles temporalmente. Inténtalo nuevamente.",
      included: "¿Qué incluye?",
      documents: "Documentos del plan",
      back: "Volver a todos los planes",
      download: "Abrir documento",
      documentLabels: {
        TOB: "Descargar folleto",
        COC: "Condiciones generales",
        SBC: "Resumen de beneficios",
        SPD: "Descripción del plan",
        default: "Abrir documento",
      },
      standardProducts: "Productos estándar",
      showStandardProducts: "Ver productos estándar",
      hideStandardProducts: "Ocultar productos estándar",
    },
  },
  pt: {
    nav: { home: "Início", plans: "Nossos planos", about: "Sobre nós", stories: "Histórias", support: "Suporte" },
    plans: {
      eyebrow: "Seguro saúde internacional",
      title: "Encontre um plano para sua vida",
      description: "Explore planos internacionais criados para pessoas, famílias e empresas.",
      details: "Ver detalhes",
      empty: "Nenhum plano está disponível atualmente para este idioma.",
      documentsUnavailable: "Os documentos estão temporariamente indisponíveis. Tente novamente.",
      included: "O que está incluído?",
      documents: "Documentos do plano",
      back: "Voltar para todos os planos",
      download: "Abrir documento",
      documentLabels: {
        TOB: "Baixar folheto",
        COC: "Condições gerais",
        SBC: "Resumo de benefícios",
        SPD: "Descrição do plano",
        default: "Abrir documento",
      },
      standardProducts: "Produtos padrão",
      showStandardProducts: "Ver produtos padrão",
      hideStandardProducts: "Ocultar produtos padrão",
    },
  },
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
