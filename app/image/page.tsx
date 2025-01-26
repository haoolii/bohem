import { useTranslations } from "next-intl";
import { ImageCreateForm } from "../(component)/imageCreateForm";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <ImageCreateForm />
  );
}
