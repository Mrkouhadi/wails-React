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
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000); // Automatically remove after timeout
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map(({ id, message, type }) => (
          <Toast key={id} message={message} type={type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast: React.FC<{ message: string; type: ToastType }> = ({
  message,
  type,
}) => {
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
      default:
        return <InformationCircleIcon className={iconClasses} />;
    }
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-lg shadow-lg ${typeStyles[type]}`}
    >
      <ToastIcon />
      <span>{message}</span>
    </div>
  );
};

/* 
USAGE:
    const { showToast } = useToast();
    showToast("This is a success message!", "success")
*/
