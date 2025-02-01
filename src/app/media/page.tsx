import { useTranslations } from "next-intl";
import { MediaCreateForm } from "@/feature/media/components/mediaCreateForm";

export default function Page() {
  const t = useTranslations('Media feature');
  return (
    <div>
      <MediaCreateForm />
    </div>
  );
}
