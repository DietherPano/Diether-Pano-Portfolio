import { useEffect, useRef } from 'react'

const contributionLevels = {
  l0: 'bg-slate-700/60 ring-1 ring-slate-600/70',
  l1: 'bg-emerald-200',
  l2: 'bg-emerald-300',
  l3: 'bg-emerald-500',
  l4: 'bg-emerald-700',
}

export default function AboutSection({
  githubData,
  githubUsername,
  selectedYear,
  setSelectedYear,
  yearOptions,
}) {
  const chartScrollRef = useRef(null)
  const organizations = githubData.profile?.organizations || []

  const visibleMonthMarkers = githubData.monthMarkers.reduce((acc, marker) => {
    if (!acc.length) {
      acc.push(marker)
      return acc
    }

    const previous = acc[acc.length - 1]
    if (marker.weekIndex - previous.weekIndex >= 2) {
      acc.push(marker)
    }

    return acc
  }, [])

  useEffect(() => {
    if (chartScrollRef.current) {
      chartScrollRef.current.scrollLeft = 0
    }
  }, [selectedYear, githubData.monthMarkers])

  return (
    <section id="about" className="reveal-up space-y-5" style={{ '--reveal-delay': '360ms' }}>
      <h2 className="dev-section-title text-2xl font-semibold text-slate-50 sm:text-3xl">About Me</h2>

      <div className="grid gap-6 min-[700px]:grid-cols-[280px_minmax(0,1fr)] min-[700px]:items-start">
        <aside
          className="reveal-up flex h-fit flex-col items-center space-y-5 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5 text-center"
          style={{ '--reveal-delay': '420ms' }}
        >
          <div className="relative w-fit">
            <img
              src={githubData.profile?.avatarUrl || `https://github.com/${githubUsername}.png`}
              alt="GitHub profile"
              className="h-28 w-28 rounded-full border-2 border-slate-600 object-cover"
            />
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-slate-900 bg-emerald-400" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xl font-semibold text-slate-100">
              {githubData.loading ? 'Loading...' : githubData.profile?.name}
            </h3>
            <p className="text-sm text-cyan-200">
              {githubData.loading ? '@user' : `@${githubData.profile?.login} · developer`}
            </p>
          </div>
          <p className="max-w-[230px] text-sm leading-relaxed text-slate-300">
            {githubData.loading ? 'Fetching profile...' : githubData.profile?.bio}
          </p>
          <a
            className="inline-flex rounded-xl border border-cyan-400/50 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/10"
            href={githubData.profile?.profileUrl || `https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile
          </a>
          <ul className="w-full max-w-[230px] space-y-2 text-center text-sm text-slate-300">
            <li>
              {githubData.loading
                ? '0 followers • 0 following'
                : `${githubData.profile?.followers} followers • ${githubData.profile?.following} following`}
            </li>
            <li>{githubData.loading ? 'Unknown location' : githubData.profile?.location}</li>
            {githubData.profile?.company && <li>{githubData.profile.company}</li>}
            <li>
              <a
                href={githubData.profile?.blog || `https://github.com/${githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-200 hover:underline"
              >
                {githubData.profile?.blog || 'github.com'}
              </a>
            </li>
            {githubData.profile?.twitter && <li>@{githubData.profile.twitter}</li>}
          </ul>

          <div className="h-px w-full bg-slate-800" />

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Highlights</p>
            <div className="grid w-full grid-cols-2 gap-2 text-left">
              <div className="rounded-lg border border-slate-700/80 bg-slate-800/40 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Repos</p>
                <p className="text-sm font-semibold text-slate-100">{githubData.repositoryCount || 0}</p>
              </div>
              <div className="rounded-lg border border-slate-700/80 bg-slate-800/40 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Stars</p>
                <p className="text-sm font-semibold text-slate-100">{githubData.stars || 0}</p>
              </div>
              <div className="rounded-lg border border-slate-700/80 bg-slate-800/40 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">Following</p>
                <p className="text-sm font-semibold text-slate-100">{githubData.profile?.following || 0}</p>
              </div>
              <div className="rounded-lg border border-slate-700/80 bg-slate-800/40 px-2.5 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-500">{selectedYear}</p>
                <p className="text-sm font-semibold text-slate-100">{githubData.contributions || 0} contribs</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-800" />

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Organizations</p>
            <div className="flex flex-wrap justify-center gap-2">
              {organizations.length > 0 ? (
                organizations.slice(0, 6).map((org) => (
                  <a
                    key={org.id}
                    href={org.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/70 px-2 py-1 text-[11px] text-slate-200 hover:border-cyan-300/50"
                  >
                    <img src={org.avatarUrl} alt={org.login} className="h-4 w-4 rounded-sm" />
                    <span>{org.login}</span>
                  </a>
                ))
              ) : (
                <span className="text-xs text-slate-500">No public orgs yet</span>
              )}
            </div>
          </div>
        </aside>

        <div
          className="reveal-up min-w-0 space-y-5 overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/45 p-4 sm:p-5"
          style={{ '--reveal-delay': '460ms' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-slate-100">Popular repositories</h3>
              <p className="text-sm text-slate-400">
                {githubData.loading
                  ? 'Loading repositories...'
                  : `${githubData.repositoryCount.toLocaleString()} public repos • ${githubData.stars.toLocaleString()} stars`}
              </p>
            </div>
            {githubData.error && <p className="text-sm text-rose-300">Unable to load GitHub data right now.</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {githubData.popularRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="hover-lift min-w-0 space-y-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-300/40"
              >
                <div className="flex items-start gap-2">
                  <h4 className="min-w-0 flex-1 truncate text-base font-semibold text-slate-100">{repo.name}</h4>
                  <span className="shrink-0 rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
                    Public
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {repo.description || 'No description available.'}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <span>{repo.language || 'Code'}</span>
                  <span>Stars {repo.stargazers_count}</span>
                  <span>Forks {repo.forks_count}</span>
                </div>
              </a>
            ))}
            {!githubData.loading && githubData.popularRepos.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                No repositories found.
              </div>
            )}
          </div>

          <article className="dev-panel space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-100">
                {githubData.loading
                  ? `Contributions in ${selectedYear}`
                  : `${githubData.contributions.toLocaleString()} contributions in ${selectedYear}`}
              </h3>
              <div className="flex flex-wrap gap-2" aria-label="Contribution years">
                {yearOptions.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                      year === selectedYear
                        ? 'bg-cyan-400 text-slate-950'
                        : 'border border-slate-700 text-slate-300 hover:border-cyan-300/60 hover:text-cyan-200'
                    }`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {githubData.tokenMissing && (
              <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">
                Add <code>VITE_GITHUB_TOKEN</code> in your <code>.env</code> to load the exact GitHub
                contribution calendar.
              </p>
            )}

            <div className="relative min-w-0" aria-label="Contribution chart">
              <div
                ref={chartScrollRef}
                className="pretty-scroll overflow-x-auto rounded-lg border border-slate-800/80 bg-slate-900/35 px-3 py-3"
              >
                <div className="min-w-[620px] sm:min-w-[720px]">
                  <div className="mb-1 grid grid-cols-[28px_1fr] gap-2">
                    <div />
                    <div className="grid grid-cols-[repeat(53,minmax(0,12px))] gap-[2px] text-[11px] text-slate-400">
                      {visibleMonthMarkers.map((marker) => (
                        <span
                          key={`${marker.month}-${marker.weekIndex}`}
                          style={{ gridColumnStart: marker.weekIndex + 1 }}
                          className="whitespace-nowrap"
                        >
                          {marker.month}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[28px_1fr] gap-2">
                    <div className="grid grid-rows-[repeat(7,12px)] items-center gap-[2px] text-[11px] text-slate-400">
                      <span />
                      <span>Mon</span>
                      <span />
                      <span>Wed</span>
                      <span />
                      <span>Fri</span>
                      <span />
                    </div>
                    <div className="grid grid-cols-[repeat(53,minmax(0,12px))] grid-rows-7 gap-[2px]">
                      {githubData.contributionWeeks.map((week, weekIndex) =>
                        week.map((level, dayIndex) => (
                          <span
                            key={`day-${weekIndex}-${dayIndex}`}
                            style={{
                              gridColumnStart: weekIndex + 1,
                              gridRowStart: dayIndex + 1,
                            }}
                            className={`h-3 w-3 rounded-[2px] ${contributionLevels[level] || contributionLevels.l0}`}
                          />
                        )),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="hover:text-cyan-200">
                Learn how we count contributions
              </a>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <span className="h-3 w-3 rounded-[3px] bg-slate-700/60 ring-1 ring-slate-600/70" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-200" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-300" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-500" />
                <span className="h-3 w-3 rounded-[3px] bg-emerald-700" />
                <span>More</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
