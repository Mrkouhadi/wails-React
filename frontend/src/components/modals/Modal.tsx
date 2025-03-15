/* 
// USAGE:
   // Modal
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const ConfirmModal = () => {
    // more magic here
    setSmallModalOpen(false);
  };
      <button className="btn-primary" onClick={() => setSmallModalOpen(true)}>
          Open Small Modal
      </button>
      <Modal
        isOpen={smallModalOpen}
        onClose={() => setSmallModalOpen(false)}
        size="small"
        onConfirm={ConfirmModal}
      >
        <div className="">
        Content of the modal
        </div>
      </Modal>
*/

import { useTranslation } from "react-i18next";

type ModalSize = "small" | "medium" | "large";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  size?: ModalSize;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  size = "medium",
  children,
}) => {
  const [t, _] = useTranslation("global");

  // Define width and height based on modal size
  const modalSizeClasses = {
    small: "w-[400px] h-[250] p-4",
    medium: "w-[50%] h-[60%] p-6",
    large: "w-[85%] h-[90%] ml-16 p-8",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 transition-transform duration-500 ease-in-out rounded-lg shadow-lg ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } ${modalSizeClasses[size]}`}
      >
        {children}
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
