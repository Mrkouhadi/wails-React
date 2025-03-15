import { useTranslation } from "react-i18next";
import { Modal } from "../components";
import { useState } from "react";
import Drawer from "../components/modals/Drawer";

type Props = {};

function Setting({}: Props) {
  const [t, _] = useTranslation("global");
  // Modal
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const [mediumModalOpen, setMediumModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const ConfirmModal = () => {
    // more magic here
    setSmallModalOpen(false);
    setMediumModalOpen(false);
    setLargeModalOpen(false);
  };
  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen p-4">
      <h1 className="text-text-primary dark:text-dark-text-primary font-roboto font-extrabold text-6xl text-center">
        {t("headings.greeting")}
      </h1>
      <p className="text-text-secondary dark:text-dark-text-secondary text-center">
        I am a second text
      </p>

      <div className="flex gap-4 items-center">
        {/* Small Modal  */}
        <button className="btn-primary" onClick={() => setSmallModalOpen(true)}>
          Open Small Modal
        </button>
        <Modal
          isOpen={smallModalOpen}
          onClose={() => setSmallModalOpen(false)}
          size="small"
          onConfirm={ConfirmModal}
        >
          <h2 className="text-lg text-center text-primary dark:text-dark-primary mb-4">
            Hello world
          </h2>
        </Modal>

        {/* Medium Modal */}
        <button
          className="btn-primary"
          onClick={() => setMediumModalOpen(true)}
        >
          Open Medium Modal
        </button>
        <Modal
          isOpen={mediumModalOpen}
          onClose={() => setMediumModalOpen(false)}
          size="medium"
          onConfirm={ConfirmModal}
        >
          <h2 className="text-lg text-center text-primary dark:text-dark-primary mb-4">
            hallo world
          </h2>
        </Modal>

        {/* Large Modal */}
        <button className="btn-primary" onClick={() => setLargeModalOpen(true)}>
          Open Large Modal
        </button>
        <Modal
          isOpen={largeModalOpen}
          onClose={() => setLargeModalOpen(false)}
          size="large"
          onConfirm={ConfirmModal}
        >
          <h2 className="text-lg text-center text-primary dark:text-dark-primary mb-4">
            hello world
          </h2>
        </Modal>

        {/* drawer */}
        {/* Button to Open Drawer */}
        <button onClick={() => setIsDrawerOpen(true)} className="btn-primary">
          Open Drawer
        </button>

        {/* Drawer Component */}
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <h2 className="text-xl font-bold">Drawer Content</h2>
          <p>This is a sliding panel from the right.</p>
        </Drawer>
      </div>
    </div>
  );
}

export default Setting;
