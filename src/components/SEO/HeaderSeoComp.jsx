import Head from "next/head";

export default function HeaderSeoComp({title, desc}) {
  return (
    <>
      <Head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="https://skill-afirk.vercel.app/" />
                <meta name="description" content={desc} />
                <meta name="keywords" content="gratuite, apprendre un métier en Afrique, formation gratuite pour jeunes, formation, métiers, jeunes, Afrique, en ligne, compétences, reconversion, autodidactes, hors ligne, apprentissage" />
                 <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "EducationalOrganization",
                      "name": "SkillAfrik",
                      "url": "https://skill-afirk.vercel.app",
                      "logo": "https://skill-afirk.vercel.app/images/logo_mine.png",
                      "description": "Plateforme de formation professionnelle en ligne pour les jeunes Africains.",
                      "sameAs": [
                        "https://facebook.com/skillafrik",
                        "https://instagram.com/skillafrik"
                      ]
                    })}
                  </script>
      </Head>

    </>
  )
}