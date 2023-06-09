"use client";

import useT from "../hooks/useT";

export default function SkipToContent() {
  const label = useT("generic.skip.to.content");
  const onClick = () => document.querySelector("main")?.focus();
  return (
    <button
      className="
        z-50 left-1/2 fixed -translate-x-1/2 -translate-y-full focus:translate-y-0 -top-1 focus:top-1
        transition duration-0
        font-sans color-black bg-slate-300 rounded-md p-2 border-black border-2
      "
      onClick={onClick}
    >
      {label}
    </button>
  );
}