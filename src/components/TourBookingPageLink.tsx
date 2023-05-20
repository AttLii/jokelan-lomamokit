import type { FC } from "react";
import { useT } from "../contexts/stringTranslations";
import { ActionLink } from "./ActionLink";

type Props = {
  tourBookingPage: string | null;
  name: string;
  className?: string;
}
export const TourBookingPageLink: FC<Props> = ({ tourBookingPage, name, className = "" }) => {
  const linkLabel = useT('cabin.action.link.text');
  const disabledLabel = useT('cabin.action.link.disabled.help');

  return (
    <div className={`font-sans ${className}`}>
      {tourBookingPage
        ? <ActionLink href={tourBookingPage}>{linkLabel} {name}</ActionLink>
        : (
          <>
            <ActionLink href="#" disabled>{linkLabel} {name}</ActionLink>
            <p className="text-sm mt-1">{disabledLabel}</p>
          </>
        )}
    </div>
  );
};