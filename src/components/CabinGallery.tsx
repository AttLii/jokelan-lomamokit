import type { FC } from "react";
import type { ParsedAssetImage } from "../parsers/contentful";
import { useEffect, useRef, useState } from "react";
import AssetImage from "./AssetImage";
import Dialog from "./Dialog";
import { Scaling } from "./icons/lucide";
import { useT } from "../contexts/stringTranslations";

type Props = {
  gallery: ParsedAssetImage[]
}
const CabinGallery: FC<Props> = ({ gallery }) => {
  const scrollContainer = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const onClick = (i: number) => setIndex(i);
  const goToLabel = useT('cabin.gallery.go.to');

  const [show, setShow] = useState(false);
  const openDialog = () => setShow(true);
  const openDialogLabel = useT("cabin.gallery.dialog.open");

  useEffect(() => {
    if (!scrollContainer.current || gallery.length === 0) return;

    const child = scrollContainer.current.children[index];
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "end" });
  }, [index, scrollContainer, gallery.length]);

  return (
    <div className="flex flex-col gap-2">
      <Dialog show={show} setShow={setShow}>
        {gallery[index] && (
          <AssetImage
            alt=""
            width={gallery[index].width}
            height={gallery[index].height}
            src={gallery[index].src}
          />
        )}
      </Dialog>
      <div>
        <div className="border-2 border-black rounded-md overflow-hidden relative bg-slate-100">
          <ul className="flex flex-nowrap transition-transform duration-1000" style={{
            transform: `translateX(${index === 0 ? 0 : index * 100 * -1}%)`
          }}>
            {gallery.map(({ src }, i) => (
              <li key={i} className="min-w-full">
                <AssetImage
                  className="mx-auto aspect-16/9 object-contain"
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  src={src}
                  fit="pad"
                  width="731"
                  height="411"
                  srcSet={[
                    {
                      media: "(min-width: 768px)",
                      fit: "pad",
                      width: "933",
                      height: "525",
                    }
                  ]}
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
                className="aspect-2/1 w-full"
                alt={`${goToLabel} ${i + 1}`}
                src={src}
                loading={i <= 5 ? "eager" : "lazy"}
                fit="fill"
                width="150"
                height="75"
                srcSet={[
                  {
                    media: "(min-width: 768px)",
                    fit: "fill",
                    width: "180",
                    height: "90",
                  }
                ]}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinGallery;