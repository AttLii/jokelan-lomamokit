import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Section } from "../components/Section";
import { Container } from "../components/Container";
import { t } from "~/stores/translation";

export default component$(() => {
  return (
    <Section>
      <Container type="wide" class="text-center rich-text">
        <h1>{t('404.page.title')}</h1>
        <Link href="/">{t('404.page.link')}</Link>
      </Container>
    </Section>
  )
});
