import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../index';
import { ReactNode, SyntheticEvent } from 'react';
import style from './Modal.module.scss';

interface IProps {
  children: ReactNode | string;
  title?: string;
  closeModal: () => void;
}

const modalContainer = document.querySelector('#modal')!

export default function Modal({ closeModal, title, children }: IProps) {
  const handleStopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  return createPortal(
    (
      <ModalOverlay closeModal={closeModal}>
        <div className={style.modal} onClick={handleStopPropagation}>
          <div className={style.header}>
            {title && (<h2 className={style.title}>{title}</h2>)}
            <CloseIcon className={style.closeIcon} type='primary' onClick={closeModal} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalContainer
  )
}