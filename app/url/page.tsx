import { useTranslations } from "next-intl";
import { UrlCreateForm } from "../(component)/urlCreateForm";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <UrlCreateForm />
  );
}
