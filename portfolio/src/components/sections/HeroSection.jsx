export default function HeroSection() {
  const heroPhoto =
    'https://res.cloudinary.com/dqslpwgdr/image/upload/v1723950908/PANO_DIETHER_DITA1034_clncva.jpg'

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="grid gap-10 overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40 p-6 shadow-2xl shadow-cyan-950/30 sm:p-10 min-[700px]:grid-cols-[1.2fr_1fr] min-[700px]:items-center"
    >
      <div className="space-y-5">
        <p className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">
          Junior Software Developer
        </p>
        <h1 id="hero-title" className="max-w-xl text-3xl font-semibold leading-tight text-slate-50 sm:text-5xl">
          Building Secure, Scalable Web Solutions
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Junior Software Developer with hands-on experience building Docker-based code execution
          platforms and deploying applications on AWS EC2. Developed REST APIs and full-stack
          applications using React and Node.js, with a focus on automation and system efficiency.
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-5">
        <div className="absolute -right-4 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="absolute -bottom-8 left-1 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
        <img
          src={heroPhoto}
          alt="Diether Pano"
          className="h-44 w-44 rounded-full border-2 border-cyan-300/40 object-cover object-[50%_22%] shadow-xl shadow-cyan-950/30"
          loading="eager"
        />
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Hire Me
          </a>
        </div>
      </div>
    </section>
  )
}
