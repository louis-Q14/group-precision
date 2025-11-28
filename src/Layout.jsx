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
        }
        
        ::selection {
          background: rgba(201, 168, 108, 0.3);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
      
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
    </LanguageProvider>
  );
}