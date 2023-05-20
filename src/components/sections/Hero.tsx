import type { FC } from "react";
import type { ParsedHero } from "../../parsers/contentful";
import { Carousel } from "../Carousel";
import { RichText } from "../RichText";

type Props = {
  section: ParsedHero
}
export const Hero: FC<Props> = ({
  section: {
    gallery,
    richText
  }
}) => {
  return (
    <section className="relative overflow-hidden aspect-[9/16] sm:aspect-[16/9] z-0 max-h-[50rem] w-full border-black border-b-2">
      <Carousel images={gallery} />
      <div className="flex items-center justify-center p-4 absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10">
        <RichText
          className="h-max w-full max-w-xl text-white"
          html={richText}
        />
      </div>
    </section>
  );
};