import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from '../components/icons/icons'

export const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

export const skillCards = [
  {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    iconAlt: 'React logo',
    title: 'Frontend Development',
    description: 'Responsive, accessible user interfaces focused on performance and smooth UX.',
    tags: ['JavaScript', 'React', 'HTML/CSS', 'TailwindCSS'],
  },
  {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    iconAlt: 'Node.js logo',
    title: 'Backend Development',
    description: 'API design and server-side logic with secure architecture and clean data flow.',
    tags: ['Node.js', 'Python', 'REST APIs', 'Express', 'Auth'],
  },
  {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    iconAlt: 'Database logo',
    title: 'Database & Infra',
    description: 'Schema design, query optimization, and cloud deployment for reliable systems.',
    tags: ['MySQL', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions'],
  },
]

export const deployedProjects = [
  {
    name: 'Diether-Pano-Portfolio',
    description: 'Personal portfolio website showcasing projects, skills, and experience.',
    url: 'https://dietherpano.netlify.app/',
    previewImage: 'https://s.wordpress.com/mshots/v1/https://dietherpano.netlify.app/?w=1200',
    stack: ['JavaScript', 'CSS', 'HTML'],
  },
  {
    name: 'Code-Mania',
    description: 'Deployed learn-to-code platform with coding terminals, quizzes, and weekly challenges.',
    url: 'https://codemania.fun',
    previewImage: 'https://s.wordpress.com/mshots/v1/https://codemania.fun?w=1200',
    stack: ['JavaScript', 'HTML', 'CSS'],
  },
]

export const contactInfo = {
  emailAddress: 'dietherpano95@gmail.com',
  gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=dietherpano95@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/diether-pano-220362355',
  facebookUrl: 'https://www.facebook.com/sudothrd',
  instagramUrl: 'https://www.instagram.com/sudo_thrd/',
}

export function getSocialLinks(githubUsername) {
  return [
    {
      id: 'github',
      label: 'GitHub',
      href: `https://github.com/${githubUsername}`,
      icon: <GitHubIcon />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: contactInfo.linkedInUrl,
      icon: <LinkedInIcon />,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: contactInfo.facebookUrl,
      icon: <FacebookIcon />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: contactInfo.instagramUrl,
      icon: <InstagramIcon />,
    },
  ]
}
