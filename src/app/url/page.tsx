import { useTranslations } from "next-intl";
import { UrlCreateForm } from "@/feature/url/components/urlCreateForm";

export default function Page() {
  const t = useTranslations("URL feature");
  return (
    <div>
      <UrlCreateForm />
    </div>
  );
}
