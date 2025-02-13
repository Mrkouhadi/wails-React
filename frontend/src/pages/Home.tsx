import { useTranslation } from "react-i18next";
import { ThemeToggler } from "../components";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import { useState } from "react";

type Props = {};

function Home({}: Props) {
  const [t, _] = useTranslation("global");
  // toast
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
  // handle modal opening and closing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ConfirmModal = () => {
    // more logic here
    setIsModalOpen(false);
  };

  return (
    <div className="DRAGGABLE h-screen flex flex-col justify-between p-20">
      <p className="text-dark dark:text-light font-roboto font-extrabold text-6xl text-center">
        {t("headings.greeting")}
      </p>
      <div className="w-full flex items-center justify-between my-12">
        {/* a modal */}
        <button
          className="text-black dark:text-white"
          onClick={() => setIsModalOpen(true)}
        >
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
          onClick={() =>
            setToast({
              message: t("headings.toast-success-message"),
              type: "success",
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          {t("buttons.success-toast")}
        </button>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        {/* primary and secondary buttons */}
        <button className="btn-secondary">{t("buttons.secondary")}</button>
        <button className="btn-primary">{t("buttons.primary")}</button>
      </div>
      {/* theme toggler and language switcher */}
      <div className="w-full flex items-center justify-between">
        <ThemeToggler />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default Home;
