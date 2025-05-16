"use client";
import Link from "next/link";
import FooterComponent from "@/src/components/footer/FooterComponent";
import HeaderComponet from "@/src/components/header/HeaderComponet";
import { useEffect, useState } from "react";


export default function FormationPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    
   const [dataFormation, setDataFormation] = useState([]);
   const [dataDomaines, setDataDomaines] = useState([]);
   const [formations, setFormations] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 12;



    const handleClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

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
      console.log("Données des formations:", data.domaines);
      const formation = data.domaines.flatMap((domaine) =>
        domaine.formations.filter((formation) => formation.isPopular)
      );

         const totalPag = Math.ceil(formation.length / coursesPerPage);
         setTotalPages(totalPag);
            //  pagination
       const indexOfLastCourse = currentPage * coursesPerPage;
      const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
      const currentCourses = formation.slice(indexOfFirstCourse, indexOfLastCourse);
      setDataFormation(formation);
      setFormations(currentCourses);
    })
    .catch((error) => {
      console.error("Erreur fetch:", error);
    });
    }

      useEffect(() => {
         fetcheData();
       }, [currentPage]);



       const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const rech = e.target.value.toLowerCase();
        if(rech === "" || rech === undefined || rech.length < 2){ 
          fetcheData();
        }
        const filteredDomains = dataFormation.filter((domain) => {
            const matchesSearch = domain.title
            .toLowerCase()
            .includes(rech);
            const matchesFilter =
            activeFilter === "all" ||
            (activeFilter === "popular" && domain.isPopular) ||
            (activeFilter === "recent" && domain.isRecent);
            return matchesSearch && matchesFilter;
          })
          setFormations(filteredDomains);
      };
      
      

  return (
      <div className="min-h-screen bg-white">
           <HeaderComponet/>
           <main>
           <section
        className="relative overflow-hidden min-h-[600px] flex items-center mt-6"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20abstract%20geometric%20background%20with%20soft%20gradient%20colors%2C%20professional%20tech%20themed%20design%20with%20subtle%20patterns%20and%20shapes%2C%20perfect%20for%20web%20development%20hero%20section%20background&width=1440&height=800&seq=11&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Formation en ligne
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Développement Web{" "}
              <span className="text-orange-500">Professionnel</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Découvrez nos formations en développement web. Apprenez à coder,
              créer des sites web modernes et maîtrisez les technologies les
              plus demandées sur le marché.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-300 text-sm"
                  value={searchQuery}
                onChange={handleSearchChange}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"></i>
              </div> */}
              <a href='#formation' className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap !rounded-button">
                <i className="fas fa-play-circle mr-2"></i>
                Commencer maintenant
              </a>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <i className="fas fa-users text-orange-500 text-2xl mr-3"></i>
                <div>
                  <p className="text-white font-bold text-xl">25K+</p>
                  <p className="text-gray-300 text-sm">Étudiants</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-star text-orange-500 text-2xl mr-3"></i>
                <div>
                  <p className="text-white font-bold text-xl">4.8/5</p>
                  <p className="text-gray-300 text-sm">Note moyenne</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-certificate text-orange-500 text-2xl mr-3"></i>
                <div>
                  <p className="text-white font-bold text-xl">100%</p>
                  <p className="text-gray-300 text-sm">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          {/* Formations Grid */}
      <section className="py-12 px-8">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Explorez nos formations
            </h2>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Rechercher une formation..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                 value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2  text-orange-500"></i>
            </div>
          </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="formation">
        { formations.map((course, i) => (
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
                    {course.isPopular && (
                      <div className="absolute top-3 right-3 bg-[#FF6B35] text-white text-xs font-medium px-2 py-1 rounded-full">
                        Populaire
                      </div>
                    )}
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
                      <Link href={`/formation/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                       className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                        Voir la formation
                      </Link>
                    </div>
                  </div>
                </article>
         ))}

         {formations.length === 0 && (
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

               {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-chevron-left mr-1"></i> Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                     num === currentPage
                        ? "bg-[#FF6B35] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                    } !rounded-button cursor-pointer whitespace-nowrap`}
                    onClick={() => handleClick(num)}
                  >
                    {num}
                  </button>
                ))}
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 !rounded-button cursor-pointer whitespace-nowrap">
                  Suivant <i className="fas fa-chevron-right ml-1"></i>
                </button>
              </nav>
            </div>
          </section>
                      
           </main>
          <FooterComponent />
    </div>
  )
}