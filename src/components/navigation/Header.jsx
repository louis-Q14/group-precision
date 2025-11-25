import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { 
    name: 'Accueil', 
    href: 'Home',
    subItems: [
      { name: 'Notre mission', href: 'Home' },
      { name: 'Nos valeurs', href: 'Home' },
      { name: 'Témoignages', href: 'Home' },
    ]
  },
  { 
    name: 'Services', 
    href: 'Services',
    subItems: [
      { name: 'Conception & Réalisation', href: 'Services' },
      { name: 'Consultation', href: 'Services' },
      { name: 'Recherche des Financements', href: 'Services' },
      { name: 'Conseil & Stratégie', href: 'Services' },
      { name: 'Marketing Digital', href: 'Services' },
      { name: 'Formation', href: 'Services' },
    ]
  },
  { 
    name: 'Réalisations', 
    href: 'Portfolio',
    subItems: [
      { name: 'Projets Web', href: 'Portfolio' },
      { name: 'Applications Mobile', href: 'Portfolio' },
      { name: 'Branding', href: 'Portfolio' },
      { name: 'Marketing', href: 'Portfolio' },
    ]
  },
  { 
    name: 'À propos', 
    href: 'About',
    subItems: [
      { name: 'Notre histoire', href: 'About' },
      { name: 'Notre équipe', href: 'About' },
      { name: 'Nos certifications', href: 'About' },
      { name: 'Carrières', href: 'About' },
    ]
  },
  { 
    name: 'Blog', 
    href: 'Blog',
    subItems: [
      { name: 'Insights', href: 'Blog' },
      { name: 'Tutoriels', href: 'Blog' },
      { name: 'Actualités', href: 'Blog' },
      { name: 'Études de cas', href: 'Blog' },
    ]
  },
  { name: 'Contact', href: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [language, setLanguage] = useState('FR');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isScrolled ? 'bg-[#0A0A0B]' : 'bg-white'
                }`}>
                  <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-[#0A0A0B]'}`}>
                    P
                  </span>
                </div>
                <span className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-[#0A0A0B]' : 'text-white'
                }`}>
                  PRECISIONS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                item.subItems ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isScrolled
                            ? 'text-gray-600 hover:text-[#0A0A0B] hover:bg-gray-100'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-[180px] bg-white/20 backdrop-blur-md border-white/20 text-white [&_*]:text-white">
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl(item.href)} className="font-medium">
                          Voir tout
                        </Link>
                      </DropdownMenuItem>
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link to={createPageUrl(subItem.href)}>
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-600 hover:text-[#0A0A0B] hover:bg-gray-100'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${
                      isScrolled ? 'text-gray-600 hover:text-[#0A0A0B]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    {language}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[100px]">
                  <DropdownMenuItem onClick={() => setLanguage('FR')}>
                    Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('EN')}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Button */}
              <Link to={createPageUrl('Contact')}>
                <Button
                  className={`rounded-full px-6 transition-all duration-300 ${
                    isScrolled
                      ? 'bg-[#0A0A0B] text-white hover:bg-[#0A0A0B]/90'
                      : 'bg-white text-[#0A0A0B] hover:bg-white/90'
                  }`}
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#0A0A0B]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl"
            >
              <div className="p-6 pt-24 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={createPageUrl(item.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-lg font-medium text-gray-800 hover:text-[#C9A86C] hover:bg-gray-50 rounded-xl transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-6 mt-6 border-t">
                  <Link to={createPageUrl('Contact')} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full bg-[#0A0A0B] text-white">
                      Démarrer un projet
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}