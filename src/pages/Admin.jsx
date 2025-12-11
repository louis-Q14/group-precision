import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { toast } from 'sonner';

import LeadsManager from '@/components/admin/LeadsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import BlogManager from '@/components/admin/BlogManager';
import TeamManager from '@/components/admin/TeamManager';
import FAQManager from '@/components/admin/FAQManager';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      
      if (!isAuth) {
        setError('not_authenticated');
        setLoading(false);
        return;
      }

      const currentUser = await base44.auth.me();
      
      if (!currentUser) {
        setError('no_user');
        setLoading(false);
        return;
      }

      if (currentUser.role !== 'admin') {
        setError('not_admin');
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      setError('auth_error');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A86C]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-[#0A0A0B] mb-4">
            Accès restreint
          </h1>

          {error === 'not_authenticated' && (
            <>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à cette page.
              </p>
              <Button 
                onClick={() => base44.auth.redirectToLogin('/Admin')}
                className="w-full bg-[#0A0A0B] hover:bg-[#0A0A0B]/90"
              >
                Se connecter
              </Button>
            </>
          )}

          {error === 'not_admin' && (
            <>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas les droits d'administrateur. Seuls les administrateurs peuvent accéder à cette section.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
              >
                Retour au site
              </Button>
            </>
          )}

          {(error === 'no_user' || error === 'auth_error') && (
            <>
              <p className="text-gray-600 mb-6">
                Une erreur s'est produite lors de la vérification de vos droits.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => base44.auth.redirectToLogin('/Admin')}
                  className="w-full bg-[#0A0A0B] hover:bg-[#0A0A0B]/90"
                >
                  Réessayer
                </Button>
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="w-full"
                >
                  Retour au site
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C9A86C]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#C9A86C]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A0A0B]">Administration</h1>
                <p className="text-sm text-gray-600">Bienvenue, {user?.full_name}</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-white p-2 rounded-xl shadow-sm flex-wrap h-auto">
            <TabsTrigger value="leads" className="rounded-lg">Leads</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg">Projets</TabsTrigger>
            <TabsTrigger value="services" className="rounded-lg">Services</TabsTrigger>
            <TabsTrigger value="testimonials" className="rounded-lg">Témoignages</TabsTrigger>
            <TabsTrigger value="blog" className="rounded-lg">Blog</TabsTrigger>
            <TabsTrigger value="team" className="rounded-lg">Équipe</TabsTrigger>
            <TabsTrigger value="faq" className="rounded-lg">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="leads"><LeadsManager /></TabsContent>
          <TabsContent value="projects"><ProjectsManager /></TabsContent>
          <TabsContent value="services"><ServicesManager /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsManager /></TabsContent>
          <TabsContent value="blog"><BlogManager /></TabsContent>
          <TabsContent value="team"><TeamManager /></TabsContent>
          <TabsContent value="faq"><FAQManager /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}