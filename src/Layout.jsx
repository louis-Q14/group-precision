import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/components/LanguageContext';

export default function Layout({ children }) {
  return (
    <LanguageProvider>
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --color-primary: #0A0A0B;
          --color-secondary: #C9A86C;
          --color-background: #FAFAFA;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        ::selection {
          background: rgba(201, 168, 108, 0.35);
        }

        /* ===== DARK THEME OVERRIDES ===== */
        .dark body {
          background-color: #0F1117;
          color: #E8DDD0;
        }

        /* Sections blanches → sombre */
        .dark .bg-white { background-color: #161B27 !important; }
        .dark .bg-\\[\\#FAFAFA\\] { background-color: #0F1117 !important; }
        .dark .bg-\\[\\#0A0A0B\\] { background-color: #0D1117 !important; }

        /* Textes */
        .dark .text-\\[\\#0A0A0B\\] { color: #E8DDD0 !important; }
        .dark .text-gray-600 { color: #9CA3AF !important; }
        .dark .text-gray-500 { color: #8B95A8 !important; }
        .dark .text-gray-800 { color: #D1C9BE !important; }

        /* Cartes et surfaces */
        .dark .border-gray-100 { border-color: #2A3142 !important; }
        .dark .border-gray-200 { border-color: #2A3142 !important; }
        .dark .bg-gray-100 { background-color: #1E2533 !important; }
        .dark .bg-gray-50 { background-color: #161B27 !important; }
        .dark .bg-\\[\\#FAFAFA\\] { background-color: #0F1117 !important; }

        /* Inputs */
        .dark input, .dark textarea, .dark select {
          background-color: #1E2533 !important;
          border-color: #2A3142 !important;
          color: #E8DDD0 !important;
        }
        .dark input::placeholder, .dark textarea::placeholder {
          color: #6B7280 !important;
        }

        /* Mobile menu */
        .dark .bg-white.shadow-2xl { background-color: #161B27 !important; }
        .dark .text-gray-800 { color: #D1C9BE !important; }
        .dark .hover\\:bg-gray-50:hover { background-color: #1E2533 !important; }

        /* Header scrolled */
        .dark .bg-white\\/95 { background-color: rgba(22, 27, 39, 0.97) !important; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        .dark ::-webkit-scrollbar-track { background: #161B27; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        .dark ::-webkit-scrollbar-thumb { background: #C9A86C66; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }
        .dark ::-webkit-scrollbar-thumb:hover { background: #C9A86C; }
      `}</style>
      
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
    </LanguageProvider>
  );
}