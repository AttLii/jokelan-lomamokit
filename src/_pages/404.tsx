import type { FC } from "react";
import Link from "next/link";
import { useT } from "../contexts/stringTranslations";
import Container from "../components/Container";
import Section from "../components/Section";

const Custom404: FC = () => {
  const titleLabel = useT('404.page.title');
  const linkLabel = useT('404.page.link');
  return (
    <Section>
      <Container type="wide" className="text-center rich-text">
        <h1>{titleLabel}</h1>
        <Link href="/">{linkLabel}</Link>
      </Container>
    </Section>
  );
};

export default Custom404;