
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
   const { idFormation, idVideo } = (await params) || params;
   const idFormations = decodeURIComponent(idFormation);
   const idVideos = decodeURIComponent(idVideo);
   const query = idFormations.replace(/-/g, " ");
   
 const title = `${query} - Apprentissage en ligne - SkillAfrik`;
  const description = `Suis la formation ${query} en vidéo. Accessible aux jeunes, étudiants, et apprentis même sans connexion permanente.`;

    const baseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://skillafrik-seven.vercel.app";

  
  const response = await fetch(`${baseUrl}/data/domaine.json`);
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
    const formations = data.domaines.flatMap((domaine) =>
    domaine.formations.filter((formation) =>
        formation.title && // Vérifie que title existe
        formation.title.toLowerCase().replace(/\s+/g, "-") === idFormations
    )
    );

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: `https://skillafrik-seven.vercel.app/formation/${decodeURIComponent(idFormations)}`,
      title,
      description,
      siteName: "SkillAfrik",
      images: [
        {
          url: formations[0]?.image,
          width: 800,
          height: 600,
          alt: formations[0]?.title,
        },
      ],
    },
  };
}

export default function LecturIdLayout({ children }) {
  return <div>{children}</div>;
}
