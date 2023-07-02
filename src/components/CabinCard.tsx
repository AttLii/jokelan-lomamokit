import type { ParsedCabinReference } from "../parsers/contentful";
import AssetImage from "./AssetImage";
import CabinCardLink from "./CabinCardLink";

type Props = {
  cabin: ParsedCabinReference
}
export default function CabinCard({ cabin: { path, title, image } }: Props) {
  return (
    <article className="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      {image && (
        <AssetImage
          className="aspect-4/3 object-cover w-full"
          alt=""
          src={image.src}
          fit="fill"
          height="452"
          width="603"
          srcSet={{
            "(min-width: 640px)": {
              fit: "fill",
              height: "267",
              width: "356",
            },
            "(min-width: 768px)": {
              fit: "fill",
              height: "222",
              width: "296",
            }
          }}
        />
      )}
      <div className="p-4 border-black border-t-2">
        <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
        <CabinCardLink href={path} />
      </div>
    </article>
  );
}
