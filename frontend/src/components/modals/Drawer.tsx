/* 
// USAGE:
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h2 className="text-xl font-bold">Drawer Content</h2>
        <p>This is a sliding panel from the right.</p>
      </Drawer>
*/

import React from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white dark:bg-gray-800 bg-opacity-90 shadow-lg transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
        >
          ✖
        </button>

        <div className="p-6">{children}</div>
      </div>
    </>
  );
};
export default Drawer;
