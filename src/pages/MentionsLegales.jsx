import { useEffect, useState } from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import PageHero from '@/components/brand/PageHero';

/**
 * Mentions légales de PRECISION GROUP (version du 23 novembre 2026).
 * Texte fourni par le groupe, repris sans modification.
 */

const SITE = 'www.group-precision.com';
const EMAIL = 'contact@group-precision.com';
const PHONE = '+243 801 000 000';
const UPDATED = '23 novembre 2026';

const IDENTIFICATION = [
  ['Dénomination sociale', 'PRECISION GROUP'],
  ['Statut juridique', 'Société à Responsabilité Limitée Unipersonnelle (S.A.R.L.U)'],
  ['Siège social', '100, Avenues Colonel Ebeya et TSF, C/ Gombe, V/ Kinshasa, P/ Kinshasa – R.D. Congo'],
  ['RCCM', 'CD/KNG/RCCM/26-B-03806'],
  ['ID NAT', '01-H5300-N14651Z'],
  ['NIF', 'A2657548G'],
  ['ONEM', '020355B26'],
  ['Site internet', SITE],
];

const ARTICLES = [
  { id: 'editeur', title: 'Éditeur du site' },
  { id: 'directeur', title: 'Directeur de la publication' },
  { id: 'hebergeur', title: 'Hébergeur du site' },
  { id: 'propriete', title: 'Propriété intellectuelle' },
  { id: 'donnees', title: 'Données personnelles' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'responsabilite', title: 'Responsabilité' },
  { id: 'droit', title: 'Droit applicable et litiges' },
];

/* ---------- Éléments de mise en forme ---------- */

function Article({ index, id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="scroll-mt-28 py-14 first:pt-0 border-t border-white/10 first:border-t-0">
      <p className="text-sm text-white/45 tabular">Article {index}</p>
      <h2 id={`${id}-titre`} className="mt-2 text-title font-semibold text-gradient">{title}</h2>
      <div className="mt-8 space-y-5 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

function Sub({ children }) {
  return <h3 className="pt-4 text-lg font-semibold text-white tracking-tight">{children}</h3>;
}

function List({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Term({ children }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function MailLink() {
  return <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-4 hover:text-white/80">{EMAIL}</a>;
}

function Todo() {
  return <span className="rounded-md border border-dashed border-white/25 px-2 py-0.5 text-sm text-white/50">À compléter</span>;
}

/* ---------- Sommaire qui suit la lecture ---------- */

function useActiveArticle() {
  const [active, setActive] = useState(ARTICLES[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    ARTICLES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function MentionsLegales() {
  const active = useActiveArticle();

  return (
    <main className="bg-black text-white">
      <PageHero
        title="Mentions légales"
        lede={`Site internet ${SITE} — PRECISION GROUP. Dernière mise à jour : ${UPDATED}.`}
      />

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-x-12 gap-y-10">
        {/* Sommaire */}
        <nav aria-label="Sommaire des mentions légales" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 rounded-2xl glass p-5">
            <p className="text-sm font-medium text-white">Sommaire</p>
            <ol className="mt-4 space-y-1 text-sm">
              {ARTICLES.map((a, i) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    aria-current={active === a.id ? 'true' : undefined}
                    className={`flex gap-3 rounded-lg px-3 py-2 transition-colors ${
                      active === a.id ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="tabular text-white/40">{i + 1}</span>
                    {a.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Texte */}
        <div className="lg:col-span-9 max-w-3xl">
          <div className="rounded-2xl glass p-6 lg:p-8 space-y-4 text-white/75 leading-relaxed mb-16">
            <p>
              Conformément aux dispositions légales et réglementaires applicables en République Démocratique du Congo,
              notamment l'Ordonnance-loi n° 23/010 du 13 mars 2023 portant Code du numérique, les présentes mentions
              légales ont pour objet d'informer les utilisateurs et visiteurs du site {SITE} (ci-après « le Site ») de
              l'identité des différents intervenants dans le cadre de sa réalisation, de son exploitation et de son suivi,
              ainsi que des conditions dans lesquelles le Site peut être consulté et utilisé.
            </p>
            <p>
              L'accès au Site et sa navigation impliquent l'acceptation pleine et entière des présentes mentions légales.
              Il est donc recommandé à tout utilisateur de les lire attentivement et de les consulter régulièrement,
              celles-ci étant susceptibles d'être modifiées à tout moment.
            </p>
          </div>

          {/* Article 1 */}
          <Article index={1} {...ARTICLES[0]}>
            <p>
              Le Site {SITE} est édité par la société PRECISION GROUP, société commerciale de droit congolais constituée
              sous la forme d'une Société à Responsabilité Limitée Unipersonnelle (S.A.R.L.U), conformément à l'Acte
              uniforme OHADA relatif au droit des sociétés commerciales et du groupement d'intérêt économique.
            </p>
            <p>
              PRECISION GROUP est un groupe pluridisciplinaire qui conçoit, développe et exploite des solutions numériques
              et des plateformes propriétaires à destination des particuliers, des entreprises et des institutions. Le Site
              a pour vocation de présenter le groupe, ses activités, ses services et ses plateformes, et de permettre aux
              visiteurs d'entrer en relation avec ses équipes.
            </p>

            <Sub>Identification de la société</Sub>
            <dl className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
              {IDENTIFICATION.map(([label, value]) => (
                <div key={label} className="grid sm:grid-cols-[13rem_1fr] gap-1 sm:gap-6 px-5 py-4 bg-white/[0.02] even:bg-white/[0.04]">
                  <dt className="text-sm text-white/50">{label}</dt>
                  <dd className="text-white tabular">{value}</dd>
                </div>
              ))}
            </dl>

            <Sub>Coordonnées de contact</Sub>
            <p>
              Pour toute question, demande d'information, réclamation ou signalement relatif au Site ou à son contenu,
              l'utilisateur peut contacter PRECISION GROUP par les moyens suivants :
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Phone, label: 'Téléphone', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
                { icon: Mail, label: 'Courrier électronique', value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: Globe, label: 'Site internet', value: SITE, href: `https://${SITE}` },
                { icon: MapPin, label: 'Adresse postale', value: '100, Avenues Colonel Ebeya et TSF, Commune de la Gombe, Kinshasa – R.D. Congo' },
              ].map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/50">{label}</span>
                      <span className="block text-white break-words">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="flex h-full gap-4 rounded-2xl glass p-4 hover:border-white/25 transition-colors">{inner}</a>
                    ) : (
                      <div className="flex h-full gap-4 rounded-2xl glass p-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p>
              PRECISION GROUP s'efforce de répondre à toute demande dans les meilleurs délais. Afin de faciliter le
              traitement de votre demande, il vous est recommandé de préciser clairement l'objet de votre message ainsi
              que vos coordonnées complètes.
            </p>
          </Article>

          {/* Article 2 */}
          <Article index={2} {...ARTICLES[1]}>
            <p>
              Conformément aux usages et à la réglementation applicable en matière de communication en ligne, le Site
              dispose d'un directeur de la publication, personne physique responsable du contenu éditorial mis en ligne.
            </p>
            <List
              items={[
                <><Term>Nom et prénom :</Term> Louis-Quatorze Kazadi</>,
                <><Term>Qualité :</Term> Gérant / Directeur général — CEO & Fondateur de PRECISION GROUP</>,
                <><Term>Contact :</Term> <MailLink /></>,
              ]}
            />
            <Sub>Rôle et responsabilités</Sub>
            <p>
              Le directeur de la publication est responsable du contenu éditorial publié sur le Site {SITE}. À ce titre,
              il veille notamment :
            </p>
            <List
              items={[
                'à l\'exactitude, à la pertinence et à la mise à jour régulière des informations publiées ;',
                'au respect des droits des tiers, notamment en matière de propriété intellectuelle, de droit à l\'image et de protection de la vie privée ;',
                'à la conformité des contenus avec les lois et règlements en vigueur, l\'ordre public et les bonnes mœurs ;',
                'au retrait ou à la rectification, dans les meilleurs délais, de tout contenu manifestement illicite ou erroné qui lui serait signalé.',
              ]}
            />
            <p>
              Le directeur de la publication peut, sous sa responsabilité, déléguer à des collaborateurs habilités la
              rédaction, la validation ou la mise en ligne de certains contenus. Toute demande de droit de réponse, de
              rectification ou de retrait d'un contenu doit lui être adressée par écrit à l'adresse électronique indiquée
              ci-dessus, en précisant de manière claire le contenu concerné, son emplacement sur le Site ainsi que les
              motifs de la demande.
            </p>
          </Article>

          {/* Article 3 */}
          <Article index={3} {...ARTICLES[2]}>
            <p>
              Le Site {SITE} est hébergé par un prestataire d'hébergement professionnel assurant la disponibilité et la
              sécurité des données. Les informations d'identification de l'hébergeur sont les suivantes :
            </p>
            <List
              items={[
                <><Term>Dénomination :</Term> <Todo /></>,
                <><Term>Adresse :</Term> <Todo /></>,
                <><Term>Contact :</Term> <Todo /></>,
              ]}
            />
            <Sub>Engagements de l'hébergeur</Sub>
            <p>
              L'hébergeur assure la continuité du service d'accès au Site, l'archivage et la conservation des données
              traitées dans le respect de la législation en vigueur en République Démocratique du Congo. Il met en œuvre,
              en particulier :
            </p>
            <List
              items={[
                'des infrastructures serveurs sécurisées et redondantes, permettant de limiter les risques d\'interruption ;',
                'des sauvegardes régulières des données afin de prévenir toute perte accidentelle ;',
                'des mesures de protection contre les intrusions, les attaques informatiques et les logiciels malveillants ;',
                'une surveillance technique permanente des services hébergés.',
              ]}
            />
            <Sub>Disponibilité du Site</Sub>
            <p>
              Le Site est en principe accessible 24 heures sur 24 et 7 jours sur 7, sauf cas de force majeure ou survenance
              d'un événement échappant au contrôle de PRECISION GROUP ou de son hébergeur. L'accès au Site peut être
              temporairement suspendu, sans préavis, pour des opérations de maintenance, de mise à jour ou d'amélioration
              technique.
            </p>
            <p>
              PRECISION GROUP ne saurait être tenue responsable des interruptions ou dysfonctionnements liés au réseau
              internet, aux équipements de l'utilisateur ou à des opérations de maintenance nécessaires au bon
              fonctionnement du Site.
            </p>
          </Article>

          {/* Article 4 */}
          <Article index={4} {...ARTICLES[3]}>
            <p>
              L'ensemble des éléments présents sur ce Site (textes, logos, images, vidéos, graphismes, mise en page,
              structure, design, plateformes propriétaires) est la propriété exclusive de PRECISION GROUP, sauf mention
              contraire.
            </p>
            <p>
              Ces éléments sont protégés par la législation congolaise relative à la propriété intellectuelle, notamment
              l'Ordonnance-loi n° 86-033 du 5 avril 1986 portant protection des droits d'auteur et des droits voisins et la
              loi n° 82-001 du 7 janvier 1982 régissant la propriété industrielle, ainsi que par les conventions
              internationales applicables.
            </p>
            <Sub>Interdictions</Sub>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, des éléments
              du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de
              PRECISION GROUP. Sont notamment interdits, sans autorisation préalable :
            </p>
            <List
              items={[
                'la copie, l\'extraction ou la réutilisation de tout ou partie des contenus du Site, en particulier à des fins commerciales ;',
                'l\'utilisation des logos, marques et dénominations du groupe ;',
                'la reproduction de l\'architecture, du design ou du code source des plateformes ;',
                'toute utilisation susceptible de créer une confusion dans l\'esprit du public quant à l\'origine des contenus ou à l\'existence d\'un partenariat.',
              ]}
            />
            <p>
              Toute exploitation non autorisée du Site ou de l'un quelconque des éléments qu'il contient sera considérée
              comme constitutive d'une contrefaçon et pourra donner lieu à des poursuites judiciaires, civiles et pénales.
            </p>
            <Sub>Marques et plateformes propriétaires</Sub>
            <p>
              Les plateformes propriétaires (SombaTeka, Harchive, App243, ParckBox, Pay243, OrbitalInvest) ainsi que leurs
              dénominations sont des marques protégées au sein de PRECISION GROUP. Leur utilisation, de quelque manière que
              ce soit, est strictement interdite sans l'accord écrit préalable du groupe. Les marques et logos de tiers
              éventuellement présents sur le Site demeurent la propriété de leurs titulaires respectifs.
            </p>
            <p>
              Toute demande d'autorisation de reproduction ou d'utilisation doit être adressée par écrit à l'adresse :{' '}
              <MailLink />.
            </p>
          </Article>

          {/* Article 5 */}
          <Article index={5} {...ARTICLES[4]}>
            <p>
              Conformément à la législation en vigueur en République Démocratique du Congo relative à la protection des
              données à caractère personnel, notamment l'Ordonnance-loi n° 23/010 du 13 mars 2023 portant Code du
              numérique, PRECISION GROUP s'engage à protéger les données personnelles collectées via les formulaires
              présents sur ce Site et à en assurer un traitement licite, loyal et transparent.
            </p>
            <Sub>Données collectées et finalités</Sub>
            <p>
              Les données collectées (nom, adresse e-mail, numéro de téléphone, entreprise, message) sont utilisées aux fins
              suivantes :
            </p>
            <List
              items={[
                'le traitement et le suivi des demandes adressées via les formulaires du Site ;',
                'la prospection commerciale et l\'envoi d\'informations relatives aux offres et services du groupe ;',
                'la communication institutionnelle de PRECISION GROUP ;',
                'l\'amélioration continue des services et de l\'expérience utilisateur.',
              ]}
            />
            <p>
              PRECISION GROUP veille à ne collecter que les données adéquates, pertinentes et limitées à ce qui est
              nécessaire au regard des finalités poursuivies. Ces données sont conservées pendant une durée n'excédant pas
              celle nécessaire à la réalisation de ces finalités, augmentée le cas échéant des durées de conservation
              imposées par la loi.
            </p>
            <Sub>Sécurité et confidentialité</Sub>
            <p>
              PRECISION GROUP met en œuvre les mesures techniques et organisationnelles appropriées afin de garantir la
              sécurité et la confidentialité des données personnelles, et notamment d'empêcher qu'elles soient déformées,
              endommagées, perdues ou que des tiers non autorisés y aient accès.
            </p>
            <p>
              PRECISION GROUP ne vend, ne loue et ne cède en aucun cas vos données personnelles à des tiers. Seules les
              personnes habilitées du groupe, ainsi que ses prestataires techniques agissant pour son compte et soumis à
              une obligation de confidentialité, peuvent y avoir accès dans la stricte limite de leurs missions.
            </p>
            <Sub>Vos droits</Sub>
            <p>Conformément à la loi, vous disposez des droits suivants sur vos données personnelles :</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Droit d\'accès', 'obtenir la confirmation que vos données sont traitées et en recevoir une copie ;'],
                ['Droit de rectification', 'faire corriger des données inexactes ou incomplètes ;'],
                ['Droit d\'effacement', 'demander la suppression de vos données dans les conditions prévues par la loi ;'],
                ['Droit à la limitation', 'demander la suspension temporaire du traitement de vos données ;'],
                ['Droit d\'opposition', 'vous opposer, pour des motifs légitimes, au traitement de vos données, et à tout moment à leur utilisation à des fins de prospection commerciale.'],
              ].map(([right, text]) => (
                <div key={right} className="rounded-2xl glass p-5">
                  <p className="font-semibold text-white">{right}</p>
                  <p className="mt-1.5 text-sm text-white/60">{text}</p>
                </div>
              ))}
            </div>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <MailLink />, en précisant l'objet de votre
              demande. Une réponse vous sera apportée dans les meilleurs délais. Si vous estimez, après nous avoir
              contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'autorité
              compétente en matière de protection des données.
            </p>
          </Article>

          {/* Article 6 */}
          <Article index={6} {...ARTICLES[5]}>
            <p>
              Le Site {SITE} utilise des cookies afin d'améliorer l'expérience de navigation, de mesurer l'audience et
              d'optimiser les performances du Site.
            </p>
            <Sub>Qu'est-ce qu'un cookie ?</Sub>
            <p>
              Un cookie est un petit fichier texte déposé et enregistré sur le terminal de l'utilisateur (ordinateur,
              tablette, smartphone) lors de la consultation d'un site internet. Il permet au site de reconnaître le terminal
              lors de visites ultérieures, de mémoriser certaines préférences et de recueillir des informations sur la
              navigation.
            </p>
            <Sub>Catégories de cookies utilisés</Sub>
            <p>Le Site est susceptible d'utiliser les catégories de cookies suivantes :</p>
            <List
              items={[
                <><Term>Cookies techniques :</Term> indispensables au fonctionnement du Site et à la fourniture des services expressément demandés par l'utilisateur ;</>,
                <><Term>Cookies de mesure d'audience :</Term> permettant de connaître la fréquentation du Site, les pages consultées et le parcours des visiteurs, afin d'en améliorer l'ergonomie et le contenu ;</>,
                <><Term>Cookies de performance et de préférences :</Term> permettant de mémoriser les choix de l'utilisateur (langue, affichage) et d'optimiser la rapidité et la fluidité de la navigation.</>,
              ]}
            />
            <Sub>Gestion des cookies</Sub>
            <p>
              Vous avez la possibilité de désactiver les cookies via les paramètres de votre navigateur. Le cas échéant,
              certaines fonctionnalités du Site pourraient ne pas être disponibles. La configuration de chaque navigateur
              est différente ; elle est généralement décrite dans le menu d'aide de celui-ci (Google Chrome, Mozilla
              Firefox, Microsoft Edge, Safari, etc.), qui vous permettra de savoir de quelle manière modifier vos souhaits
              en matière de cookies.
            </p>
            <p>
              Vous pouvez également choisir de supprimer à tout moment les cookies déjà enregistrés sur votre terminal. La
              poursuite de la navigation sur le Site sans modification des paramètres du navigateur vaut acceptation du
              dépôt des cookies décrits ci-dessus.
            </p>
          </Article>

          {/* Article 7 */}
          <Article index={7} {...ARTICLES[6]}>
            <p>
              PRECISION GROUP met tout en œuvre pour fournir des informations fiables et tenues à jour. Toutefois, le Site
              ne saurait garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. Les
              informations présentes sur le Site sont fournies à titre indicatif et ne sauraient constituer une offre
              contractuelle ni un conseil personnalisé.
            </p>
            <Sub>Limitation de responsabilité</Sub>
            <p>
              PRECISION GROUP décline toute responsabilité quant aux éventuels dommages résultant de l'accès au Site, de son
              utilisation ou de l'impossibilité d'y accéder. Cette exclusion couvre notamment :
            </p>
            <List
              items={[
                'les erreurs, omissions ou inexactitudes pouvant figurer dans les contenus publiés ;',
                'les interruptions, ralentissements ou indisponibilités temporaires du Site ;',
                'l\'introduction de virus ou de tout autre programme malveillant sur le terminal de l\'utilisateur ;',
                'les dommages directs ou indirects liés à l\'utilisation des informations diffusées sur le Site.',
              ]}
            />
            <Sub>Obligations de l'utilisateur</Sub>
            <p>
              L'utilisateur s'engage à utiliser le Site de manière loyale et conforme à sa destination, ainsi qu'aux lois et
              règlements en vigueur. Il est seul responsable de l'utilisation qu'il fait des informations et contenus du
              Site, ainsi que de la protection de son propre matériel et de ses données. Il s'interdit toute action de nature
              à perturber le bon fonctionnement du Site ou à porter atteinte à sa sécurité.
            </p>
            <Sub>Liens hypertextes</Sub>
            <p>
              Les liens hypertextes présents sur ce Site renvoyant vers d'autres sites internet n'engagent pas la
              responsabilité de PRECISION GROUP quant au contenu de ces sites, sur lesquels elle n'exerce aucun contrôle. La
              mise en place d'un lien hypertexte vers le Site {SITE} nécessite l'autorisation préalable et écrite de
              PRECISION GROUP, qui se réserve le droit d'en demander la suppression à tout moment.
            </p>
          </Article>

          {/* Article 8 */}
          <Article index={8} {...ARTICLES[7]}>
            <p>
              Le présent Site et les présentes mentions légales sont soumis au droit applicable en République Démocratique
              du Congo. Les présentes mentions légales sont rédigées en langue française ; en cas de traduction, seule la
              version française fait foi.
            </p>
            <Sub>Résolution amiable</Sub>
            <p>
              En cas de difficulté ou de différend relatif à l'interprétation, à l'exécution ou à la validité des présentes
              mentions légales, ou plus généralement à l'utilisation du Site, l'utilisateur est invité à contacter
              préalablement PRECISION GROUP afin de rechercher une solution amiable. Toute réclamation peut être adressée :
            </p>
            <List
              items={[
                <><Term>Par courrier électronique :</Term> <MailLink /> ;</>,
                <><Term>Par courrier, au siège social :</Term> 100, Avenues Colonel Ebeya et TSF, Commune de la Gombe, Kinshasa – R.D. Congo.</>,
              ]}
            />
            <Sub>Juridiction compétente</Sub>
            <p>
              En cas de litige, et après tentative de résolution amiable restée infructueuse, les tribunaux compétents de
              Kinshasa seront seuls compétents pour connaître de ce litige.
            </p>
            <Sub>Modification des mentions légales</Sub>
            <p>
              PRECISION GROUP se réserve le droit de modifier, à tout moment et sans préavis, les présentes mentions légales
              afin de les adapter aux évolutions du Site, de ses services ou de la réglementation applicable. Les
              modifications prennent effet dès leur mise en ligne. L'utilisateur est donc invité à consulter régulièrement
              cette page afin de prendre connaissance de la version en vigueur.
            </p>
          </Article>

          <p className="mt-6 pt-8 border-t border-white/10 text-right text-white/50 italic">
            PRECISION GROUP — Kinshasa, République Démocratique du Congo
          </p>
        </div>
      </div>
    </main>
  );
}
