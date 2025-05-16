"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function HeaderComponet() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUrl = usePathname();
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
     
  return (
    <>
    <header>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#8B4513]">
              Skill<span className="text-[#FF6B35]">Afrik</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={ (currentUrl === '/' ? 'text-[#FF6B35]' : 'text-black')+" hover:text-[#FF6B35] transition-colors cursor-pointer whitespace-nowrap" }
            >
              Accueil
            </Link>
            <Link
              href="/domaines/formation"
              className={ (currentUrl === '/domaines/formation' ? 'text-[#FF6B35]' : 'text-black')+" hover:text-[#FF6B35] transition-colors cursor-pointer whitespace-nowrap" }
            >
              Formations
            </Link>
            <Link
              href="/domaines"
              className={ (currentUrl === '/domaines' ? 'text-[#FF6B35]' : 'text-black')+" hover:text-[#FF6B35] transition-colors cursor-pointer whitespace-nowrap" }
            >
              Domaines
            </Link>
            {/* <Link
              href="#"
              className="text-gray-700 hover:text-[#FF6B35] transition-colors cursor-pointer whitespace-nowrap"
            >
              Abonnements
            </Link> */}
            {/* <Link
              href="/aporos"
              className={ (currentUrl === '/aporos' ? 'text-[#FF6B35]' : '')+" hover:text-[#FF6B35] transition-colors cursor-pointer whitespace-nowrap" }
            >
              À propos
            </Link> */}
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-[#FF6B35] border border-[#FF6B35] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors !rounded-button cursor-pointer whitespace-nowrap">
              Connexion
            </button>
            <button className="hidden md:block px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
              Inscription
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 focus:outline-none cursor-pointer"
            >
              <i
                className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              ></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#FF6B35] transition-colors py-2 cursor-pointer"
              >
                Accueil
              </Link>
              <Link
                href="/domaines/formation"
                className="text-gray-700 hover:text-[#FF6B35] transition-colors py-2 cursor-pointer"
              >
                Formations
              </Link>
              <Link
                href="/domaines"
                className="text-gray-700 hover:text-[#FF6B35] transition-colors py-2 cursor-pointer"
              >
                Domaines
              </Link>
              {/* <Link
                href="#"
                className="text-gray-700 hover:text-[#FF6B35] transition-colors py-2 cursor-pointer"
              >
                Abonnements
              </Link> */}
              {/* <Link
                href="/apropos"
                className="text-gray-700 hover:text-[#FF6B35] transition-colors py-2 cursor-pointer"
              >
                À propos
              </Link> */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <button className="px-4 py-2 text-[#FF6B35] border border-[#FF6B35] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                  Connexion
                </button>
                <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e05a2b] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                  Inscription
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
            
    </header>
    </>
  )
}
