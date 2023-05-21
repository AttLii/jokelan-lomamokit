import type { FC, PropsWithChildren } from "react";

const Section: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="py-10">
      {children}
    </section>
  );
};
export default Section;