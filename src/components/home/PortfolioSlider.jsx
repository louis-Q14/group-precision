import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const portfolioImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    title: 'Projet HARCHIVE',
    client: 'HARCHIVE',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    title: 'Fintech Revolution',
    client: 'NeoBank Corp',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    title: 'E-Commerce Luxe',
    client: 'Maison Élégance',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    title: 'Plateforme SaaS',
    client: 'TechStart',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    title: 'App Santé Connect',
    client: 'MedTech Plus',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
    title: 'Brand Identity 360',
    client: 'Horizon Group',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop',
    title: 'Stratégie Growth',
    client: 'StartupNow',
  },
];

// Double the array for seamless infinite scroll
const duplicatedImages = [...portfolioImages, ...portfolioImages];

export default function PortfolioSlider({ embedded = false }) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (embedded) {
    return (
      <div className="overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-4"
            animate={{
              x: isHovered ? undefined : [0, -50 * portfolioImages.length * 6],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {duplicatedImages.map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                to={createPageUrl('Portfolio')}
                className="flex-shrink-0 group"
              >
                <div className="relative w-[450px] h-[290px] rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[#C9A86C] text-xs font-medium mb-1">
                      {item.client}
                    </p>
                    <h3 className="text-white text-sm font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#C9A86C]/0 group-hover:border-[#C9A86C]/50 rounded-xl transition-all duration-300" />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#0A0A0B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Nos réalisations
            </h2>
            <p className="text-gray-400">
              Des projets qui ont transformé nos clients
            </p>
          </div>
          <Link 
            to={createPageUrl('Portfolio')}
            className="hidden sm:inline-flex items-center gap-2 text-[#C9A86C] hover:text-[#E8D5B5] transition-colors font-medium"
          >
            Voir tout le portfolio
            <span>→</span>
          </Link>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling track */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * portfolioImages.length * 6],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={createPageUrl('Portfolio')}
              className="flex-shrink-0 group"
            >
              <div className="relative w-[350px] h-[250px] rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[#C9A86C] text-sm font-medium mb-1">
                    {item.client}
                  </p>
                  <h3 className="text-white text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-[#C9A86C]/0 group-hover:border-[#C9A86C]/50 rounded-2xl transition-all duration-300" />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Mobile link */}
      <div className="sm:hidden text-center mt-8">
        <Link 
          to={createPageUrl('Portfolio')}
          className="inline-flex items-center gap-2 text-[#C9A86C] hover:text-[#E8D5B5] transition-colors font-medium"
        >
          Voir tout le portfolio
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}