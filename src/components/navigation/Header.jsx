import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/components/ThemeContext';

const getNavItems = (t, language) => [
  { name: t('nav.home'), href: 'Home' },
  { name: t('nav.services'), href: 'Services' },
  { name: t('nav.portfolio'), href: 'Portfolio' },
  { name: t('nav.about'), href: 'About' },
  { name: t('nav.blog'), href: 'Blog' },
  { name: language === 'FR' ? 'Témoignages' : 'Testimonials', href: 'Testimonials' },
  { name: t('nav.contact'), href: 'Contact' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const navItems = getNavItems(t, language);

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
          <div className="flex items-center justify-between h-32">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="relative z-10">
              <motion.div whileHover={{ scale: 1.02 }}>
                <img
                  src="https://media.base44.com/images/public/69260002cce4fa45e27a5d57/dadef6114_precisions_group_logo.svg"
                  alt="Precisions Group"
                  className={`h-24 w-auto max-w-[280px] transition-all duration-300 ${
                    isScrolled
                      ? theme === 'dark' ? 'brightness-0 invert' : ''
                      : 'brightness-0 invert'
                  }`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
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
                  <DropdownMenuItem onClick={() => setLanguage('FR')} className={language === 'FR' ? 'bg-gray-100' : ''}>
                    🇫🇷 Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('EN')} className={language === 'EN' ? 'bg-gray-100' : ''}>
                    🇬🇧 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full w-9 h-9 ${
                  isScrolled ? 'text-gray-600 hover:text-[#0A0A0B]' : 'text-white/80 hover:text-white'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* CTA Button */}
              <Link to={createPageUrl('Contact')}>
                <Button
                  className={`rounded-full px-6 transition-all duration-300 ${
                    isScrolled
                      ? 'bg-[#0A0A0B] text-white hover:bg-[#0A0A0B]/90'
                      : 'bg-white text-[#0A0A0B] hover:bg-white/90'
                  }`}
                >
                  {t('nav.startProject')}
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
                      {t('nav.startProject')}
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