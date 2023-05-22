import type { FC } from "react";
import { useMemo } from "react";
import type { ParsedFiftyFifty } from "../../parsers/contentful";
import AssetImage from "../AssetImage";
import RichText from "../RichText";
import Container from "../Container";
import Section from "../Section";

type Props = {
  section: ParsedFiftyFifty
}
const FiftyFifty: FC<Props> = (({ section: { image, richText, order } }) => {
  const orderClass = useMemo(() => order === "Image-Text" ? "md:order-first" : "md:order-last", [order]);
  return (
    <Section>
      <Container type="wide" className="grid gap-y-4 gap-x-8 grid-cols-1 md:grid-cols-2">
        <div className={`
          my-auto relative border-black border-2 rounded-md overflow-hidden
          aspect-square
          md:aspect-auto md:h-full
          ${orderClass}
        `}>
          {image && (
            <AssetImage
              alt={image.alt}
              className="absolute top-0 left-0 w-full h-full object-center object-cover"
              src={image.src}
              height="616"
              width="616"
              fit="fill"
            />
          )}
        </div>
        <div className="my-auto md:py-8">
          <RichText html={richText} />
        </div>
      </Container>
    </Section>
  );
});

export default FiftyFifty;