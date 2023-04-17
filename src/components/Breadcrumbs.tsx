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
    <div class="border-b-2 border-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
      <Container type="wide" _class="bg-[#f7f7f7] py-1">
        <nav aria-label={translations.ariaLabelBreadcrumbs}>
          <ul class="flex flex-wrap gap-1 text-sm">
            {breadcrumbs.map(({ name, path }, i) => (
              <li key={i} class="flex flex-nowrap gap-1 items-center">
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="location">
                    {name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={path}
                      class="underline hover:no-underline focus:no-underline"
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
                    <LuChevronRight />
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  )
}