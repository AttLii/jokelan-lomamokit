import type { EntryFields } from "contentful";
import type { FC } from "react";
import { useConsentContext } from "../contexts/consent";
import { useT } from "../contexts/stringTranslations";

type Props = {
  title: string;
  location: EntryFields.Location
}
const OpenStreetMapEmbed: FC<Props> = (({ title, location: { lat, lon } }) => {
  const consentLabel = useT('generic.map.consent');
  const consentContext = useConsentContext();
  const onClick = () => consentContext.actions.toggleConsent('openStreetMap');
  return (
    <div className="relative w-full aspect-square sm:aspect-16/9 border-black border-2 rounded-md overflow-hidden">
      {consentContext.categories.openStreetMap.accepted
        ? (
          <iframe
            title={title}
            loading="lazy"
            className="absolute w-full h-full"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}&marker=${lat},${lon}`}
          />
        ) : (
          <button onClick={onClick} className="text-center font-sans absolute w-full h-full flex flex-col justify-center items-center p-10 bg-slate-300">
            {consentLabel}
          </button>
        )
      }
    </div>
  );
});

export default OpenStreetMapEmbed;