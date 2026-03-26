const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Dockerfile: '#384d54',
}

const languageTextColors = {
  JavaScript: '#1b1b1b',
  HTML: '#ffffff',
  CSS: '#ffffff',
  TypeScript: '#ffffff',
  Python: '#ffffff',
  Java: '#ffffff',
  'C++': '#ffffff',
  C: '#ffffff',
  PHP: '#ffffff',
  Shell: '#1b1b1b',
  Dockerfile: '#ffffff',
}

export const getLanguageColor = (language) => languageColors[language] || '#8b949e'
export const getLanguageTextColor = (language) => languageTextColors[language] || '#ffffff'
