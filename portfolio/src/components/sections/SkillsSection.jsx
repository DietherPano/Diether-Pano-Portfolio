export default function SkillsSection({ skillCards }) {
  return (
    <section id="skills" className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Skills</h2>
        <p className="text-sm text-slate-300">Tooling and technologies I use to ship reliable products.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillCards.map((group) => (
          <article key={group.title} className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5">
            <div className="grid h-10 w-10 place-content-center rounded-xl border border-cyan-300/40 bg-cyan-500/10 text-sm font-semibold text-cyan-100">
              {group.iconUrl ? (
                <img src={group.iconUrl} alt={group.iconAlt || `${group.title} logo`} className="h-6 w-6 object-contain" />
              ) : (
                group.icon
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{group.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{group.description}</p>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
