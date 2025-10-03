import { useState, useEffect } from "react";

export default function useModalState() {
  const [isModalOpen, setModalState] = useState(false);

  const toggleModalState = () => setModalState((value) => !value);
  const handleCloseModal = () => setModalState(false);
  
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') handleCloseModal();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return { isModalOpen, toggleModalState, handleCloseModal };
};