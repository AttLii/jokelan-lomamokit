import { Link } from "@builder.io/qwik-city"
import { LuChevronRight, LuHome } from "@qwikest/icons/lucide"
import { Container } from "./Container"
import { translations } from "~/constants/translations"
import { parseBreadcrumbsToJsonLD } from "~/utils/seo"
import type { Breadcrumb } from "~/parsers/contentful"

type Props = {
  breadcrumbs: Breadcrumb[]
}
export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  if (breadcrumbs.length === 0) return null
  const jsonLD = parseBreadcrumbsToJsonLD(breadcrumbs)
  return (
    <Container type="wide" _class="bg-[#f7f7f7] py-1">
      <nav aria-label={translations.ariaLabelBreadcrumbs}>
        <ul class="flex flex-wrap gap-1 text-sm">
          {breadcrumbs.map(({ name, path }, i) => (
            <li key={i} class="flex flex-nowrap gap-1 items-center">
              <Link
                href={path}
                class="hover:underline focus:underline flex flex-nowrap items-center gap-0.5"
                aria-current={i === breadcrumbs.length - 1 ? "location" : undefined}
              >
                {i === 0 ? (
                  <>
                    <LuHome />
                    <span class="sr-only">{name}</span>
                  </>
                ) : (
                  name
                )}
              </Link>
              {i !== breadcrumbs.length - 1 && (
                <LuChevronRight />
              )}
            </li>
          ))}
        </ul>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
    </Container>
  )
}