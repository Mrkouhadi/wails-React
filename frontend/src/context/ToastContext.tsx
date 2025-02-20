// /*
// USAGE:
//     const { showToast } = useToast();
//     showToast("This is a success message!", "success");
// */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

type ToastType = "success" | "error" | "warning" | "info";

type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [{ id, message, type }, ...prev]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map(({ id, message, type }) => (
          <Toast
            key={id}
            id={id}
            message={message}
            type={type}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast: React.FC<{
  id: number;
  message: string;
  type: ToastType;
  onClose: () => void;
}> = ({ id, message, type, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(), 400); // Wait for animation before removing
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  const typeStyles = {
    success: "bg-success text-background",
    error: "bg-error text-background",
    warning: "bg-warning text-dark-background",
    info: "bg-info text-background",
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
      default:
        return <InformationCircleIcon className={iconClasses} />;
    }
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-lg shadow-lg transition-transform duration-500 ease-in-out ${
        typeStyles[type]
      } ${isClosing ? "animate-slide-out-right" : "animate-slide-in-right"}`}
    >
      <ToastIcon />
      <span>{message}</span>
    </div>
  );
};
