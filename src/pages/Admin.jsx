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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      if (!currentUser || currentUser.role !== 'admin') {
        toast.error('Accès refusé - Admins uniquement');
        window.location.href = '/';
        return;
      }
      setUser(currentUser);
    } catch (error) {
      toast.error('Non authentifié');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A86C]" />
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