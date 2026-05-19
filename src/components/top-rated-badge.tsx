export function TopRatedBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#6557ff]/15 bg-gradient-to-r from-[#6557ff]/8 to-[#f74dc7]/8 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#6557ff]">
      <svg
        className="h-3 w-3 shrink-0 text-[#6557ff]"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M16.704 5.612a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.5 12.086l6.543-6.543a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Top rated
    </span>
  );
}
