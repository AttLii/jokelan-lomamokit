import { FC } from "react"
import { IconProps } from "../../../types/icon"

export const ArrowUp: FC<IconProps> = (({ className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className={`lucide lucide-arrow-up ${className}`}>
      <line x1="12" x2="12" y1="19" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
})