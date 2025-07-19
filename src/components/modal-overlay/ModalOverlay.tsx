import { ReactNode } from 'react';
import style from './ModalOverlay.module.scss';

interface IProps {
  children: ReactNode;
  closeModal: () => void;
}

export default function ModalOverlay({ closeModal, children }: IProps) {
  return (
    <div onClick={closeModal} className={style.overlay}>
      {children}
    </div>
  );
}