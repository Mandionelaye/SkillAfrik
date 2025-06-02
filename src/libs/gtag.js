// lib/gtag.js
export const GA_TRACKING_ID = 'G-G6N9W5QLHL'; // Remplacez par votre ID réel

// Fonction pour envoyer une page vue
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
