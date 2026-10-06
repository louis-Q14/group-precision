import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Building2, UserCog, Server, Shield, 
  Cookie, AlertCircle, Scale, Mail, Phone, MapPin, Globe
} from 'lucide-react';

const legalSections = [
  {
    id: 'editeur',
    icon: Building2,
    title: '1. Éditeur du site',
    content: (
      <div className="space-y-4">
        <p>
          Le présent site <strong>www.precisions.group</strong> est édité par :
        </p>
        <div className="bg-[#FAFAFA] rounded-xl p-6 space-y-2 text-sm">
          <p><strong>Dénomination sociale :</strong> PRECISION GROUP</p>
          <p><strong>Statut juridique :</strong> Société à responsabilité limitée (SARL)</p>
          <p><strong>Siège social :</strong> 100, Avenues Colonel Ebeya et TSF, C/ Gombe, V/ Kinshasa, P/ Kinshasa – R.D. Congo</p>
          <p><strong>RCCM :</strong> CD/KNG/RCCM/26-B-03806</p>
          <p><strong>ID NAT :</strong> 01-H5300-N14651Z</p>
          <p><strong>NIF :</strong> 123456789</p>
          <p><strong>ONEM :</strong> 020355B26</p>
        </div>
        <div className="space-y-2">
          <p><strong>Coordonnées de contact :</strong></p>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C9A86C]" /> +243 801 000 000</p>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C9A86C]" /> contact@precisions.group</p>
          <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#C9A86C]" /> www.precisions.group</p>
        </div>
      </div>
    ),
  },
  {
    id: 'directeur',
    icon: UserCog,
    title: '2. Directeur de la publication',
    content: (
      <div className="space-y-4">
        <p>
          <strong>Nom et prénom :</strong> Louis-Quatorze Kazadi
        </p>
        <p>
          <strong>Qualité :</strong> Gérant / Directeur général — CEO & Fondateur de PRECISIONS GROUP
        </p>
        <p>
          Le directeur de la publication est responsable du contenu éditorial publié sur le site
          www.precisions.group.
        </p>
      </div>
    ),
  },
  {
    id: 'hebergeur',
    icon: Server,
    title: '3. Hébergeur du site',
    content: (
      <div className="space-y-4">
        <p>
          Le site www.precisions.group est hébergé par un prestataire d'hébergement professionnel
          assurant la disponibilité et la sécurité des données.
        </p>
        <p>
          L'hébergeur assure la continuité du service d'accès au site, l'archivage et la conservation
          des données traitées dans le respect de la législation en vigueur en République Démocratique du Congo.
        </p>
      </div>
    ),
  },
  {
    id: 'propriete',
    icon: Shield,
    title: '4. Propriété intellectuelle',
    content: (
      <div className="space-y-4">
        <p>
          L'ensemble des éléments présents sur ce site (textes, logos, images, vidéos, graphismes,
          mise en page, structure, design, plateformes propriétaires) est la propriété exclusive de
          PRECISIONS GROUP, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, adaptation, totale ou
          partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite
          sans l'autorisation écrite préalable de PRECISIONS GROUP.
        </p>
        <p>
          Les plateformes propriétaires (SombaTeka, HARCHIVE, App243, PARCK BOX, OrbitalInvest) ainsi
          que leurs dénominations sont des marques protégées au sein du groupe PRECISIONS.
        </p>
      </div>
    ),
  },
  {
    id: 'donnees',
    icon: Shield,
    title: '5. Données personnelles',
    content: (
      <div className="space-y-4">
        <p>
          Conformément à la législation en vigueur en République Démocratique du Congo relative à la
          protection des données à caractère personnel, PRECISIONS GROUP s'engage à protéger les
          données personnelles collectées via les formulaires présents sur ce site.
        </p>
        <p>
          Les données collectées (nom, adresse e-mail, numéro de téléphone, entreprise, message) sont
          utilisées aux fins de traitement des demandes, de prospection commerciale et de communication.
        </p>
        <p>
          Conformément à la loi, vous disposez d'un droit d'accès, de rectification, d'effacement,
          de limitation et d'opposition au traitement de vos données. Pour exercer ces droits, vous
          pouvez nous contacter à l'adresse : <strong>contact@precisions.group</strong>.
        </p>
        <p>
          PRECISIONS GROUP ne vend, ne loue et ne cède en aucun cas vos données personnelles à des tiers.
        </p>
      </div>
    ),
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: '6. Cookies',
    content: (
      <div className="space-y-4">
        <p>
          Le site www.precisions.group utilise des cookies afin d'améliorer l'expérience de
          navigation, de mesurer l'audience et d'optimiser les performances du site.
        </p>
        <p>
          Vous avez la possibilité de désactiver les cookies via les paramètres de votre navigateur.
          Le cas échéant, certaines fonctionnalités du site pourraient ne pas être disponibles.
        </p>
      </div>
    ),
  },
  {
    id: 'responsabilite',
    icon: AlertCircle,
    title: '7. Responsabilité',
    content: (
      <div className="space-y-4">
        <p>
          PRECISIONS GROUP met tout en œuvre pour fournir des informations fiables et tenues à jour.
          Toutefois, le site ne saurait garantir l'exactitude, la précision ou l'exhaustivité des
          informations mises à disposition.
        </p>
        <p>
          PRECISIONS GROUP décline toute responsabilité quant aux éventuels dommages résultant de
          l'accès au site, de son utilisation ou de l'impossibilité d'y accéder.
        </p>
        <p>
          Les liens hypertextes présents sur ce site renvoyant vers d'autres sites internet ne
          engagent pas la responsabilité de PRECISIONS GROUP quant au contenu de ces sites.
        </p>
      </div>
    ),
  },
  {
    id: 'droit',
    icon: Scale,
    title: '8. Droit applicable et litiges',
    content: (
      <div className="space-y-4">
        <p>
          Le présent site et les présentes mentions légales sont soumis au droit applicable en
          République Démocratique du Congo.
        </p>
        <p>
          En cas de litige, et après tentative de résolution amiable, les tribunaux compétents de
          Kinshasa seront seuls compétents pour connaître de ce litige.
        </p>
      </div>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
          >
            <FileText className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-white">Informations légales</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Mentions Légales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Conformément à la législation en vigueur en République Démocratique du Congo.
          </motion.p>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {legalSections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-l-2 border-[#C9A86C]/30 pl-6 lg:pl-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A86C]/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#C9A86C]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A0A0B]">{section.title}</h2>
                </div>
                <div className="text-gray-600 leading-relaxed text-[15px]">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Band */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#0A0A0B] rounded-3xl p-10 lg:p-14 text-white">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A86C]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A86C]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-gray-400 text-sm">
                    100, Avenues Colonel Ebeya et TSF<br />
                    C/ Gombe, V/ Kinshasa<br />
                    P/ Kinshasa – R.D. Congo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A86C]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C9A86C]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Téléphone</h3>
                  <p className="text-gray-400 text-sm">
                    +243 801 000 000<br />
                    +243 801 000 000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A86C]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#C9A86C]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact</h3>
                  <p className="text-gray-400 text-sm">
                    contact@precisions.group<br />
                    www.precisions.group
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}