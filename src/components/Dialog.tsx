import type { Dispatch, MouseEventHandler, PropsWithChildren, SetStateAction } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { X } from "./icons/lucide";
import { useT } from "../contexts/stringTranslations";

type Props = PropsWithChildren & {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function Dialog({ children, show, setShow }: Props) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const closeDialogLabel = useT('cabin.gallery.dialog.close');

  const closeDialog = useCallback(() => setShow(false), [setShow]);

  const onBackdropClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target !== dialog.current) return;
    setShow(false);
  };

  useEffect(() => {
    if (!dialog.current) return;
    if (!show) {
      document?.querySelector("body")?.classList.remove("overflow-hidden");
      dialog.current.close();
      return;
    }
    if (dialog.current.open) return;
    document?.querySelector("body")?.classList.add("overflow-hidden");
    dialog.current.showModal();
  }, [dialog, show]);

  useEffect(() => {
    dialog.current?.addEventListener('close', () => closeDialog());
  }, [dialog, closeDialog]);

  return (
    <dialog ref={dialog} className="relative border-2 border-black rounded-md p-0 w-full backdrop:bg-black backdrop:bg-opacity-50 backdrop:cursor-pointer" onClick={onBackdropClick}>
      <div className="p-4 pt-10">
        <button className="absolute top-1 right-4 text-2xl p-1 ml-auto" aria-label={closeDialogLabel} onClick={closeDialog}>
          <X />
        </button>
        {children}
      </div>
    </dialog>
  );
}