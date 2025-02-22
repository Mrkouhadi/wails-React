import { useTranslation } from "react-i18next";
import { ThemeToggler, LanguageSwitcher, Modal } from "../components";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

type Props = {};

function Home({}: Props) {
  const [t, _] = useTranslation("global");
  const { showToast } = useToast();

  // handle modal opening and closing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ConfirmModal = () => {
    // more magic here
    setIsModalOpen(false);
  };

  return (
    <div className="DRAGGABLE h-screen flex flex-col justify-between p-4">
      <h1 className="text-text-primary dark:text-dark-text-primary font-roboto font-extrabold text-6xl text-center ">
        {t("headings.greeting")}
      </h1>
      <div className="w-full flex items-center justify-between my-12">
        {/* the modal */}
        <button className="btn-secondary" onClick={() => setIsModalOpen(true)}>
          {t("buttons.modal")}
        </button>
        <Modal
          message={t("headings.greeting")}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={ConfirmModal}
        />

        {/* a toast */}
        <button
          onClick={() => showToast("This is a success message!", "success")}
          className="btn-secondary"
        >
          {t("buttons.toast-success")}
        </button>

        {/* primary and secondary buttons */}
        <button className="btn-secondary">{t("buttons.secondary")}</button>
        <button className="btn-primary">{t("buttons.primary")}</button>
      </div>
      {/* theme toggler and language switcher */}
      <div className="w-full flex items-center justify-between">
        {/* the theme */}
        <ThemeToggler />
        {/* the language */}
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default Home;
