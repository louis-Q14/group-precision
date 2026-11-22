import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/api/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2 } from 'lucide-react';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { toast } from 'sonner';

const EDITABLE_FIELDS = ['title', 'client', 'description', 'image_url', 'category', 'industry'];

export default function ProjectsManager() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({});

  const { data: projects = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: () => db.Project.list('-created_at'),
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProject(null);
    setFormData({});
  };

  const createMutation = useMutation({
    mutationFn: (data) => db.Project.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projet créé');
      closeDialog();
    },
    onError: (error) => {
      console.error('Erreur création projet:', error);
      toast.error('Impossible de créer le projet');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => db.Project.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projet mis à jour');
      closeDialog();
    },
    onError: (error) => {
      console.error('Erreur mise à jour projet:', error);
      toast.error('Impossible de mettre à jour le projet');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => db.Project.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projet supprimé');
    },
    onError: (error) => {
      console.error('Erreur suppression projet:', error);
      toast.error('Impossible de supprimer le projet');
    },
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSaving) return;
    // On n'envoie que les champs du formulaire : pas les champs système (id, created_at…)
    // ni les champs non modifiables ici (gallery, metrics…), qui restent intacts lors d'un update
    const data = Object.fromEntries(
      EDITABLE_FIELDS
        .filter((field) => field in formData)
        .map((field) => [field, formData[field]])
    );
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openDialog = (project = null) => {
    setEditingProject(project);
    setFormData(project ? { ...project } : {});
    setDialogOpen(true);
  };

  if (isLoading) return <div>Chargement...</div>;
  if (isError) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600 mb-4">Impossible de charger les projets.</p>
        <Button variant="outline" onClick={() => refetch()}>Réessayer</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Projets ({projects.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => (open ? setDialogOpen(true) : closeDialog())}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Modifier' : 'Créer'} un projet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Titre *</Label>
                <Input
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Client *</Label>
                <Input
                  required
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Catégorie</Label>
                  <Select
                    value={formData.category || ''}
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Secteur</Label>
                  <Select
                    value={formData.industry || ''}
                    onValueChange={(v) => setFormData({ ...formData, industry: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Santé</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? 'Enregistrement...' : editingProject ? 'Mettre à jour' : 'Créer'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.client}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openDialog(project)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <ConfirmDeleteButton
                  itemLabel={project.title}
                  disabled={deleteMutation.isPending}
                  onConfirm={() => deleteMutation.mutate(project.id)}
                />
              </div>
            </div>
            {project.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}