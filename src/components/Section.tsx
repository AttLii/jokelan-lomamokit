import { FC, PropsWithChildren } from "react";

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="py-10">
      {children}
    </section>
  );
};