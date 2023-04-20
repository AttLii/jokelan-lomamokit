import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Section } from "./Section";
import { Container } from "./Container";
import { translations } from "~/constants/translations";

export const ErrorPage = component$(() => {
  return (
    <Section>
      <Container type="wide" class="text-center rich-text">
        <h1>{translations["404PageTitle"]}</h1>
        <Link href="/">{translations["404PageLink"]}</Link>
      </Container>
    </Section>
  )
});
