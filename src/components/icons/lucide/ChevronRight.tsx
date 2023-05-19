import { FC } from "react"
import { IconProps } from "../../../types/icon"

export const ChevronRight: FC<IconProps> = ({ className = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-right ${className}`}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}