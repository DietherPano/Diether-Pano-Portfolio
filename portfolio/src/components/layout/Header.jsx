export default function Header({ navItems, socialLinks }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Go to top">
          <span className="grid h-9 w-9 place-content-center rounded-xl bg-cyan-500/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
            DP
          </span>
          <strong className="text-sm font-semibold tracking-wide text-slate-100 sm:text-base">Diether Pano</strong>
        </a>

        <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-label={item.label}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
