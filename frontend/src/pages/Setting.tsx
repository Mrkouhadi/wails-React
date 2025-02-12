import { useTranslation } from "react-i18next";

type Props = {};

function Setting({}: Props) {
  const [t, _] = useTranslation("global");
  return (
    <div className=" h-screen p-20">
      <p className="text-dark dark:text-light font-roboto font-extrabold text-6xl text-center">
        {t("headings.greeting")}
      </p>
    </div>
  );
}

export default Setting;
