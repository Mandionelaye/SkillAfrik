const title = "Domaines de formation - SkillAfrik";
const description = "Découvre les domaines les plus demandés en Afrique : informatique, agriculture, mécanique, mode, cuisine et bien plus encore.";

export const metadata = {
  title: `${title}`,
  description,
   openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://skillafrik-seven.vercel.app/domaines",
    title: title,
    description: description,
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


export default function DomainesLayout({
  children,
}) {
  return (
    <div>
      {children}
    </div>
  )
}
