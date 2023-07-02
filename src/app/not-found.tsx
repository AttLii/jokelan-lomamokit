"use client";

import Link from "next/link";
import Container from "../components/Container";
import Section from "../components/Section";
import useT from "../hooks/useT";

export default function NotFound() {
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
}
