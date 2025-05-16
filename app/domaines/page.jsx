"use client";
import FooterComponent from "@/src/components/footer/FooterComponent";
import HeaderComponet from "@/src/components/header/HeaderComponet";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";


export default function DomainePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
 const [dataDomaines, setDataDomaines] = useState([]);
 
  const fetcheData = async () => {
   fetch("/data/domaine.json")
   .then((response) => {
     if (!response.ok) {
       throw new Error("Erreur lors du chargement du fichier JSON");
     }
     return response.json();
   })
   .then((data) => {
     setDataDomaines(data.domaines);
     console.log("Données des domaines:", data.domaines);
   })
   .catch((error) => {
     console.error("Erreur fetch:", error);
   });
   }
    
   useEffect(() => {
     fetcheData();
   }, []);

  const filteredDomains = dataDomaines.filter((domain) => {
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
       <HeaderComponet/>
       <main>
       {/*  head  */}
       <section className="bg-gradient-to-r from-[#FF6B35] to-[#4CAF50] pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            Découvre nos Domaines de Formation
          </h1>
          <p className="text-white text-center text-lg mb-8 max-w-2xl mx-auto">
            Explore notre large sélection de domaines et trouve la formation qui
            correspond à tes objectifs professionnels
          </p>
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

          {/* Domains Grid */}
          <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDomains.map((domain, index) => (
              <Link
              key={index}
              href={`/domaines/formation/${domain.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1 cursor-pointer"
              >
                <article>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {domain.isPopular && (
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-fire-alt mr-1"></i>Populaire
                      </span>
                    )}
                    {domain.isRecent && (
                      <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-clock mr-1"></i>Nouveau
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                      <i className={`fas ${domain.icon} text-xl`}></i>
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-[#8B4513]">
                      {domain.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      <i className="fas fa-book-open mr-2"></i>
                      {domain.count} cours disponibles
                    </span>
                    <button className="text-[#FF6B35] hover:text-[#e05a2b] transition-colors">
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </article>
              </Link>            
            ))}
          </div>

          {filteredDomains.length === 0 && (
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
      </div>
      </main>
       <FooterComponent />
    </div>
  )
}
