import FormationDetailPage from "./FormationDetailPage";


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params;
  const baseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://skillafrik-seven.vercel.app";

  const title = `Formations en ${decodeURIComponent(id).replace(/-/g, " ")} - SkillAfrik`;
  const description = `Explore nos formations en ${decodeURIComponent(id).replace(/-/g, " ")}, conçues pour les jeunes africains...`;

  const response = await fetch(`${baseUrl}/data/domaine.json`);
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
      const domaine = data.domaines.find(
        d => d.title.toLowerCase().replace(/\s+/g, "-") === decodeURIComponent(id)
      );
    

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: `https://skillafrik-seven.vercel.app/domaines/formation/${decodeURIComponent(id)}`,
      title,
      description,
      siteName: "SkillAfrik",
      images: [
        {
          url: domaine?.image,
          width: 800,
          height: 600,
          alt: "SkillAfrik",
        },
      ],
    },
  };
}


export default function Page({ params }) {

  return (
    <>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": decodeURIComponent(id).replace(/-/g, " "),
            "description": description,
            "provider": {
              "@type": "Organization",
              "name": "SkillAfrik",
              "url": "https://skillafrik-seven.vercel.app/domaines/formation/"+decodeURIComponent(id)
            }
          }),
        }}
      />
      <FormationDetailPage param={params} />
    </>
  )
}
