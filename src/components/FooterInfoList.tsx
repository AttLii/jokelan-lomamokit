import { component$, useContext } from "@builder.io/qwik";
import { RichText } from "./RichText";
import { Mail } from "./icons/Mail";
import { MapPin } from "./icons/MapPin";
import { Phone } from "./icons/Phone";
import { GlobalContentContext } from "~/root";

export const FooterInfoList = component$(() => {
  const {
    localBusiness: {
      name,
      telephone,
      email,
      address: {
        streetAddress,
        postalCode,
        addressLocality
      },
      geo: {
        latitude,
        longitude
      }
    }
  } = useContext(GlobalContentContext)
  return (
    <div>
      <h2 class="text-2xl font-display font-bold mb-1.5">{name}</h2>
      <ul class="flex flex-col gap-0.5">
        <li class="flex gap-2 items-start">
          <Phone class="mt-2" />
          <RichText dangerouslySetInnerHTML={`<a href="tel:${telephone}">${telephone}</a>`} />
        </li>
        <li class="flex gap-2 items-start">
          <Mail class="mt-2" />
          <RichText dangerouslySetInnerHTML={`<a href="mailto:${email}">${email}</a>`} />
        </li>
        <li class="flex gap-2 items-start">
          <MapPin class="mt-2" />
          <RichText
            dangerouslySetInnerHTML={`
                <a
                  href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=14/${latitude}/${longitude}"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ${streetAddress}, ${postalCode} ${addressLocality}
                </a>
              `} />
        </li>
      </ul>
    </div>
  )
}) 