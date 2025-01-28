import { useTranslations } from "next-intl";
import { UrlCreateForm } from "@/feature/url/components/urlCreateForm";

export default function Page() {
  const t = useTranslations('URL feature');
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">{t('title')}</h1>
      <UrlCreateForm />
    </div>
  );
}
