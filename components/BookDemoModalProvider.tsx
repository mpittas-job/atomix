"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import BookDemoModal from "@/components/BookDemoModal";

interface BookDemoModalContextValue {
  openBookDemoModal: () => void;
  closeBookDemoModal: () => void;
}

const BookDemoModalContext = createContext<BookDemoModalContextValue | null>(
  null,
);

export function BookDemoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookDemoModal = useCallback(() => setIsOpen(true), []);
  const closeBookDemoModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openBookDemoModal, closeBookDemoModal }),
    [openBookDemoModal, closeBookDemoModal],
  );

  return (
    <BookDemoModalContext.Provider value={value}>
      {children}
      <BookDemoModal isOpen={isOpen} onClose={closeBookDemoModal} />
    </BookDemoModalContext.Provider>
  );
}

export function useBookDemoModal() {
  const context = useContext(BookDemoModalContext);

  if (!context) {
    throw new Error(
      "useBookDemoModal must be used within BookDemoModalProvider",
    );
  }

  return context;
}
