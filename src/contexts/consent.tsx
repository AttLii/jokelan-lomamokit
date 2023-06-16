import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useCallback, useState, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { z } from "zod";

const consentCategorySchema = z.enum(['openStreetMap', 'contactForm']);
export type ConsentCategories = z.infer<typeof consentCategorySchema>

type ConsentContextShape = {
  categories: {
    [K in ConsentCategories]: {
      accepted: boolean,
      title: string,
    }
  }
  actions: {
    toggleConsent: (consentName: ConsentCategories) => void
  }
};

type ConsentContextCategories = ConsentContextShape['categories']

const ConsentContext = createContext<undefined | ConsentContextShape>(
  undefined
);

export const useConsentContext = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be within ConsentContext.Provider");
  }

  return context;
};

const STORAGE_KEY = "jlmconsent";

const initialCategoriesState: ConsentContextCategories = {
  openStreetMap: {
    accepted: false,
    title: "Open Street Map"
  },
  contactForm: {
    accepted: false,
    title: "Yhteystietolomake"
  }
};

export const ConsentContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<ConsentContextCategories>(initialCategoriesState);

  useEffect(() => {
    const prevValue = Cookies.get(STORAGE_KEY);
    let cookieValues: ConsentCategories[] = [];
    if (prevValue) {
      try {
        cookieValues = z.array(consentCategorySchema).parse(JSON.parse(prevValue));
      } catch {
        Cookies.remove(STORAGE_KEY);
      }
    }

    const initialState = JSON.parse(JSON.stringify(initialCategoriesState)) as ConsentContextCategories;
    for (const key of cookieValues) {
      if (key in initialState) {
        initialState[key].accepted = true;
      }
    }

    setCategories(initialState);
  }, []);

  const toggleConsent = useCallback((categoryName: ConsentCategories) => {
    setCategories((_categories) => ({
      ..._categories,
      [categoryName]: {
        ..._categories[categoryName],
        accepted: !_categories[categoryName].accepted
      }
    }));

    const prevValue = Cookies.get(STORAGE_KEY);
    let newValue: string[] = [];
    if (prevValue) {
      try {
        newValue = z.array(z.string()).parse(JSON.parse(prevValue));
      } catch {
        Cookies.remove(STORAGE_KEY);
      }
    }

    const index = newValue.indexOf(categoryName);
    index === -1
      ? newValue.push(categoryName)
      : newValue.splice(index, 1);

    Cookies.set(STORAGE_KEY, JSON.stringify(newValue), {
      expires: 7,
      sameSite: "strict",
      secure: true
    });
  }, [setCategories]);

  return (
    <ConsentContext.Provider value={{
      categories,
      actions: {
        toggleConsent
      }
    }}>
      {children}
    </ConsentContext.Provider>
  );
}; 