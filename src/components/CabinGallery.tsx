import type { FC, MouseEventHandler } from "react";
import type { ParsedAssetImage } from "../parsers/contentful";
import { useEffect, useRef, useState } from "react";
import AssetImage from "./AssetImage";
import { Scaling, X } from "./icons/lucide";
import { useT } from "../contexts/stringTranslations";

type Props = {
  gallery: ParsedAssetImage[]
}
const CabinGallery: FC<Props> = ({ gallery }) => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const scrollContainer = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const onClick = (i: number) => setIndex(i);
  const goToLabel = useT('cabin.gallery.go.to');
  const openDialogLabel = useT("cabin.gallery.dialog.open");
  const closeDialogLabel = useT('cabin.gallery.dialog.close');

  const openDialog = () => dialog.current?.showModal();
  const closeDialog = () => dialog.current?.close();
  const onDialogClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target !== dialog.current) return;
    dialog.current?.close();
  };

  useEffect(() => {
    if (!scrollContainer.current || gallery.length === 0) return;

    const child = scrollContainer.current.children[index];
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "end" });
  }, [index, scrollContainer, gallery.length]);
  return (
    <div className="flex flex-col gap-2">
      {gallery[index] && (
        <dialog ref={dialog} className="relative border-2 border-black rounded-md p-0" onClick={onDialogClick}>
          <div className="p-4 pt-10">
            <button className="absolute top-1 right-4 text-2xl p-1 ml-auto" aria-label={closeDialogLabel} onClick={closeDialog}>
              <X />
            </button>
            <AssetImage
              alt=""
              width={gallery[index].width}
              height={gallery[index].height}
              src={gallery[index].src}
            />
          </div>
        </dialog>
      )}
      <div>
        <div className="border-2 border-black rounded-md overflow-hidden relative bg-slate-100">
          <ul className="flex flex-nowrap transition-transform duration-1000" style={{
            transform: `translateX(${index === 0 ? 0 : index * 100 * -1}%)`
          }}>
            {gallery.map(({ src }, i) => (
              <li key={i} className="min-w-full">
                <AssetImage
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  width="936"
                  height="527"
                  src={`${src}&w=936&h=527&fit=pad`}
                />
              </li>
            ))}
          </ul>

          {gallery[index] && (
            <button onClick={openDialog} className="absolute top-1 right-1 text-2xl p-1 bg-slate-200 border-2 border-black rounded-md hover:bg-slate-300 focus:bg-slate-300 transition-all" aria-label={openDialogLabel}>
              <Scaling />
            </button>
          )}
          <span className="absolute bottom-1 right-1 p-1 leading-none bg-slate-200 border-2 border-black rounded-md font-sans">{index + 1} / {gallery.length}</span>
        </div>
        {gallery[index] && (
          <p className="font-sans mt-1 text-center">{gallery[index].alt}</p>
        )}
      </div>

      <ul ref={scrollContainer} className="flex flex-nowrap overflow-x-scroll snap-x pb-2 -mx-1 -md:mx-2">
        {gallery.map(({ src }, i) => (
          <li key={i} className="w-[20%] min-w-[20%] snap-start px-1 -md:mx-2">
            <button onClick={() => onClick(i)} className={`${index === i ? "rounded-md overflow-hidden outline-double outline-2 outline-black -outline-offset-2" : ""}`}>
              <AssetImage
                alt={`${goToLabel} ${i + 1}`}
                loading={i <= 5 ? "eager" : "lazy"}
                width="174"
                height="100"
                src={`${src}&w=174&h=100&fit=fill`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinGallery;