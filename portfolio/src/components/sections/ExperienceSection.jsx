export default function ExperienceSection() {
  return (
    <section id="experience" className="space-y-5">
      <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">Experience</h2>

      <div className="grid gap-4 min-[700px]:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">Work Experience</p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-100">Intern Software Developer</h3>
            <p className="text-sm text-slate-400">JCAS Logistics | April 21, 2025 - May 31, 2025</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
              <li>Developed Kaamada, an integrated system for HR, maintenance, and accounting workflows.</li>
              <li>Centralized organizational processes and reduced manual overhead through automation.</li>
              <li>Improved reporting accuracy and cross-department visibility using shared data flows.</li>
              <li>Automated routine tasks such as employee record management and operational reporting.</li>
            </ul>
          </div>
        </article>

        <article className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/45 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">Relevant Experience</p>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-100">Codemania</h3>
            <p className="text-sm text-slate-300">Role: Full-Stack Developer &amp; Head of Operations</p>
            <p className="text-sm text-slate-400">College Thesis Capstone | September 2024 - March 2026</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
              <li>Built secure code execution using Docker-based sandboxing.</li>
              <li>Deployed runtime infrastructure on AWS EC2 for reliable code testing.</li>
              <li>Collaborated on REST APIs, backend endpoint logic, and game feature delivery.</li>
              <li>Implemented interactive game logic and challenge maps to improve learner engagement.</li>
              <li>Designed in-game language tracks that improved progression and user retention.</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
