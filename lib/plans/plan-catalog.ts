import type { ApiLanguage, Locale } from "../i18n/config";

type LocalizedText = Record<ApiLanguage, string>;

export type PlanCatalogItem = {
  planCode: string;
  slug: Record<ApiLanguage, string>;
  name: LocalizedText;
  variant?: LocalizedText;
  description: LocalizedText;
  heroImage: string;
  cardImage: string;
  order: number;
  enabledLocales: ApiLanguage[];
  markets: string[];
  benefits: Record<ApiLanguage, string[]>;
};

const localized = (en: string, es: string, pt: string): LocalizedText => ({ EN: en, SP: es, PT: pt });

export const planCatalog: PlanCatalogItem[] = [
  {
    planCode: "MEPRO",
    slug: localized("medical-elite-pro", "medical-elite-pro", "medical-elite-pro"),
    name: localized("Medical Elite", "Medical Elite", "Medical Elite"),
    variant: localized("Pro", "Pro", "Pro"),
    description: localized(
      "Our signature plan is designed for maximum coverage and total peace of mind.",
      "Nuestro plan insignia está diseñado para brindar máxima cobertura y tranquilidad.",
      "Nosso plano principal foi criado para oferecer cobertura máxima e tranquilidade."
    ),
    heroImage: "/plan-medical-elite.jpg", cardImage: "/plan-medical-elite.jpg", order: 1,
    enabledLocales: ["EN", "SP", "PT"], markets: ["global"],
    benefits: {
      EN: ["100% maternity benefits within the maternity network", "Mental health coverage", "Broad preventive benefits"],
      SP: ["Beneficios de maternidad al 100% dentro de la red", "Cobertura de salud mental", "Amplios beneficios preventivos"],
      PT: ["Benefícios de maternidade de 100% dentro da rede", "Cobertura de saúde mental", "Ampla cobertura preventiva"],
    },
  },
  {
    planCode: "PPPRO",
    slug: localized("premier-plus-pro", "premier-plus-pro", "premier-plus-pro"),
    name: localized("Premier Plus", "Premier Plus", "Premier Plus"),
    variant: localized("Pro", "Pro", "Pro"),
    description: localized("Robust coverage and enhanced protection for a variety of medical needs.", "Cobertura sólida y protección mejorada para diversas necesidades médicas.", "Cobertura robusta e proteção aprimorada para diversas necessidades médicas."),
    heroImage: "/plan-premier-plus.jpg", cardImage: "/plan-premier-plus.jpg", order: 2,
    enabledLocales: ["EN", "SP", "PT"], markets: ["global"],
    benefits: {
      EN: ["Expanded maternity benefits", "Coverage for multiple medical therapies", "Greater critical event coverage"],
      SP: ["Beneficios ampliados de maternidad", "Cobertura para múltiples terapias médicas", "Mayor cobertura para eventos críticos"],
      PT: ["Benefícios ampliados de maternidade", "Cobertura para diversas terapias médicas", "Maior cobertura para eventos críticos"],
    },
  },
  {
    planCode: "GCPRO",
    slug: localized("global-care-pro", "global-care-pro", "global-care-pro"),
    name: localized("Global Care", "Global Care", "Global Care"),
    variant: localized("Pro", "Pro", "Pro"),
    description: localized("Comprehensive coverage with seamless access to quality medical care worldwide.", "Cobertura integral con acceso a atención médica de calidad en todo el mundo.", "Cobertura completa com acesso a cuidados médicos de qualidade em todo o mundo."),
    heroImage: "/plan-global-care.jpg", cardImage: "/plan-global-care.jpg", order: 3,
    enabledLocales: ["EN", "SP", "PT"], markets: ["global"],
    benefits: {
      EN: ["Broad U.S. provider network", "Maternity and organ transplant coverage", "Palliative care benefits"],
      SP: ["Amplia red de proveedores en EE. UU.", "Cobertura de maternidad y trasplantes", "Beneficios de cuidados paliativos"],
      PT: ["Ampla rede de prestadores nos EUA", "Cobertura de maternidade e transplantes", "Benefícios de cuidados paliativos"],
    },
  },
  {
    planCode: "MCPRO",
    slug: localized("medical-care-pro", "medical-care-pro", "medical-care-pro"),
    name: localized("Medical Care", "Medical Care", "Medical Care"),
    variant: localized("Pro", "Pro", "Pro"),
    description: localized("Key medical coverage for day-to-day life inside and outside your country of residence.", "Cobertura médica esencial dentro y fuera de tu país de residencia.", "Cobertura médica essencial dentro e fora do seu país de residência."),
    heroImage: "/plan-medical-care.png", cardImage: "/plan-medical-care.png", order: 4,
    enabledLocales: ["EN", "SP", "PT"], markets: ["global"],
    benefits: {
      EN: ["100% coverage outside the United States", "Extensive U.S. provider network", "Emergency transportation included"],
      SP: ["Cobertura del 100% fuera de Estados Unidos", "Amplia red de proveedores en EE. UU.", "Transporte de emergencia incluido"],
      PT: ["Cobertura de 100% fora dos Estados Unidos", "Ampla rede de prestadores nos EUA", "Transporte de emergência incluído"],
    },
  },
  {
    planCode: "MSPRO",
    slug: localized("medical-select-pro", "medical-select-pro", "medical-select-pro"),
    name: localized("Medical Select", "Medical Select", "Medical Select"),
    variant: localized("Pro", "Pro", "Pro"),
    description: localized("A smart health plan designed to accompany members through every stage of life.", "Un plan inteligente diseñado para acompañar a los miembros en cada etapa de la vida.", "Um plano inteligente para acompanhar os membros em cada fase da vida."),
    heroImage: "/plan-medical-select.png", cardImage: "/plan-medical-select.png", order: 5,
    enabledLocales: ["EN", "SP", "PT"], markets: ["global"],
    benefits: {
      EN: ["Professional sports accident coverage", "HIV coverage", "Cancer treatment coverage"],
      SP: ["Cobertura de accidentes deportivos profesionales", "Cobertura de VIH", "Cobertura para tratamiento del cáncer"],
      PT: ["Cobertura de acidentes esportivos profissionais", "Cobertura para HIV", "Cobertura para tratamento de câncer"],
    },
  },
];

export function getPlanBySlug(locale: ApiLanguage, slug: string) {
  return planCatalog.find((plan) => plan.enabledLocales.includes(locale) && plan.slug[locale] === slug);
}

export function getLocalizedPlans(locale: Locale, apiLanguage: ApiLanguage) {
  return planCatalog
    .filter((plan) => plan.enabledLocales.includes(apiLanguage))
    .sort((a, b) => a.order - b.order)
    .map((plan) => ({
      ...plan,
      locale,
      localizedName: plan.name[apiLanguage],
      localizedVariant: plan.variant?.[apiLanguage],
      localizedDescription: plan.description[apiLanguage],
      localizedSlug: plan.slug[apiLanguage],
      localizedBenefits: plan.benefits[apiLanguage],
    }));
}
