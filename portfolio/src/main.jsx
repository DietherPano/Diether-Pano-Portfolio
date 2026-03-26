import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const dailyIcons = [
  'https://res.cloudinary.com/dqslpwgdr/image/upload/v1774516415/PANO_DIETHER_DITA1034_clncva_idvf4c.ico',
  'https://res.cloudinary.com/dqslpwgdr/image/upload/v1774516415/wp16139343-cosmic-princess-wallpapers_twh9ub.ico',
]

const setDailyFavicon = () => {
  const daysSinceEpoch = Math.floor(Date.now() / 86400000)
  const iconForToday = dailyIcons[daysSinceEpoch % dailyIcons.length]

  let favicon = document.querySelector("link[rel='icon']")
  if (!favicon) {
    favicon = document.createElement('link')
    favicon.setAttribute('rel', 'icon')
    document.head.appendChild(favicon)
  }

  favicon.setAttribute('type', 'image/x-icon')
  favicon.setAttribute('href', iconForToday)
}

setDailyFavicon()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
