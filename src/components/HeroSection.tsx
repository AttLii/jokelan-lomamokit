import type { ParsedHero } from "~/parsers/contentful"

type Props = ParsedHero
export const HeroSection = (props: Props) => {
  console.log(props)
  return (
    <section>
      Hero
    </section>
  )
}