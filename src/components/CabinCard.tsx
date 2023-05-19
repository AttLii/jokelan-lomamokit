import { FC } from "react"
import { ParsedCabinReference } from "../parsers/contentful"
import { useT } from "../contexts/stringTranslations"
import { AssetImage } from "./AssetImage"
import { IconLink } from "./ChevronLink"

type Props = {
  cabin: ParsedCabinReference
}
export const CabinCard: FC<Props> = ({ cabin: { path, title, image } }) => {
  const label = useT('generic.read.more')
  return (
    <article className="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      {image && (
        <AssetImage
          alt=""
          width={608}
          height={456}
          loading="lazy"
          src={`${image.src}&w=608&h=456&fit=fill`}
        />
      )}
      <div className="p-4 border-black border-t-2">
        <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
        <IconLink href={path}>{label}</IconLink>
      </div>
    </article>
  )
}