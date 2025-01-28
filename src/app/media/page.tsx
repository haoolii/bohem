import { useTranslations } from "next-intl";
import { MediaCreateForm } from "@/feature/media/components/mediaCreateForm";

export default function Page() {
  const t = useTranslations('Media feature');
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">{t('title')}</h1>
      <MediaCreateForm />
    </div>
  );
}
