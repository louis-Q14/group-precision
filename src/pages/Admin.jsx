import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, LogOut, LogIn, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

import LeadsManager from '@/components/admin/LeadsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ServicesManager from '@/components/admin/ServicesManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import BlogManager from '@/components/admin/BlogManager';
import TeamManager from '@/components/admin/TeamManager';
import FAQManager from '@/components/admin/FAQManager';

function CenteredCard({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-6 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">{children}</div>
    </div>
  );
}

/** Télécharge la présentation Word générée par l'Edge Function generate-presentation-doc. */
function DownloadPresentationButton() {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // fetch direct (et non functions.invoke) pour récupérer le fichier binaire intact
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-presentation-doc`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url;
      link.download = 'PRECISION_Group_Presentation.docx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Téléchargement de la présentation impossible :', error);
      toast.error('Impossible de générer la présentation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" className="gap-2" disabled={isLoading}>
      <FileDown className="w-4 h-4" />
      {isLoading ? 'Génération…' : 'Présentation (.docx)'}
    </Button>
  );
}

function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      // Message volontairement générique : on ne révèle pas si l'email existe
      console.error('Connexion échouée :', err);
      setError('Email ou mot de passe incorrect.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CenteredCard>
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-xl bg-gold-400/10 flex items-center justify-center mb-4">
          <Shield className="w-7 h-7 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-ink">Administration</h1>
        <p className="text-sm text-gray-600 mt-1">Connectez-vous avec votre compte administrateur.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="admin-password">Mot de passe</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          <LogIn className="w-4 h-4" />
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </Button>
      </form>
    </CenteredCard>
  );
}

export default function Admin() {
  const { isConfigured, isLoading, isAuthenticated, isAdmin, user, signOut } = useAuth();

  if (!isConfigured) {
    return (
      <CenteredCard>
        <h1 className="text-2xl font-bold text-ink mb-4 text-center">Administration indisponible</h1>
        <p className="text-gray-600 text-center">
          La connexion à la base de données n'est pas configurée. Renseignez VITE_SUPABASE_URL et
          VITE_SUPABASE_ANON_KEY (voir le README), puis reconstruisez le site.
        </p>
      </CenteredCard>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400" />
      </div>
    );
  }

  if (!isAuthenticated) return <LoginForm />;

  if (!isAdmin) {
    return (
      <CenteredCard>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-ink mb-4">Accès restreint</h1>
          <p className="text-gray-600 mb-6">
            Le compte {user?.email} n'a pas les droits d'administrateur.
          </p>
          <Button onClick={signOut} variant="outline" className="w-full">Se déconnecter</Button>
        </div>
      </CenteredCard>
    );
  }

  return (
    <div className="min-h-screen bg-mist py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-ink">Administration</h1>
                <p className="text-sm text-gray-600 truncate">Connecté : {user?.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-end shrink-0">
              <DownloadPresentationButton />
              <Button onClick={signOut} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
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
