import { notFound } from "next/navigation";
import { LocalizedHomePage } from "../../components/pages/LocalizedHomePage";
import { isLocale } from "../../lib/i18n/config";

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedHomePage locale={locale} />;
}
