import { useState } from 'react'
import Header from './components/layout/Header'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'
import ExperienceSection from './components/sections/ExperienceSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import { getSocialLinks, navItems, skillCards, deployedProjects, contactInfo } from './data/portfolioData'
import { useGithubData } from './hooks/useGithubData'

function App() {
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'dietherpano'
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN || ''
  const currentYear = new Date().getFullYear()
  const yearOptions = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const githubData = useGithubData({ githubUsername, githubToken, selectedYear })
  const socialLinks = getSocialLinks(githubUsername)

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="ambient-blob absolute -left-32 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="ambient-blob ambient-blob-delay absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <Header navItems={navItems} socialLinks={socialLinks} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-32 sm:px-6 min-[700px]:pt-24 lg:px-8">
        <HeroSection />
        <SkillsSection skillCards={skillCards} />
        <ExperienceSection />
        <ProjectsSection githubData={githubData} deployedProjects={deployedProjects} />
        <AboutSection
          githubData={githubData}
          githubUsername={githubUsername}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          yearOptions={yearOptions}
        />
        <ContactSection githubUsername={githubUsername} contactInfo={contactInfo} />
      </main>
    </div>
  )
}

export default App
