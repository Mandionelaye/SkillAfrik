import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://skillafrik-seven.vercel.app"),
  keywords: ["skill-afirk.vercel.app, skillafrik, skill-afrik, gratuite, apprendre un métier en Afrique, formation gratuite pour jeunes, formation, métiers, jeunes, Afrique, en ligne, compétences, reconversion, autodidactes, hors ligne, apprentissage, Informatique, Agriculture, Énergie & Électricité, Couture & Stylisme, BTP (Bâtiment et Travaux Publics), Mécanique & Auto, Cuisine & Restauration, Entrepreneuriat & Commerce, Beauté & Esthétique, Digital & Médias, Santé & Bien-être, Langues & Communication, Artisanat, Marketing Digital, Finance & Comptabilité, Éducation & Pédagogie"],
  title:{
    default: "SkillAfrik - Apprends un métier, crée ton avenir",
    template: "%s | SkillAfrik",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://skillafrik-seven.vercel.app",
    title: "SkillAfrik - Apprends un métier, crée ton avenir",
    description: "SkillAfrik est une plateforme africaine d'apprentissage en ligne qui aide les jeunes de 15 à 35 ans à acquérir des compétences pratiques, même hors ligne.",
    siteName: "SkillAfrik",
    images: [
      {
        url: "https://skillafrik-seven.vercel.app/images/logo_mine.png",
        width: 800,
        height: 600,
        alt: "SkillAfrik",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
       <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
