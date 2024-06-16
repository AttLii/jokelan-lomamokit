'use client';
import type { MouseEventHandler } from 'react';
import type { ParsedAssetImage } from '../parsers/contentful';
import { useEffect, useRef, useState } from 'react';
import AssetImage from './AssetImage';
import { Scaling, X } from './icons/lucide';
import useT from '../hooks/useT';

type Props = {
  gallery: ParsedAssetImage[];
};
export default function CabinGallery({ gallery }: Props) {
  const goToLabel = useT('cabin.gallery.go.to');
  const openDialogLabel = useT('cabin.gallery.dialog.open');
  const closeDialogLabel = useT('cabin.gallery.dialog.close');

  const dialog = useRef<HTMLDialogElement | null>(null);
  const scrollContainer = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const onClick = (i: number) => setIndex(i);

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
    child.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'end',
    });
  }, [index, scrollContainer, gallery.length]);
  return (
    <div className='flex flex-col gap-2'>
      {gallery[index] && (
        <dialog
          ref={dialog}
          className='relative rounded-md border-2 border-black p-0'
          onClick={onDialogClick}
        >
          <div className='p-4 pt-10'>
            <button
              className='absolute right-4 top-1 ml-auto p-1 text-2xl'
              aria-label={closeDialogLabel}
              onClick={closeDialog}
            >
              <X />
            </button>
            <AssetImage
              alt=''
              width={gallery[index].width}
              height={gallery[index].height}
              src={gallery[index].src}
            />
          </div>
        </dialog>
      )}
      <div>
        <div className='relative overflow-hidden rounded-md border-2 border-black bg-slate-100'>
          <ul
            className='flex flex-nowrap transition-transform duration-1000'
            style={{
              transform: `translateX(${index === 0 ? 0 : index * 100 * -1}%)`,
            }}
          >
            {gallery.map(({ src }, i) => (
              <li key={i} className='min-w-full'>
                <AssetImage
                  className='mx-auto aspect-16/9 object-contain'
                  alt=''
                  loading={i === 0 ? 'eager' : 'lazy'}
                  src={src}
                  fit='pad'
                  width='731'
                  height='411'
                  srcSet={{
                    '(min-width: 768px)': {
                      fit: 'pad',
                      width: '933',
                      height: '525',
                    },
                  }}
                />
              </li>
            ))}
          </ul>

          {gallery[index] && (
            <button
              onClick={openDialog}
              className='absolute right-1 top-1 rounded-md border-2 border-black bg-slate-200 p-1 text-2xl transition-all hover:bg-slate-300 focus:bg-slate-300'
              aria-label={openDialogLabel}
            >
              <Scaling />
            </button>
          )}
          <span className='absolute bottom-1 right-1 rounded-md border-2 border-black bg-slate-200 p-1 font-sans leading-none'>
            {index + 1} / {gallery.length}
          </span>
        </div>
        {gallery[index] && (
          <p className='mt-1 text-center font-sans'>{gallery[index].alt}</p>
        )}
      </div>

      <ul
        ref={scrollContainer}
        className='-md:mx-2 -mx-1 flex snap-x flex-nowrap overflow-x-scroll pb-2'
      >
        {gallery.map(({ src }, i) => (
          <li key={i} className='-md:mx-2 w-[20%] min-w-[20%] snap-start px-1'>
            <button
              onClick={() => onClick(i)}
              className={`${index === i ? 'overflow-hidden rounded-md outline-double outline-2 -outline-offset-2 outline-black' : ''}`}
            >
              <AssetImage
                className='aspect-2/1 w-full'
                alt={`${goToLabel} ${i + 1}`}
                src={src}
                loading={i <= 5 ? 'eager' : 'lazy'}
                fit='fill'
                width='150'
                height='75'
                srcSet={{
                  '(min-width: 768px)': {
                    fit: 'fill',
                    width: '180',
                    height: '90',
                  },
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
