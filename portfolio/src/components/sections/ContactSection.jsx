import { DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../icons/icons'

export default function ContactSection({ githubUsername, contactInfo }) {
  const { emailAddress, gmailComposeUrl, linkedInUrl } = contactInfo

  return (
    <section id="contact" className="space-y-5">
      <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Contact</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href={gmailComposeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5 transition hover:border-cyan-300/40"
        >
          <span className="rounded-xl border border-cyan-300/40 bg-cyan-500/10 p-2 text-cyan-100">
            <MailIcon />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Gmail</h3>
            <p className="text-sm text-slate-300">{emailAddress}</p>
          </div>
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5 transition hover:border-cyan-300/40"
        >
          <span className="rounded-xl border border-cyan-300/40 bg-cyan-500/10 p-2 text-cyan-100">
            <LinkedInIcon />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">LinkedIn</h3>
            <p className="text-sm text-slate-300">in/diether-pano-220362355</p>
          </div>
        </a>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="/Diether-Pano-Resume.pdf"
          download="Diether-Pano-Resume.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <DocumentIcon className="h-4 w-4" />
          Download Resume
        </a>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
        >
          <GitHubIcon className="h-4 w-4" />
          View GitHub
        </a>
      </div>
    </section>
  )
}
