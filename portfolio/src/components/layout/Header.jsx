import { useState } from 'react'

export default function Header({ navItems, socialLinks }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault()
    closeMenu()

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', '#home')
      return
    }

    const section = document.getElementById(sectionId)
    if (!section) return

    const header = document.querySelector('header')
    const headerOffset = header?.offsetHeight || 0
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset - 8

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Go to top" onClick={scrollToSection('home')}>
            <span className="brand-node grid h-9 w-9 shrink-0 place-content-center rounded-xl bg-cyan-500/20 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
              DP
            </span>
            <strong className="truncate text-sm font-semibold tracking-wide text-slate-100 sm:text-base">Diether Pano</strong>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-slate-300 min-[700px]:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                onClick={scrollToSection(item.toLowerCase())}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <div className="hidden items-center gap-1 min-[700px]:flex">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200 sm:p-2"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200 min-[700px]:hidden"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <nav
          aria-hidden={!menuOpen}
          className={`mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/95 text-sm text-slate-200 transition-all duration-300 ease-out min-[700px]:hidden ${
            menuOpen
              ? 'max-h-[420px] translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          }`}
        >
          <div className="grid gap-2 p-3">
            {navItems.map((item) => (
              <a
                key={`mobile-${item}`}
                href={`#${item.toLowerCase()}`}
                className="rounded-lg px-3 py-2 transition hover:bg-slate-800 hover:text-cyan-200"
                onClick={scrollToSection(item.toLowerCase())}
              >
                {item}
              </a>
            ))}

            <div className="mt-1 h-px bg-slate-800" />

            <div className="flex flex-wrap gap-2 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={`mobile-social-${item.id}`}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
