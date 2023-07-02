import globalContent from "../prevals/globalContent.preval";
import { Mail, MapPin, Phone } from "./icons/lucide";
import RichText from "./RichText";

export default function FooterInfoList() {
  if (!globalContent.localBusiness) return null;

  const {
    name,
    telephone,
    email,
    address,
    geo: {
      latitude,
      longitude
    }
  } = globalContent.localBusiness;

  const infoItems = [
    {
      Icon: Phone,
      html: `<a href="tel:${telephone}">${telephone}</a>`
    },
    {
      Icon: Mail,
      html: `<a href="mailto:${email}">${email}</a>`
    },
  ];
  if (address) {
    infoItems.push({
      Icon: MapPin,
      html: `
        <a
          href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=14/${latitude}/${longitude}"
          rel="noopener noreferrer"
          target="_blank"
        >
          ${address.streetAddress}, ${address.postalCode} ${address.addressLocality}
        </a>
      `
    });
  }
  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-1.5">{name}</h2>
      <ul className="flex flex-col gap-0.5">
        {infoItems.map(({ Icon, html }, i) => (
          <li key={i} className="flex gap-2 items-start">
            <Icon className="mt-2" />
            <RichText html={html} />
          </li>
        ))}
      </ul>
    </div>
  );
}