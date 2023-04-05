import { component$ } from "@builder.io/qwik";
import type { EntryFields } from "contentful";

type Props = {
  title: string;
  location: EntryFields.Location
}
export const OpenStreetMapEmbed = component$(({ title, location: { lat, lon } }: Props) => {
  return (
    <div class="relative w-full aspect-16/9">
      <iframe
        title={title}
        class="absolute w-full h-full"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}`}
      />
    </div>
  )
})