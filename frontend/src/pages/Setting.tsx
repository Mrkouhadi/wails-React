import { useTranslation } from "react-i18next";

type Props = {};

function Setting({}: Props) {
  const [t, _] = useTranslation("global");
  return (
    <div className="h-screen p-4">
      <h1 className="text-text-primary dark:text-dark-text-primary font-roboto font-extrabold text-6xl text-center">
        {t("headings.greeting")}
      </h1>
      <p className="text-text-secondary dark:text-dark-text-secondary text-center">
        I am a second text
      </p>
    </div>
  );
}

export default Setting;
