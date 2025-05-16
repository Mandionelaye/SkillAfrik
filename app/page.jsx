"use client"

import Link from "next/link";
import HeaderSeoComp from '@/src/components/SEO/HeaderSeoComp';
import HeaderComponet from '@/src/components/header/HeaderComponet';
import { useEffect, useState } from "react";
import FooterComponent from "@/src/components/footer/FooterComponent";

const title = "SkillAfrik - Apprends un métier, crée ton avenir";
const description = "SkillAfrik est une plateforme africaine d'apprentissage en ligne qui aide les jeunes de 15 à 35 ans à acquérir des compétences pratiques, même hors ligne.";

export default function Accueilpage() {
  const [dataDomaines, setDataDomaines] = useState([]);
  const [dataFormations, setDataFormations] = useState([]);

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
    const formation = data.domaines.flatMap((domaine) =>
        domaine.formations.filter((formation) => formation.isPopular)
      );
     const indexOfLastCourse = 1 * 9;
      const indexOfFirstCourse = indexOfLastCourse - 9;
      const currentCourses = formation.slice(indexOfFirstCourse, indexOfLastCourse);
      setDataFormations(currentCourses);
    console.log("Données des domaines:", data.domaines);
  })
  .catch((error) => {
    console.error("Erreur fetch:", error);
  });
  }
   
  useEffect(() => {
    fetcheData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
        {/* <HeaderSeoComp title={title} desc={description} /> */}
        <HeaderComponet />
        <main>
           {/* Hero Section */}
      <section className="relative pt-20 md:pt-0 min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20diverse%20group%20of%20young%20African%20students%20learning%20together%20in%20a%20modern%20classroom%20environment%20with%20laptops%20and%20digital%20devices%2C%20bright%20natural%20lighting%2C%20warm%20atmosphere%2C%20showing%20collaboration%20and%20engagement%20in%20education&width=1440&height=600&seq=hero1&orientation=landscape')`,
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl bg-gradient-to-r from-white/90 to-white/60 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl md:text-5xl font-bold text-[#8B4513] mb-4 leading-tight">
              Apprends un métier, <br />
              <span className="text-[#FF6B35]">crée ton avenir</span>
            </h1>
            <p className="text-gray-800 text-lg mb-8 max-w-xl">
              Découvre des formations pratiques conçues pour les jeunes
              africains. Acquiers des compétences recherchées et construis ton
              avenir professionnel dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href='#com' className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors text-lg font-medium !rounded-button cursor-pointer whitespace-nowrap">
                Commencer maintenant
              </a>
              <Link href="/domaines/formation" className="px-6 py-3 bg-white text-[#8B4513] border border-[#8B4513] rounded-lg hover:bg-[#8B4513] hover:text-white transition-colors text-lg font-medium !rounded-button cursor-pointer whitespace-nowrap">
                Découvrir les formations
              </Link>
            </div>
          </div>
        </div>
      </section>

       {/* Domaines Populaires */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-2">
              Domaines Populaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nos domaines de formation les plus demandés et commence
              ton parcours d'apprentissage
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id='com'>
            {dataDomaines.map((domain, index) => (
              <Link
              key={index}
              href={`/domaines/formation/${domain.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:scale-105 cursor-pointer group"
              >
                <article>
                <div className="h-40 overflow-hidden">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    className="w-full h-full object-cover object-top transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                      <i className={`fas ${domain.icon} text-lg`}></i>
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-[#8B4513] group-hover:text-[#FF6B35] transition-colors">
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-medium text-[#4CAF50]">
                      {domain.count}
                    </span>{" "}
                    formations disponibles
                  </p>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

 {/* Formations Populaires */}
 <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#8B4513] mb-2">
                Formations Populaires
              </h2>
              <p className="text-gray-600">
                Les formations les plus suivies par notre communauté
              </p>
            </div>
            <Link href="/domaines/formation" className="px-4 py-2 border border-[#FF6B35] text-[#FF6B35] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors !rounded-button cursor-pointer whitespace-nowrap">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataFormations.map((course, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                     <Link  href={`/formation/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                        Voir la formation
                      </Link>
                    <span className="text-gray-600 text-sm">
                        <i className="fas fa-video mr-1"></i> {course.videos}{" "}
                        vidéos
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Témoignages */}
      <section className="py-16 bg-[#4CAF50]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-2">
              Ce que disent nos apprenants
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvre les expériences de ceux qui ont transformé leur avenir
              grâce à SkillAfrik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mariam Sow",
                profession: "Développeuse Web",
                quote:
                  "Grâce à SkillAfrik, j'ai pu apprendre le développement web en seulement 3 mois et j'ai décroché mon premier emploi. Les cours sont pratiques et adaptés au marché africain.",
                rating: 5,
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20confident%20young%20African%20woman%20with%20natural%20hair%2C%20warm%20smile%2C%20neutral%20background%2C%20professional%20attire%2C%20soft%20lighting%2C%20positive%20expression&width=100&height=100&seq=testimonial1&orientation=squarish",
              },
              {
                name: "Omar Diop",
                profession: "Entrepreneur",
                quote:
                  "Les formations en entrepreneuriat m'ont donné les outils nécessaires pour lancer ma startup. J'apprécie particulièrement les études de cas africaines qui sont vraiment pertinentes.",
                rating: 5,
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20confident%20young%20African%20man%20with%20short%20hair%2C%20warm%20smile%2C%20neutral%20background%2C%20business%20casual%20attire%2C%20soft%20lighting%2C%20approachable%20expression&width=100&height=100&seq=testimonial2&orientation=squarish",
              },
              {
                name: "Aïcha Bah",
                profession: "Designer UI/UX",
                quote:
                  "J'ai suivi plusieurs formations en design et la qualité est exceptionnelle. Les instructeurs sont attentifs et la communauté est très solidaire. Je recommande vivement!",
                rating: 4,
                image:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20creative%20young%20African%20woman%20with%20stylish%20hair%2C%20bright%20smile%2C%20neutral%20background%2C%20fashionable%20attire%2C%20soft%20lighting%2C%20artistic%20expression&width=100&height=100&seq=testimonial3&orientation=squarish",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#8B4513]">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">{testimonial.profession}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex text-[#FF6B35]">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < testimonial.rating ? "" : "text-gray-300"}`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Abonnement */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-2">
              Nos Abonnements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisis la formule qui correspond à tes besoins et commence ton
              parcours d'apprentissage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Gratuit",
                price: "0 €",
                features: [
                  "Accès à 5 cours gratuits",
                  "Forum communautaire limité",
                  "Pas de certificat",
                  "Support par email",
                ],
                recommended: false,
                buttonText: "Commencer gratuitement",
              },
              {
                name: "Premium",
                price: "19,99 €/mois",
                features: [
                  "Accès illimité à tous les cours",
                  "Forum communautaire complet",
                  "Certificats vérifiés",
                  "Support prioritaire",
                  "Projets pratiques guidés",
                  "Webinaires mensuels",
                ],
                recommended: true,
                buttonText: "S'abonner maintenant",
              },
              {
                name: "Entreprise",
                price: "99,99 €/mois",
                features: [
                  "Tout ce qui est inclus dans Premium",
                  "Jusqu'à 10 utilisateurs",
                  "Rapports de progression",
                  "Formations sur mesure",
                  "Support dédié 24/7",
                  "Session de coaching mensuelle",
                ],
                recommended: false,
                buttonText: "Contacter les ventes",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-transform hover:scale-105 ${
                  plan.recommended
                    ? "shadow-xl border-2 border-[#FF6B35] relative"
                    : "shadow-md border border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-[#FF6B35] text-white px-4 py-1 text-sm font-medium">
                    Recommandé
                  </div>
                )}
                <div
                  className={`p-6 ${plan.recommended ? "bg-[#FF6B35]/5" : "bg-white"}`}
                >
                  <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#4CAF50]">
                      {plan.price}
                    </span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-medium !rounded-button cursor-pointer whitespace-nowrap ${
                      plan.recommended
                        ? "bg-[#FF6B35] text-white hover:bg-[#e05a2b]"
                        : "border border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
                    } transition-colors`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


    <section className="py-16 bg-gradient-to-r from-[#FF6B35] to-[#4CAF50] text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre voyage d'apprentissage?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Rejoignez des milliers d'étudiants à travers l'Afrique qui transforment déjà leur éducation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/domaines" className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition duration-300">
                     Commencer maintenant <i className="fas fa-user-plus ml-2"></i>
                </Link>
                <Link href="/domaines/formation" className="border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-full font-bold text-lg transition duration-300">
                    Découvrir les formations <i className="fas fa-search ml-2"></i>
                </Link>
            </div>
        </div>
    </section>
           </main>
        <FooterComponent />
    </div>
  )
}
