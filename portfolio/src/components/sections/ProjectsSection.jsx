import { getLanguageColor, getLanguageTextColor } from '../../utils/languageColors'

function TechTag({ label }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: getLanguageColor(label), color: getLanguageTextColor(label) }}
    >
      {label}
    </span>
  )
}

function RepoCard({ repo }) {
  return (
    <a
      className="hover-lift flex h-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-300/40"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
    >
      <h4 className="text-base font-semibold text-slate-100">{repo.name}</h4>
      <p className="text-sm leading-relaxed text-slate-300">{repo.description || 'No description available.'}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {repo.languageStats?.map((tech) => (
          <TechTag key={`${repo.id}-${tech.name}`} label={tech.name} />
        ))}
      </div>
    </a>
  )
}

function ProjectGroup({ title, delay = '0ms', children }) {
  return (
    <div
      className="dev-panel reveal-up space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5"
      style={{ '--reveal-delay': delay }}
    >
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </div>
  )
}

export default function ProjectsSection({ githubData, deployedProjects }) {
  return (
    <section id="projects" className="reveal-up space-y-5" style={{ '--reveal-delay': '180ms' }}>
      <h2 className="dev-section-title text-2xl font-semibold text-slate-50 sm:text-3xl">Projects</h2>

      <div className="space-y-5">
        <ProjectGroup title="Personal Projects" delay="240ms">
          {githubData.personalProjects.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </ProjectGroup>

        <ProjectGroup title="Deployed Projects" delay="300ms">
          {deployedProjects.map((project) => (
            <a
              key={project.name}
              className="hover-lift flex h-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-300/40"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-40 w-full rounded-lg border border-slate-700 object-cover"
                src={project.previewImage}
                alt={`${project.name} preview`}
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-base font-semibold text-slate-100">{project.name}</h4>
                <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200">
                  Live
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <TechTag key={`${project.name}-${tech}`} label={tech} />
                ))}
              </div>
            </a>
          ))}
        </ProjectGroup>
      </div>
    </section>
  )
}
