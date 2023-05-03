import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { Container } from "./Container"
import { ChevronRight } from "./icons/ChevronRight"
import { Home } from "./icons/Home"
import { parseBreadcrumbsToJsonLD } from "~/utils/seo"
import { t } from "~/stores/translation"
import type { Breadcrumb } from "~/parsers/contentful"

type Props = {
  breadcrumbs: Breadcrumb[]
}
export const Breadcrumbs = component$<Props>(({ breadcrumbs }) => {
  if (breadcrumbs.length === 0) return null
  const jsonLD = parseBreadcrumbsToJsonLD(breadcrumbs)
  return (
    <div class="border-b-2 border-black bg-slate-100 py-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
      <Container type="wide">
        <nav aria-label={t("aria.label.breadcrumbs")}>
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
                          <Home class="text-small" />
                          <span class="sr-only">{name}</span>
                        </>
                      ) : (
                        name
                      )}
                    </Link>
                    <ChevronRight />
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  )
})