import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Reveal } from '@/components/brand/Reveal';

const COPY = {
  FR: {
    title: 'Un projet à lancer ? Écrivez-nous.',
    text: 'Décrivez votre besoin en quelques lignes : nous revenons vers vous pour en parler.',
    cta: 'Écrire un message',
    address: 'Adresse',
    hours: 'Horaires',
    hoursValue: 'Du lundi au vendredi, 9 h – 18 h',
  },
  EN: {
    title: 'A project to launch? Write to us.',
    text: 'Describe what you need in a few lines and we will get back to you to discuss it.',
    cta: 'Write a message',
    address: 'Address',
    hours: 'Opening hours',
    hoursValue: 'Monday to Friday, 9 am – 6 pm',
  },
};

export default function CTASection() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.FR;

  return (
    <section className="bg-black text-white py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-3xl glass px-6 py-16 lg:px-16 lg:py-20 text-center">
          <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden="true" />
          <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-24 h-[360px] w-[700px] max-w-[160%] glow" aria-hidden="true" />
          <h2 className="text-display font-semibold text-gradient">{copy.title}</h2>
          <p className="mt-5 mx-auto max-w-xl text-lede text-white/60">{copy.text}</p>
          <Link
            to={createPageUrl('Contact')}
            className="group mt-9 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-black font-medium shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-shadow"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <dl className="mt-14 pt-10 border-t border-white/10 grid sm:grid-cols-3 gap-8 text-sm">
            <div>
              <dt className="text-white/45">{copy.address}</dt>
              <dd className="mt-1 text-white/85">100, av. Colonel Ebeya et TSF<br />Gombe, Kinshasa, RD Congo</dd>
            </div>
            <div>
              <dt className="text-white/45">Email</dt>
              <dd className="mt-1">
                <a href="mailto:contact@precisions.group" className="text-white/85 underline underline-offset-4 hover:text-white">contact@precisions.group</a>
              </dd>
            </div>
            <div>
              <dt className="text-white/45">{copy.hours}</dt>
              <dd className="mt-1 text-white/85">{copy.hoursValue}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
