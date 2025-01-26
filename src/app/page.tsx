import { useTranslations } from "next-intl";
import LanguageSwitcher from "./(component)/languageSwitcher";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t("title")}</h1>
    </div>
  );
}
