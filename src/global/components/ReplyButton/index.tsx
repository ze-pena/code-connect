"use client";

import { useRef } from "react";

import Image from "next/image";
import Modal, { IModalRef } from "../Modal";
import CustomButton from "../CustomButton";

import { IComment } from "@/interfaces/Post";

import styles from "./styles.module.css";

interface Props {
  comment: IComment;
  action: (formData: FormData) => void;
}

const avatarFallback = "/assets/images/icon_fallback.png";

export default function ReplyButton({ comment, action }: Props) {
  const modalRef = useRef<IModalRef>(null);

  const openModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  const submitForm = (formData: FormData) => {
    if (modalRef.current) modalRef.current.closeModal();

    setTimeout(() => {
      action(formData);
    }, 250);
  };

  return (
    <>
      <CustomButton name="reply" label="Responder" onClick={openModal} />
      <Modal ref={modalRef}>
        <form className={styles.replyForm} action={submitForm}>
          <div className={styles.parentComment}>
            <picture>
              <Image
                src={comment.author?.avatar ?? avatarFallback}
                alt="Avatar do usuário"
                width={40}
                height={40}
              />
            </picture>
            <strong>@{comment.author?.username}:</strong>
            <p>{comment.text}</p>
          </div>
          <div className={styles.childComment}>
            <textarea
              name="text"
              placeholder="Digite a sua resposta"
              rows={6}
            />
            <div>
              <CustomButton
                name="reply"
                label="Responder"
                type="submit"
                icon={
                  <Image
                    src="/assets/icons/arrow_forward.svg"
                    alt="Icone do botão de resposta"
                    width={14}
                    height={14}
                  />
                }
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
