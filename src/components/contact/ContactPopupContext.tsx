"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ContactPopup } from "./ContactPopup";

type ContactPopupContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactPopupContext = createContext<ContactPopupContextValue | null>(
  null,
);

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  );

  return (
    <ContactPopupContext.Provider value={value}>
      {children}
      <ContactPopup isOpen={isOpen} onClose={close} />
    </ContactPopupContext.Provider>
  );
}

export function useContactPopup() {
  const ctx = useContext(ContactPopupContext);
  if (!ctx) {
    throw new Error("useContactPopup must be used within ContactPopupProvider");
  }
  return ctx;
}
