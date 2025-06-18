"use client";
import Link from "next/link";
import FooterComponent from "@/src/components/footer/FooterComponent";
import HeaderComponet from "@/src/components/header/HeaderComponet";
import { searchPlaylists } from "@/src/libs/youtubData";
import { use, useEffect, useState } from "react";
import Script from "next/script";
import AdBanner from "@/src/components/AdSense/AdBanner";

export default function PlaylistePage({params}) {
  const [videos, setVideos] = useState([]);
  const [formation, setFormation] = useState([]);
  const {idFormation} = use(params);
  const idFormations = decodeURIComponent(idFormation);
   console.log(idFormations);
    const query = idFormations.replace(/-/g, " ");
   
  const title = `${query} - Apprentissage en ligne - SkillAfrik`;
  const description = `Suis la formation ${query} en vidéo. Accessible aux jeunes, étudiants, et apprentis même sans connexion permanente.`;

  const fetcheData = () =>{
    const query = idFormations.toLowerCase().replace(/-/g, " ");
    searchPlaylists(query)
      .then((data) =>{
        console.log(data);
         setVideos(data)
      }
    )
      .catch((err) => console.error(err));
  }

  const getFormation = () =>{
    fetch("/data/domaine.json")
   .then((response) => {
     if (!response.ok) {
       throw new Error("Erreur lors du chargement du fichier JSON");
     }
     return response.json();
   })
   .then((data) => {
const formations = data.domaines.flatMap((domaine) =>
  domaine.formations.filter((formation) =>
    formation.title && // Vérifie que title existe
    formation.title.toLowerCase().replace(/\s+/g, "-") === idFormations
  )
);
     setFormation(formations);
     console.log("Données des domaines:", formation);
   })
   .catch((error) => {
     console.error("Erreur fetch:", error);
   });
  }

  useEffect(()=>{
    fetcheData();
    getFormation();
  }, []);

   // affiche le texte correctement
 function  decodeHtmlEntities(text) {
    let parser = new DOMParser();
    let decodedString = parser.parseFromString(text, "text/html").body.textContent;
    return decodedString;
  }

  // date transforme:
   const transformeDate = (dat) =>{
     const date = new Date(dat);
     const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC' // Pour garder l'heure UTC
      });
      return formatter.format(date);
   }

  return (
     <div className="min-h-screen bg-white">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": query,
            "description": description,
            "provider": {
              "@type": "Organization",
              "name": "SkillAfrik",
              "url": "https://skillafrik-seven.vercel.app/formation/"+idFormations
            }
          }),
        }}
      />
       <HeaderComponet />
       <main>
         <div className="bg-gradient-to-r from-[#FF6B35] to-[#4c8caf] pt-20 pb-16">
        <div className="container mx-auto px-4">
           <div className="flex flex-col justify-between md:flex-row items-center mb-3 px-4">
              <div   className="md:w-1/2 text-white">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                  {formation[0]?.title}
                </h1>
                <p className="text-white text-center text-lg max-w-2xl mx-auto">
                  Explore notre large sélection de cours et trouve le cours qui
                  correspond à tes objectifs professionnels
                </p>
              </div>
              <div className="md:w-1/2 mt-0 md:mt-0 ps-3">
              <img
                src={formation[0]?.image}
                alt="Formation en Afrique"
                className="rounded-lg shadow-2xl object-cover w-full h-full object-top"
              />
            </div>
          </div>
        </div>
      </div>

          {/* Domains Grid */}
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos?.map((playlist, i) => (
               <article
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={playlist.snippet.thumbnails.medium.url}
                      alt={"elm"}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-clock mr-1"></i>Nouveau
                      </span>
                  </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-2 line-clamp-2">
                      {decodeHtmlEntities(playlist.snippet.title)}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {playlist.snippet.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {" "}
                      <span className="font-medium">{playlist.snippet.channelTitle}</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">
                        <i className="fas fa-pub mr-1"></i> {transformeDate(playlist.snippet.publishTime)}{" "}
                      </span>
                      <Link href={`/lecture/${idFormations}/${playlist.id.playlistId}`}
                        className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                         Commencer
                      </Link>
                    </div>
                  </div>
                </article>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Aucun domaine trouvé
              </h3>
              <p className="text-gray-500">
                Essaie de modifier tes critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>
      <AdBanner />
      </main>
       <FooterComponent />
    </div>
  )
}
