import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { ParsedImageAsset } from "~/parsers/contentful";
import { AssetImage } from "./AssetImage";

type Props = {
  images: ParsedImageAsset[]
}
export const Carousel = component$(({ images }: Props) => {
  const index = useSignal(0);
  useVisibleTask$(() => {
    const onInterval = () => {
      if (index.value === images.length - 1) {
        index.value = 0;
      } else {
        index.value++;
      }
    }
    const timer = setInterval(onInterval, 5000);
    return () => clearInterval(timer);
  });
  return (
    <ul class="flex h-full transition-all duration-1000" style={{ transform: `translateX(${index.value === 0 ? 0 : index.value * 100 * -1}%)` }}>
      {images.map(({ src, ...rest }, i) => (
        <li class="min-w-full relative" key={i}>
          <AssetImage
            {...rest}
            _class="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
            src={`${src}&w=639&h=1136&fit=fill`}
            srcSet={{
              '(min-width: 640px)': `${src}&w=1920&h=1080&fit=fill`
            }}
          />
        </li>
      ))}
    </ul>
  )
})