import { useTranslations } from "next-intl";
import { ImageCreateForm } from "@/feature/image/components/imageCreateForm";

export default function Page() {
  const t = useTranslations('Image feature');
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">{t("title")}</h1>
      <ImageCreateForm />
    </div>
  );
}
