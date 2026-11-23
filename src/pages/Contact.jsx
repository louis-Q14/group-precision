import PageHero from '@/components/brand/PageHero';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { db } from '@/api/db';
import { invokeFunction, FunctionError } from '@/api/functions';
import { SupabaseNotConfiguredError } from '@/lib/supabase';
import usePublicEntity from '@/hooks/usePublicEntity';
import { useLanguage } from '@/components/LanguageContext';

const getContactInfo = (en) => [
  {
    icon: Mail,
    title: en ? 'Email' : 'E-mail',
    value: 'contact@group-precision.com',
    link: 'mailto:contact@group-precision.com',
  },
  {
    icon: Phone,
    title: en ? 'Phone' : 'Téléphone',
    value: '+243 800 000 000',
    link: 'tel:+243800000000',
  },
  {
    icon: MapPin,
    title: en ? 'Address' : 'Adresse',
    value: en ? '100 Colonel Ebeya Ave. & TSF, Gombe, Kinshasa, DR Congo' : '100, Av. Colonel Ebeya et TSF, C/ Gombe, Kinshasa, R.D. Congo',
    link: '#',
  },
  {
    icon: Clock,
    title: en ? 'Opening hours' : 'Horaires',
    value: en ? 'Mon – Fri: 9 am – 6 pm' : 'Lun – Ven : 9 h – 18 h',
    link: null,
  },
];

// Questions affichées tant qu'aucune FAQ n'est saisie dans l'Admin (onglet FAQ)
const FALLBACK_FAQS_FR = [
  {
    question: 'Quel est le délai moyen pour un projet ?',
    answer: 'Le délai dépend de la complexité du projet. Un site vitrine prend généralement 4-6 semaines, tandis qu\'une application web complexe peut nécessiter 3-6 mois. Nous établissons un planning détaillé lors de la phase de cadrage.',
  },
  {
    question: 'Comment se déroule la collaboration ?',
    answer: 'Nous travaillons en mode agile avec des sprints de 2 semaines. Vous avez un chef de projet dédié, des points hebdomadaires et un accès à notre plateforme de suivi en temps réel.',
  },
  {
    question: 'Quel budget prévoir ?',
    answer: 'Nos projets démarrent à partir de 5 000€ pour un site vitrine et peuvent aller jusqu\'à plusieurs centaines de milliers d\'euros pour des projets complexes. Nous proposons toujours un devis détaillé gratuit.',
  },
  {
    question: 'Proposez-vous de la maintenance ?',
    answer: 'Oui, nous proposons des contrats de maintenance et support adaptés à vos besoins : mises à jour de sécurité, évolutions fonctionnelles, support technique avec SLA garantis.',
  },
  {
    question: 'Travaillez-vous avec des startups ?',
    answer: 'Absolument ! Nous accompagnons de nombreuses startups, du MVP au scale. Nous proposons des modalités adaptées et pouvons également intervenir en échange d\'equity.',
  },
];

const FALLBACK_FAQS_EN = [
  {
    question: 'How long does a project usually take?',
    answer: 'It depends on the complexity of the project. A showcase website usually takes 4–6 weeks, while a complex web application can take 3–6 months. We draw up a detailed schedule during the scoping phase.',
  },
  {
    question: 'How does the collaboration work?',
    answer: 'We work in an agile way with two-week sprints. You have a dedicated project manager, weekly check-ins and access to our real-time tracking platform.',
  },
  {
    question: 'What budget should I plan for?',
    answer: 'Our projects start at €5,000 for a showcase website and can reach several hundred thousand euros for complex projects. We always provide a free, detailed quote.',
  },
  {
    question: 'Do you offer maintenance?',
    answer: 'Yes, we offer maintenance and support contracts tailored to your needs: security updates, new features and technical support with guaranteed SLAs.',
  },
  {
    question: 'Do you work with startups?',
    answer: 'Absolutely. We support many startups, from MVP to scale-up. We offer adapted terms and can also work in exchange for equity.',
  },
];

const TEXT = {
  FR: {
    title: 'Parlons de votre projet',
    lede: 'Décrivez votre besoin : nous revenons vers vous avec une première lecture et les bons interlocuteurs. Le premier échange est gratuit.',
    details: 'Nos coordonnées',
    detailsNote: 'Une question rapide ? Écrivez-nous ou appelez-nous directement.',
    required: 'Les champs marqués d’un * sont obligatoires. Réponse sous 24 h ouvrées.',
    aboutYou: 'Vous',
    yourProject: 'Votre projet',
    sentToast: 'Message envoyé avec succès !',
    sent: 'Message envoyé !',
    sentText: 'Merci pour votre message. Notre équipe vous contactera dans les 24 h.',
    another: 'Envoyer un autre message',
    formTitle: 'Envoyez-nous un message',
    fullName: 'Nom complet *',
    email: 'E-mail professionnel *',
    phone: 'Téléphone',
    company: 'Entreprise',
    companyPh: 'Nom de votre entreprise',
    projectType: 'Type de projet *',
    budget: 'Budget estimé',
    select: 'Sélectionnez',
    interests: { consulting: 'Conseil et stratégie', development: 'Développement', marketing: 'Marketing digital', formation: 'Formation', autre: 'Autre' },
    budgets: ['Moins de 5 000 €', '5 000 € – 15 000 €', '15 000 € – 50 000 €', '50 000 € – 100 000 €', 'Plus de 100 000 €'],
    message: 'Votre message *',
    messagePh: 'Décrivez votre projet, vos objectifs et vos contraintes…',
    sending: 'Envoi en cours…',
    submit: 'Envoyer le message',
    consent: 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.',
    faqTitle: 'Questions fréquentes',
    faqSub: 'Retrouvez les réponses aux questions les plus courantes.',
    error: 'Une erreur est survenue. Veuillez réessayer.',
  },
  EN: {
    title: 'Let’s talk about your project',
    lede: 'Tell us what you need: we will come back to you with a first assessment and the right people. The first conversation is free.',
    details: 'Contact details',
    detailsNote: 'A quick question? Email or call us directly.',
    required: 'Fields marked * are required. We reply within one business day.',
    aboutYou: 'About you',
    yourProject: 'Your project',
    sentToast: 'Message sent successfully!',
    sent: 'Message sent!',
    sentText: 'Thank you for your message. Our team will get back to you within 24 hours.',
    another: 'Send another message',
    formTitle: 'Send us a message',
    fullName: 'Full name *',
    email: 'Work email *',
    phone: 'Phone',
    company: 'Company',
    companyPh: 'Your company name',
    projectType: 'Project type *',
    budget: 'Estimated budget',
    select: 'Select',
    interests: { consulting: 'Consulting and strategy', development: 'Development', marketing: 'Digital marketing', formation: 'Training', autre: 'Other' },
    budgets: ['Under €5,000', '€5,000 – €15,000', '€15,000 – €50,000', '€50,000 – €100,000', 'Over €100,000'],
    message: 'Your message *',
    messagePh: 'Describe your project, your goals and your constraints…',
    sending: 'Sending…',
    submit: 'Send message',
    consent: 'By submitting this form, you accept our privacy policy.',
    faqTitle: 'Frequently asked questions',
    faqSub: 'Answers to the most common questions.',
    error: 'Something went wrong. Please try again.',
  },
};

const BUDGET_VALUES = ['< 5k', '5k-15k', '15k-50k', '50k-100k', '> 100k'];

// Message montré au visiteur : celui de la fonction d'envoi (ex. « Adresse email invalide »)
// ou de la configuration ; les erreurs techniques de la base restent génériques.
const getErrorMessage = (error, fallback) =>
  (error instanceof FunctionError || error instanceof SupabaseNotConfiguredError) && error.message
    ? error.message
    : fallback;

export default function Contact() {
  const { language } = useLanguage();
  const en = language === 'EN';
  const tx = en ? TEXT.EN : TEXT.FR;
  const contactInfo = getContactInfo(en);
  const { items: faqs } = usePublicEntity('FAQ', { sortByOrder: true, fallback: en ? FALLBACK_FAQS_EN : FALLBACK_FAQS_FR });
  // true quand la demande est déjà enregistrée mais que l'email a échoué
  const leadSavedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    budget_range: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Les champs optionnels vides ('') sont retirés : ils ne respectent pas les listes
    // de valeurs autorisées de la table leads (budget, type de projet)
    const cleanData = Object.fromEntries(
      Object.entries(formData)
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        .filter(([, value]) => value !== '')
    );

    try {
      // Si un envoi précédent a déjà enregistré la demande (seul l'email avait échoué),
      // on ne la recrée pas : on renvoie uniquement l'email, pour éviter les doublons.
      // (Pas de modification ici : elle est réservée aux admins par les règles de la base.)
      if (!leadSavedRef.current) {
        await db.Lead.submit({ ...cleanData, source: 'contact_page' });
        leadSavedRef.current = true;
      }

      await invokeFunction('send-contact-email', cleanData);

      toast.success(tx.sentToast);
      leadSavedRef.current = false;
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error(getErrorMessage(error, tx.error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <PageHero
        title={tx.title}
        lede={tx.lede}
      />

      {/* Coordonnées + formulaire, réunis dans une seule carte */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {/* Coordonnées */}
            <aside className="border-b border-white/10 bg-white/[0.03] p-8 lg:border-b-0 lg:border-r lg:p-9">
              <h2 className="text-xl font-semibold tracking-tight text-white">{tx.details}</h2>
              <p className="mt-3 text-sm text-white/55">{tx.detailsNote}</p>

              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info) => (
                  <li key={info.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <info.icon className="h-[18px] w-[18px] text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-white/50">{info.title}</div>
                      {info.link && info.link !== '#' ? (
                        <a href={info.link} className="mt-0.5 block text-[15px] font-medium text-white [overflow-wrap:anywhere] underline-offset-4 hover:underline">
                          {info.value}
                        </a>
                      ) : (
                        <div className="mt-0.5 text-[15px] font-medium text-white">{info.value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Formulaire */}
            <div className="p-8 lg:p-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">{tx.sent}</h2>
                  <p className="mb-8 max-w-md text-white/60">{tx.sentText}</p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        full_name: '', email: '', phone: '', company: '',
                        interest: '', budget_range: '', message: '',
                      });
                    }}
                    variant="outline"
                    className="rounded-full"
                  >
                    {tx.another}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">{tx.formTitle}</h2>
                  <p className="mt-2 text-sm text-white/55">{tx.required}</p>

                  <fieldset className="mt-10">
                    <legend className="text-sm font-medium text-white/50">{tx.aboutYou}</legend>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">{tx.fullName}</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => handleChange('full_name', e.target.value)}
                          required
                          autoComplete="name"
                          className="h-12 rounded-lg"
                          placeholder="Jean Mukendi"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{tx.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          autoComplete="email"
                          className="h-12 rounded-lg"
                          placeholder="jean@entreprise.cd"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{tx.phone}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          autoComplete="tel"
                          className="h-12 rounded-lg"
                          placeholder="+243 800 000 000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{tx.company}</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          autoComplete="organization"
                          className="h-12 rounded-lg"
                          placeholder={tx.companyPh}
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="mt-10 border-t border-white/10 pt-10">
                    <legend className="sr-only">{tx.yourProject}</legend>
                    <p className="text-sm font-medium text-white/50" aria-hidden="true">{tx.yourProject}</p>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="interest">{tx.projectType}</Label>
                        <Select value={formData.interest} onValueChange={(v) => handleChange('interest', v)} required>
                          <SelectTrigger id="interest" className="h-12 rounded-lg">
                            <SelectValue placeholder={tx.select} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(tx.interests).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget_range">{tx.budget}</Label>
                        <Select value={formData.budget_range} onValueChange={(v) => handleChange('budget_range', v)}>
                          <SelectTrigger id="budget_range" className="h-12 rounded-lg">
                            <SelectValue placeholder={tx.select} />
                          </SelectTrigger>
                          <SelectContent>
                            {BUDGET_VALUES.map((value, i) => (
                              <SelectItem key={value} value={value}>{tx.budgets[i]}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="message">{tx.message}</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          required
                          className="min-h-[180px] rounded-lg"
                          placeholder={tx.messagePh}
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div className="mt-10 flex flex-col-reverse gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-sm text-white/50">{tx.consent}</p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 w-full shrink-0 rounded-full bg-white px-8 text-base text-black hover:bg-white/85 sm:w-auto"
                    >
                      {isSubmitting ? tx.sending : tx.submit}
                      <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4"
            >
              {tx.faqTitle}
            </motion.h2>
            <p className="text-lg text-white/60">
              {tx.faqSub}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id ?? index}
              >
                <AccordionItem value={`item-${index}`} className="bg-white/[0.04] border border-white/10 rounded-xl border-0 px-6">
                  <AccordionTrigger className="hover:no-underline py-6 text-left">
                    <span className="font-semibold text-white">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-white/60 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

    </main>
  );
}
