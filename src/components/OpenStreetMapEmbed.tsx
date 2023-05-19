import type { EntryFields } from "contentful";
import { FC } from "react";

type Props = {
  title: string;
  location: EntryFields.Location
}
export const OpenStreetMapEmbed: FC<Props> = (({ title, location }) => {
  const { lat, lon } = location;
  return (
    <div className="relative w-full aspect-square sm:aspect-16/9 border-black border-2 rounded-md overflow-hidden">
      <iframe
        title={title}
        loading="lazy"
        className="absolute w-full h-full"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}&marker=${lat},${lon}`}
      />
    </div>
  );
});