"use client";

import {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  PropsWithChildren,
} from "react";

import styles from "./styles.module.css";

type Props = {} & PropsWithChildren;

const Modal = forwardRef(({ children }: Props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
    setIsOpen(false);
  };

  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => {
    return {
      closeModal,
      openModal,
    };
  });

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal={isOpen}
      className={styles.dialog}
    >
      <header>
        <button onClick={closeModal}>x</button>
      </header>
      <div>{children}</div>
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;

export interface IModalRef extends HTMLDialogElement {
  closeModal: () => void;
  openModal: () => void;
}
