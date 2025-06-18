"use client";
import Link from "next/link";
import FooterComponent from "@/src/components/footer/FooterComponent";
import HeaderComponet from "@/src/components/header/HeaderComponet";
import HeaderSeoComp from "@/src/components/SEO/HeaderSeoComp";
import { use, useEffect, useState } from "react";
import AdBanner from "@/src/components/AdSense/AdBanner";

export default function FormationDetailPage({ param }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [domaines, setDomaines] = useState();
  const { id } = use(param);// Supprimez le 'await' car params est déjà disponible

  const title = `Formations en ${decodeURIComponent(id).replace(/-/g, " ")} - SkillAfrik`;
  const description = `Explore nos formations en ${decodeURIComponent(id).replace(/-/g, " ")}, conçues pour les jeunes africains...`;

  const fetchData = async () => {
    try {
      const response = await fetch("/data/domaine.json");
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
      const domaine = data.domaines.find(
        d => d.title.toLowerCase().replace(/\s+/g, "-") === decodeURIComponent(id)
      );
      setDomaines(domaine);
    } catch (error) {
      console.error("Erreur fetch:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

    const filteredDomains = domaines?.formations?.filter((domain) => {
    const matchesSearch = domain.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "popular" && domain.isPopular) ||
      (activeFilter === "recent" && domain.isRecent);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white">
        <HeaderComponet />
        <main>
             {/*  head  */}
       <section className="bg-gradient-to-r from-[#FF6B35] to-[#4c8caf] pt-20 pb-16">
        <div className="container mx-auto px-4">
           <div className="flex flex-col justify-between md:flex-row items-center mb-3 px-4">
              <div   className="md:w-1/2 text-white">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                  {domaines?.title}
                </h1>
                <p className="text-white text-center text-lg max-w-2xl mx-auto">
                  Explore notre large sélection de cours et trouve le cours qui
                  correspond à tes objectifs professionnels
                </p>
              </div>
              <div className="md:w-1/2 mt-0 md:mt-0 ps-3">
              <img
                src={domaines?.image}
                alt="Formation en Afrique"
                className="rounded-lg shadow-2xl object-cover w-full h-full object-top"
              />
            </div>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Rechercher un domaine..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 bg-white border-none shadow-lg pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-4 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-white text-[#FF6B35]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setActiveFilter("popular")}
                className={`px-6 py-4 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap ${
                  activeFilter === "popular"
                    ? "bg-white text-[#FF6B35]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <i className="fas fa-fire-alt mr-2"></i>Populaires
              </button>
              <button
                onClick={() => setActiveFilter("recent")}
                className={`px-6 py-4 rounded-lg font-medium transition-colors !rounded-button whitespace-nowrap ${
                  activeFilter === "recent"
                    ? "bg-white text-[#FF6B35]"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <i className="fas fa-clock mr-2"></i>Récents
              </button>
            </div>
          </div>
        </div>
      </section>

                  {/* Formations Grid */}
      <section className="py-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="formation">
        { filteredDomains?.map((course, i) => (
                <article
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={"elm"}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                    {course.isPopular && (
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-fire-alt mr-1"></i>Populaire
                      </span>
                    )}
                    {course.isRecent && (
                      <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-clock mr-1"></i>Nouveau
                      </span>
                    )}
                  </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {" "}
                      <span className="font-medium">{course.title}</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">
                        <i className="fas fa-video mr-1"></i> {course.videos}{" "}
                        vidéos
                      </span>
                      <Link href={`/formation/${course?.title.toLowerCase().replace(/\s+/g, "-")}`}
                       className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                        Voir la formation
                      </Link>
                    </div>
                  </div>
                </article>
         ))}

         {filteredDomains?.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Aucun formation trouvé
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
