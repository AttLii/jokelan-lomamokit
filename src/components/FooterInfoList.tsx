import type { FC } from "react";
import { Fragment } from "react";
import { useGlobalContentContext } from "../contexts/globalContent";
import { Mail, MapPin, Phone } from "./icons/lucide";
import RichText from "./RichText";

const FooterInfoList: FC = () => {
  const context = useGlobalContentContext();
  if (!context.localBusiness) return <Fragment />;

  const {
    name,
    telephone,
    email,
    address,
    geo: {
      latitude,
      longitude
    }
  } = context.localBusiness;
  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-1.5">{name}</h2>
      <ul className="flex flex-col gap-0.5">
        <li className="flex gap-2 items-start">
          <Phone className="mt-2" />
          <RichText html={`<a href="tel:${telephone}">${telephone}</a>`} />
        </li>
        <li className="flex gap-2 items-start">
          <Mail className="mt-2" />
          <RichText html={`<a href="mailto:${email}">${email}</a>`} />
        </li>
        {address && (
          <li className="flex gap-2 items-start">
            <MapPin className="mt-2" />
            <RichText
              html={`
                <a
                  href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=14/${latitude}/${longitude}"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ${address.streetAddress}, ${address.postalCode} ${address.addressLocality}
                </a>
              `}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default FooterInfoList;