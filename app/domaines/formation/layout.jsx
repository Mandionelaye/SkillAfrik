const title = "Formations - SkillAfrik";
const description = "Découvre les formations les plus populaires en Afrique : informatique, agriculture, mécanique, mode, cuisine et bien plus encore.";

export const metadata = {
  title: `${title}`,
  description,
   openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://skillafrik.com/domaines/formation",
    title: title,
    description: description,
    siteName: "SkillAfrik",
    images: [
      {
        url: "https://skillafrik.com/images/logo_mine.png",
        width: 800,
        height: 600,
        alt: "SkillAfrik",
      },
    ],
  },
};


export default function DomainesForLayout({
  children,
}) {
  return (
    <div>
      {children}
    </div>
  )
}
