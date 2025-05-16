import React from 'react'

export default function FooterComponent() {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Skill<span className="text-[#FF6B35]">Afrik</span>
              </h2>
              <p className="text-gray-400 mb-4">
                Plateforme d'apprentissage en ligne pour les jeunes africains,
                offrant des compétences pratiques pour construire leur avenir.
              </p>
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a
                  href="/"
                  className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a
                  href="/"
                  className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a
                  href="/"
                  className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/formations"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Formations
                  </a>
                </li>
                <li>
                  <a
                    href="/domaines"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Domaines
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Abonnements
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Blog
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informations</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    À propos de nous
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Devenir formateur
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Témoignages
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    Nous contacter
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Inscris-toi à notre newsletter pour recevoir des conseils et des
                offres exclusives.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ton email"
                  className="px-4 py-2 bg-white rounded-l-lg focus:outline-none text-gray-800 w-full border-none"
                />
                <button className="bg-[#FF6B35] px-4 py-2 rounded-r-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-cc-paypal text-2xl"></i>
              <i className="fab fa-cc-apple-pay text-2xl"></i>
            </div>
            <p>
              &copy; {new Date().getFullYear()} SkillAfrik. Tous droits
              réservés. |
              <a
                href="/"
                className="text-gray-400 hover:text-[#FF6B35] transition-colors ml-1 cursor-pointer"
              >
                Conditions d'utilisation
              </a>{" "}
              |
              <a
                href="/"
                className="text-gray-400 hover:text-[#FF6B35] transition-colors ml-1 cursor-pointer"
              >
                Politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
