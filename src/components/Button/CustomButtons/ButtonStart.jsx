"use client";

export default function ButtonStart({ onClick, text }) {
  return (
    <button
      className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
      onClick={onClick}
    >
      {/* ❇️ soft green “shadow” layer */}
      <span className="absolute inset-0 rounded-lg bg-emerald-400/25 translate-y-0.5 transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />

      {/* ❇️ subtle dark-green bevel */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-l from-[hsl(145,30%,18%)] via-[hsl(145,30%,28%)] to-[hsl(145,30%,18%)]" />

      {/* ---- main clickable surface ---- */}
      <div className="relative flex items-center gap-3 px-6 py-3 rounded-lg text-lg text-white -translate-y-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
        <span className="select-none">{text}</span>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 ml-2 -mr-1 transition duration-300 group-hover:translate-x-1"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          />
        </svg>
      </div>
    </button>
  );
}
