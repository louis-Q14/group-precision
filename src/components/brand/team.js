/**
 * Direction du groupe, partagée par l'accueil et la page À propos.
 */
// Équipe affichée tant qu'aucun membre n'est saisi dans l'Admin (onglet Équipe)
export const getFallbackTeam = (language) => [
  {
    name: 'Louis-Quatorze Kazadi',
    position: language === 'FR' ? 'CEO & Fondateur' : 'CEO & Founder',
    bio: '',
    image: '/images/386c3a38d_Gemini_Generated_Image_g2ibwyg2ibwyg2ib.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Erick Tshamala Kazadi',
    position: 'CEO',
    bio: '',
    image: '/images/3c8027f17_Image_126.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Serge Biona Mwenga',
    position: language === 'FR' ? 'Directeur général' : 'General Manager',
    bio: '',
    image: '/images/d1c5dcc4f_photo_04.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Maitre Joel Mukuna Kalala',
    position: language === 'FR' ? 'Conseil Juridique' : 'Legal Advisor',
    bio: '',
    image: '/images/79b2c13f8_Image_200.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Franciss Mukwanga',
    position: 'Chief Technology Officer',
    bio: '',
    image: '/images/931208f0e_Image_98.png',
    linkedin: '#',
    isLeadership: true,
  },
  ];
