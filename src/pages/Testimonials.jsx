import PageHero from '@/components/brand/PageHero';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { db } from '@/api/db';
import usePublicEntity from '@/hooks/usePublicEntity';
import { useLanguage } from '@/components/LanguageContext';

export default function Testimonials() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
  });

  // Seuls les témoignages approuvés dans l'Admin sont lisibles (règle RLS de la table)
  const { items: testimonials } = usePublicEntity('Testimonial', { filter: { is_approved: true } });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await db.Testimonial.submit({
        author_name: formData.author_name.trim(),
        position: formData.position.trim() || null,
        company: formData.company.trim() || null,
        content: formData.content.trim(),
        rating: Number(formData.rating) || 5,
        is_approved: false,
      });
      toast.success(language === 'FR' ? 'Merci pour votre témoignage !' : 'Thank you for your testimonial!');
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur envoi témoignage:', error);
      toast.error(language === 'FR' ? 'Une erreur est survenue. Veuillez réessayer.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <PageHero
        title={language === 'FR' ? 'Témoignages' : 'Testimonials'}
        lede={language === 'FR'
          ? 'Ce que nos clients disent de notre travail, et de quoi partager votre propre expérience.'
          : 'What our clients say about our work, and a form to share your own experience.'}
      />

      {/* Testimonials Grid */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-white mb-12 text-center">
              {language === 'FR' ? 'Témoignages de nos clients' : 'Client Testimonials'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-6  border border-white/10"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gold/30 mb-3" />
                  <p className="text-white/75 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-white">
                      {testimonial.author_name}
                    </div>
                    {(testimonial.position || testimonial.company) && (
                      <div className="text-sm text-white/50">
                        {testimonial.position}{testimonial.position && testimonial.company && ', '}{testimonial.company}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Submit Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          {submitted ? (
            <motion.div
              className="bg-white/[0.03] rounded-3xl p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">
                {language === 'FR' ? 'Merci pour votre témoignage !' : 'Thank you for your testimonial!'}
              </h3>
              <p className="text-white/60 mb-8">
                {language === 'FR' 
                  ? 'Votre avis sera publié après validation par notre équipe.'
                  : 'Your review will be published after validation by our team.'}
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    author_name: '', position: '', company: '', content: '', rating: 5,
                  });
                }}
                variant="outline"
                className="rounded-full"
              >
                {language === 'FR' ? 'Soumettre un autre témoignage' : 'Submit another testimonial'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-4">
                  {language === 'FR' ? 'Partagez votre expérience' : 'Share your experience'}
                </h2>
                <p className="text-white/60">
                  {language === 'FR' 
                    ? 'Votre avis compte pour nous et aide d\'autres clients à nous découvrir.'
                    : 'Your feedback matters to us and helps other clients discover us.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white/[0.03] rounded-3xl p-8 lg:p-10">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="author_name">{language === 'FR' ? 'Votre nom' : 'Your name'} *</Label>
                      <Input
                        id="author_name"
                        value={formData.author_name}
                        onChange={(e) => handleChange('author_name', e.target.value)}
                        required
                        className="h-12 rounded-xl"
                        placeholder={language === 'FR' ? 'Jean Dupont' : 'John Doe'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{language === 'FR' ? 'Entreprise' : 'Company'}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="h-12 rounded-xl"
                        placeholder={language === 'FR' ? 'Nom de votre entreprise' : 'Your company name'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">{language === 'FR' ? 'Poste' : 'Position'}</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleChange('position', e.target.value)}
                      className="h-12 rounded-xl"
                      placeholder={language === 'FR' ? 'Directeur, Manager, etc.' : 'Director, Manager, etc.'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'FR' ? 'Note' : 'Rating'}</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange('rating', star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= formData.rating
                                ? 'fill-gold-400 text-gold'
                                : 'text-white/30'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">{language === 'FR' ? 'Votre témoignage' : 'Your testimonial'} *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleChange('content', e.target.value)}
                      required
                      className="min-h-[150px] rounded-xl"
                      placeholder={language === 'FR' ? 'Partagez votre expérience avec nous...' : 'Share your experience with us...'}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-xl bg-white text-black hover:bg-white/85 text-lg"
                  >
                    {isSubmitting 
                      ? (language === 'FR' ? 'Envoi en cours...' : 'Sending...') 
                      : (language === 'FR' ? 'Soumettre mon témoignage' : 'Submit my testimonial')}
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
