import { component$ } from "@builder.io/qwik";
import type { EntryFields } from "contentful";

type Props = {
  title: string;
  location: EntryFields.Location
}
export const OpenStreetMapEmbed = component$(({ title, location: { lat, lon } }: Props) => {
  return (
    <div class="relative w-full aspect-square sm:aspect-16/9 border-black border-2 rounded-md overflow-hidden">
      <iframe
        loading="lazy"
        title={title}
        class="absolute w-full h-full"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}&marker=${lat},${lon}`}
      />
    </div>
  )
})