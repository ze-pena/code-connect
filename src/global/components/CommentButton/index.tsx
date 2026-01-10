"use client";

import { useRef } from "react";

import Image from "next/image";
import Modal, { IModalRef } from "../Modal";
import CustomButton from "../CustomButton";

import styles from "./styles.module.css";

interface Props {
  comments: number;
  action: (formData: FormData) => void;
}

export default function CommentButton({ comments, action }: Props) {
  const modalRef = useRef<IModalRef>(null);

  const openModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  const submitForm = (formData: FormData) => {
    if (modalRef.current) modalRef.current.closeModal();
    action(formData);
  };

  return (
    <>
      <button className={styles.commentButton} onClick={openModal}>
        <figure>
          <Image
            src="/assets/icons/chat.svg"
            alt="Search icon"
            width={20}
            height={20}
          />
        </figure>
        <span>{comments}</span>
      </button>

      <Modal ref={modalRef}>
        <form className={styles.commentForm} action={submitForm}>
          <h3>Deixe o seu comentário sobre o post:</h3>
          <textarea
            name="text"
            placeholder="Digite o seu comentário"
            rows={6}
          />
          <div>
            <CustomButton
              type="submit"
              name="comment"
              label="Comentar"
              isDisabled={false}
              icon={
                <Image
                  src="/assets/icons/arrow_forward.svg"
                  alt="Icone do botão de envio"
                  width={14}
                  height={14}
                />
              }
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
