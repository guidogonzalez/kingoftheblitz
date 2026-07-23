import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  function showModal({
    type = "info",
    title = "",
    message = "",
    autoClose = false,
  }) {
    setModal({
      open: true,
      type,
      title,
      message,
    });

    if (autoClose) {
      setTimeout(() => {
        hideModal();
      }, 2500);
    }
  }

  function hideModal() {
    setModal((prev) => ({
      ...prev,
      open: false,
    }));
  }

  return (
    <ModalContext.Provider
      value={{
        modal,
        showModal,
        hideModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }

  return context;
}
