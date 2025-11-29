import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/components/LanguageContext';

const footerLinks = {
  services: [
    { name: 'Conseil Digital', href: 'Services' },
    { name: 'Développement Web', href: 'Services' },
    { name: 'Marketing Digital', href: 'Services' },
    { name: 'Formation', href: 'Services' },
  ],
  company: [
    { name: 'À propos', href: 'About' },
    { name: 'Équipe', href: 'About' },
    { name: 'Carrières', href: 'About' },
    { name: 'Blog', href: 'Blog' },
  ],
  resources: [
    { name: 'Portfolio', href: 'Portfolio' },
    { name: 'Études de cas', href: 'Portfolio' },
    { name: 'FAQ', href: 'Contact' },
    { name: 'Contact', href: 'Contact' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await base44.entities.Lead.create({
      email,
      full_name: 'Newsletter Subscriber',
      source: 'newsletter',
      status: 'new',
    });
    toast.success(t('footer.newsletter.subscribe') + ' ✓');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-[#0A0A0B] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
                {t('footer.newsletter.title')}
              </h3>
              <p className="text-gray-400">
                {t('footer.newsletter.subtitle')}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-md gap-3">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-full px-6"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C9A86C] hover:bg-[#B8975B] text-[#0A0A0B] rounded-full px-6"
              >
                {isSubmitting ? '...' : <ArrowRight className="w-5 h-5" />}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-xl font-bold text-[#0A0A0B]">P</span>
              </div>
              <span className="text-xl font-semibold">PRECISIONS</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm">
              PRECISIONS transforme vos ambitions digitales en réalité. Innovation, excellence et résultats mesurables.
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@precisions.group" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                contact@precisions.group
              </a>
              <a href="tel:+447802353154" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                +44 7802 353154
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                183 rue Lukula, Bandalungwa Kinshasa
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={createPageUrl(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={createPageUrl(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-6">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={createPageUrl(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PRECISIONS. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}