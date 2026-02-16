import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  //* ==========================================================
  // Close by backdrop click's
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  //* ==========================================================
  // Close by Escape & Blocking background scroll
  useEffect(() => {
    const hanleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', hanleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', hanleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
