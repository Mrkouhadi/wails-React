import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  const ToastIcon = () => {
    const iconClasses = "h-6 w-6";
    switch (type) {
      case "success":
        return <CheckCircleIcon className={iconClasses} />;
      case "error":
        return <ExclamationCircleIcon className={iconClasses} />;
      case "warning":
        return <ExclamationTriangleIcon className={iconClasses} />;
      case "info":
      default:
        return <InformationCircleIcon className={iconClasses} />;
    }
  };
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 flex items-center gap-4 rounded-lg shadow-lg transition-all duration-300 transform ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${typeStyles[type]}`}
    >
      <ToastIcon />
      {message}
    </div>
  );
};

export default Toast;

// USAGE:
/* 
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
        <button
          onClick={() =>
            setToast({
              message: "You have fired a toast Successfully!",
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
*/
