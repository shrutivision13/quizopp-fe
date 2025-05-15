import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate' , devOptions: {
    enabled: true
  },
  manifest: {
    "short_name": "Quizzop",
    "name": "Quizzop - Play Quiz, Win Coins!",
    "description": "Quizzop is a trivia/quizzing platform where the users can test their knowledge by playing quiz games in 25+ categories like History, GK, Maths, Literature etc and can win coins.",
    "icons": [
        {
            "src": "72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": "128.png",
            "sizes": "128x128",
            "type": "image/png"
        },
        {
            "src": "144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "logo192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "logo512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "dir": "ltr",
    "lang": "en",
    "background_color": "#FEDE34",
    "theme_color": "#FEDE34",
    "display": "standalone",
    "start_url": "/",
    "orientation": "portrait"
}

})],
  server:{
    allowedHosts:true,
    host:true
  }
})
