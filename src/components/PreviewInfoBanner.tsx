"use client";
import { usePathname } from "next/navigation";
import { X } from "./icons/lucide";

export default function PreviewInfoBanner() {
  const path = usePathname();
  return (
    <a href={`/api/disable-draft?path=${path}`} className="fixed bottom-0 left-0 w-full p-4 z-50 bg-white border-black border-2">
      <div className="flex flex-row flex-nowrap gap-4 justify-between items-center">
        Draftmode turned on
        <X />
      </div>
    </a>
  );
}