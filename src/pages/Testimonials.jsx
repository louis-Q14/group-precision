import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Send, CheckCircle, Quote } from 'lucide-react';
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
            <span className="text-sm text-white">{language === 'FR' ? 'Témoignages' : 'Testimonials'}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {language === 'FR' ? 'Ce que disent nos clients' : 'What our clients say'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {language === 'FR' 
              ? 'Découvrez les retours de nos clients et partagez votre expérience avec nous.'
              : 'Discover our clients\' feedback and share your experience with us.'}
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0A0A0B] mb-12 text-center">
              {language === 'FR' ? 'Témoignages de nos clients' : 'Client Testimonials'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A86C] text-[#C9A86C]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#C9A86C]/30 mb-3" />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-[#0A0A0B]">
                      {testimonial.author_name}
                    </div>
                    {(testimonial.position || testimonial.company) && (
                      <div className="text-sm text-gray-500">
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
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
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
                {language === 'FR' ? 'Merci pour votre témoignage !' : 'Thank you for your testimonial!'}
              </h3>
              <p className="text-gray-600 mb-8">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#0A0A0B] mb-4">
                  {language === 'FR' ? 'Partagez votre expérience' : 'Share your experience'}
                </h2>
                <p className="text-gray-600">
                  {language === 'FR' 
                    ? 'Votre avis compte pour nous et aide d\'autres clients à nous découvrir.'
                    : 'Your feedback matters to us and helps other clients discover us.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-[#FAFAFA] rounded-3xl p-8 lg:p-10">
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
                                ? 'fill-[#C9A86C] text-[#C9A86C]'
                                : 'text-gray-300'
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
                    className="w-full h-14 rounded-xl bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white text-lg"
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