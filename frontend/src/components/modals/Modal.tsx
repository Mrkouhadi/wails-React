/* 
// USAGE:
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ConfirmModal = () => {
    // more logic here
    setIsModalOpen(false);
  };
        <button className="" onClick={() => setIsModalOpen(true)}>
          {t("buttons.modal")}
        </button>
        <Modal
          message={t("headings.greeting")}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={ConfirmModal}
        />
*/
import React from "react";
import { useTranslation } from "react-i18next";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  const [t, _] = useTranslation("global");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`bg-surface dark:bg-dark-surface transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } w-1/3 rounded-lg p-4 flex flex-col items-center justify-center`}
      >
        <h2 className="text-lg text-center text-primary dark:text-dark-primary mb-8">
          {message}
        </h2>
        <div className="flex items-center justify-around w-full">
          <button onClick={onClose} className="btn-secondary">
            {t("buttons.cancel")}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-primary"
          >
            {t("buttons.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;