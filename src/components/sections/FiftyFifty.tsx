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
  const orderClass = useMemo(() => order === "Image-Text" ? "lg:order-first" : "lg:order-last", [order]);
  return (
    <Section>
      <Container type="wide" className="grid gap-y-4 gap-x-8 grid-cols-1 lg:grid-cols-2">
        <div className={`
          my-auto relative border-black border-2 rounded-md overflow-hidden
          aspect-square
          lg:aspect-auto lg:h-full
          ${orderClass}
        `}>
          {image && (
            <AssetImage
              className="absolute top-0 left-0 w-full h-full object-center object-cover"
              alt={image.alt}
              src={image.src}
              fit="fill"
              height="731"
              width="731"
              srcSet={{
                "(min-width: 1024px)": {
                  fit: "fill",
                  height: "604",
                  width: "604",
                }
              }}
            />
          )}
        </div>
        <div className="my-auto lg:py-8">
          <RichText html={richText} />
        </div>
      </Container>
    </Section>
  );
});

export default FiftyFifty;