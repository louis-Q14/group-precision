import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Mail, Phone, MapPin, Clock,
  Linkedin, Twitter, Instagram, Send, Calendar, MessageCircle,
  ChevronDown, CheckCircle
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

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@precisions.group',
    link: 'mailto:contact@precisions.group',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+243 800 000 000',
    link: 'tel:+243800000000',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: '100, Av. Colonel Ebeya et TSF, C/ Gombe, Kinshasa, R.D. Congo',
    link: '#',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun - Ven : 9h - 18h',
    link: null,
  },
];

// Questions affichées tant qu'aucune FAQ n'est saisie dans l'Admin (onglet FAQ)
const FALLBACK_FAQS = [
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

// Message montré au visiteur : celui de la fonction d'envoi (ex. « Adresse email invalide »)
// ou de la configuration ; les erreurs techniques de la base restent génériques.
const GENERIC_ERROR = 'Une erreur est survenue. Veuillez réessayer.';
const getErrorMessage = (error) =>
  (error instanceof FunctionError || error instanceof SupabaseNotConfiguredError) && error.message
    ? error.message
    : GENERIC_ERROR;

export default function Contact() {
  const { items: faqs } = usePublicEntity('FAQ', { sortByOrder: true, fallback: FALLBACK_FAQS });
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

      toast.success('Message envoyé avec succès !');
      leadSavedRef.current = false;
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-white">Contact</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Parlons de votre projet
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Nous sommes là pour vous accompagner. Contactez-nous pour une consultation gratuite.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0A0A0B] mb-8">
                Nos coordonnées
              </h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C9A86C]/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-[#C9A86C]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{info.title}</div>
                      {info.link ? (
                        <a href={info.link} className="font-medium text-[#0A0A0B] hover:text-[#C9A86C] transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-medium text-[#0A0A0B]">{info.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-[#0A0A0B] mb-4">Suivez-nous</h3>
                <div className="flex gap-3">
                  {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A0A0B] hover:text-white transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 p-6 bg-[#FAFAFA] rounded-2xl">
                <h3 className="font-semibold text-[#0A0A0B] mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-xl">
                    <Calendar className="w-5 h-5 text-[#C9A86C]" />
                    Réserver un appel découverte
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-[#C9A86C]" />
                    Démarrer un chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FAFAFA] rounded-3xl p-12 text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0B] mb-4">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Merci pour votre message. Notre équipe vous contactera dans les 24h.
                  </p>
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
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-[#FAFAFA] rounded-3xl p-8 lg:p-12"
                >
                  <h2 className="text-2xl font-bold text-[#0A0A0B] mb-8">
                    Envoyez-nous un message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nom complet *</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                        required
                        className="h-12 rounded-xl"
                        placeholder="Jean Mukendi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="h-12 rounded-xl"
                        placeholder="jean@entreprise.cd"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="h-12 rounded-xl"
                        placeholder="+243 800 000 000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="h-12 rounded-xl"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type de projet *</Label>
                      <Select value={formData.interest} onValueChange={(v) => handleChange('interest', v)} required>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">Conseil & Stratégie</SelectItem>
                          <SelectItem value="development">Développement</SelectItem>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="formation">Formation</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget estimé</Label>
                      <Select value={formData.budget_range} onValueChange={(v) => handleChange('budget_range', v)}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="< 5k">Moins de 5 000€</SelectItem>
                          <SelectItem value="5k-15k">5 000€ - 15 000€</SelectItem>
                          <SelectItem value="15k-50k">15 000€ - 50 000€</SelectItem>
                          <SelectItem value="50k-100k">50 000€ - 100 000€</SelectItem>
                          <SelectItem value="> 100k">Plus de 100 000€</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="message">Votre message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className="min-h-[150px] rounded-xl"
                      placeholder="Décrivez votre projet, vos objectifs et vos contraintes..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white text-lg"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4"
            >
              Questions fréquentes
            </motion.h2>
            <p className="text-lg text-gray-600">
              Retrouvez les réponses aux questions les plus courantes.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-white rounded-xl border-0 px-6">
                  <AccordionTrigger className="hover:no-underline py-6 text-left">
                    <span className="font-semibold text-[#0A0A0B]">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600 whitespace-pre-line">
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