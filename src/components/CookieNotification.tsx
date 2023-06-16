import type { ConsentCategories } from "../contexts/consent";
import { useMemo, useState } from "react";
import Cog from "./icons/lucide/Cog";
import Dialog from "./Dialog";
import ToggleSwitch from "./ToggleSwitch";
import { useConsentContext } from "../contexts/consent";
import { useT } from "../contexts/stringTranslations";

export default function CookieNotification() {
  const [show, setShow] = useState(false);
  const openDialogLabel = useT("cookie.notification.open.label");
  const title = useT("cookie.notification.title");
  const description = useT("cookie.notification.description");
  const toggleSwitchOn = useT("cookie.notification.category.on");
  const toggleSwitchOff = useT("cookie.notification.category.off");
  const toggleSwitchAll = useT("cookie.notification.category.all");
  const consentContext = useConsentContext();
  const categories = Object.keys(consentContext.categories) as ConsentCategories[];

  const allCategoriesAccepted = useMemo(() => {
    return categories.every(x => consentContext.categories[x].accepted);
  }, [consentContext, categories]);

  const toggleAll = () => {
    for (const c of categories) {
      if (allCategoriesAccepted || !consentContext.categories[c].accepted) {
        consentContext.actions.toggleConsent(c);
      }
    }
  };

  const onClick = () => setShow(true);
  return (
    <>
      <button
        onClick={onClick}
        className="
          outline-none
          flex justify-center items-center text-2xl z-10 fixed bottom-4 left-4 aspect-square w-10 bg-slate-100 rounded-full border-2 border-black
          focus:scale-110 hover:scale-110 transition-transform
        "
        aria-label={openDialogLabel}
      >
        <Cog />
      </button>
      <Dialog show={show} setShow={setShow}>
        <div>
          <p className="font-display uppercase mb-2">
            {title}
          </p>
          <p className="font-sans mb-4">
            {description}
          </p>
          <ul className="flex flex-col gap-2 max-w-md">
            {categories.map(c => {
              return (
                <li key={c}>
                  <p className="font-sans">{consentContext.categories[c].title}</p>
                  <ToggleSwitch
                    value={consentContext.categories[c].accepted}
                    onClick={() => consentContext.actions.toggleConsent(c)}
                    ariaLabel={consentContext.categories[c].accepted ? toggleSwitchOn : toggleSwitchOff}
                  />
                </li>
              );
            })}
            <li className="mt-8">
              <p className="font-sans">{toggleSwitchAll}</p>
              <ToggleSwitch
                value={allCategoriesAccepted}
                onClick={toggleAll}
                ariaLabel={allCategoriesAccepted ? toggleSwitchOn : toggleSwitchOff}
              />
            </li>
          </ul>
        </div>
      </Dialog>
    </>
  );
}