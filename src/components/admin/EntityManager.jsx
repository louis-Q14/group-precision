import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/api/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';

/**
 * Gestionnaire CRUD générique pour une table Supabase (voir src/api/db.js).
 *
 * Types de champs (`fields[].type`) :
 *   text | url | email | textarea | number | select | boolean | list
 * Un champ `list` est saisi une valeur par ligne et enregistré comme tableau.
 *
 * Props :
 *   entity        Nom de l'entité dans src/api/db.js (ex. 'BlogPost')
 *   title         Titre de la section (ex. 'Articles de blog')
 *   singular      Nom d'un élément, pour les messages (ex. 'article')
 *   feminine      true si `singular` est féminin (accords des messages)
 *   fields        Configuration des champs du formulaire
 *   sortByOrder   Trie par le champ `display_order` (croissant) plutôt que par date
 *   beforeSave    (data) => data : complète les données avant l'enregistrement
 *   renderItem    (item) => { title, subtitle, description, badges[] }
 *   toggles       [{ field, label }] : interrupteurs rapides affichés sur chaque carte
 *   grid          Affiche les cartes sur deux colonnes
 */
export default function EntityManager({
  entity,
  title,
  singular,
  feminine = false,
  fields,
  sortByOrder = false,
  beforeSave,
  renderItem,
  toggles = [],
  grid = false,
}) {
  const queryClient = useQueryClient();
  const queryKey = ['admin', entity];
  const api = db[entity];
  const e = feminine ? 'e' : '';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const { data: items = [], isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: () => api.list('-created_at'),
    select: (rows) => (sortByOrder ? [...rows].sort(compareByOrder) : rows),
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  // Rafraîchit la liste de l'Admin et les pages publiques qui lisent cette entité
  const refreshQueries = () => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: ['public', entity] });
  };

  const onError = (verb) => (error) => {
    console.error(`Erreur (${verb}) ${entity}:`, error);
    toast.error(`Impossible ${verb} : ${singular}`);
  };

  const createMutation = useMutation({
    mutationFn: (data) => api.create(data),
    onSuccess: () => {
      refreshQueries();
      toast.success(`${capitalize(singular)} créé${e}`);
      closeDialog();
    },
    onError: onError('de créer'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.update(id, data),
    onSuccess: (_result, variables) => {
      refreshQueries();
      toast.success(`${capitalize(singular)} mis${feminine ? 'e' : ''} à jour`);
      if (!variables.quick) closeDialog();
    },
    onError: onError('de mettre à jour'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(id),
    onSuccess: () => {
      refreshQueries();
      toast.success(`${capitalize(singular)} supprimé${e}`);
    },
    onError: onError('de supprimer'),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const openDialog = (item = null) => {
    setEditingItem(item);
    setFormData(item ? toFormValues(item, fields) : defaultValues(fields));
    setDialogOpen(true);
  };

  const setField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSaving) return;
    let data = toEntityData(formData, fields, Boolean(editingItem));
    if (beforeSave) data = beforeSave(data, editingItem);
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (isError) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600 mb-4">Impossible de charger les données.</p>
        <Button variant="outline" onClick={() => refetch()}>Réessayer</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">{title} ({items.length})</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => (open ? setDialogOpen(true) : closeDialog())}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Modifier' : 'Ajouter'} : {singular}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                  <FieldInput field={field} value={formData[field.name]} onChange={(v) => setField(field.name, v)} />
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? 'Enregistrement...' : editingItem ? 'Mettre à jour' : 'Créer'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Aucun élément pour l'instant.</p>
      ) : (
        <div className={grid ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
          {items.map((item) => {
            const view = renderItem(item);
            return (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold break-words">{view.title}</h3>
                    {view.subtitle && <p className="text-sm text-gray-600">{view.subtitle}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" aria-label="Modifier" onClick={() => openDialog(item)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <ConfirmDeleteButton
                      itemLabel={view.title}
                      disabled={deleteMutation.isPending}
                      onConfirm={() => deleteMutation.mutate(item.id)}
                    />
                  </div>
                </div>
                {view.description && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{view.description}</p>}
                {(view.badges?.length > 0 || toggles.length > 0) && (
                  <div className="flex flex-wrap items-center gap-3">
                    {view.badges?.filter(Boolean).map((badge, index) => (
                      <Badge key={`${index}-${badge}`} variant="outline">{badge}</Badge>
                    ))}
                    {toggles.map((toggle) => (
                      <label key={toggle.field} className="flex items-center gap-2 text-sm text-gray-600">
                        <Switch
                          checked={Boolean(item[toggle.field])}
                          disabled={updateMutation.isPending}
                          onCheckedChange={(checked) =>
                            updateMutation.mutate({ id: item.id, data: { [toggle.field]: checked }, quick: true })
                          }
                        />
                        {toggle.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function FieldInput({ field, value, onChange }) {
  const id = `field-${field.name}`;
  const label = (
    <Label htmlFor={id}>
      {field.label}{field.required && ' *'}
    </Label>
  );

  switch (field.type) {
    case 'textarea':
    case 'list':
      return (
        <>
          {label}
          <Textarea
            id={id}
            required={field.required}
            rows={field.rows ?? (field.type === 'list' ? 4 : 3)}
            value={value ?? ''}
            placeholder={field.placeholder ?? (field.type === 'list' ? 'Une valeur par ligne' : undefined)}
            onChange={(ev) => onChange(ev.target.value)}
          />
          {field.help && <p className="text-xs text-gray-500 mt-1">{field.help}</p>}
        </>
      );
    case 'select':
      return (
        <>
          {label}
          <Select value={value ?? ''} onValueChange={onChange}>
            <SelectTrigger id={id}><SelectValue placeholder="Choisir…" /></SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    case 'boolean':
      return (
        <div className="flex items-center gap-3 pt-6">
          <Switch id={id} checked={Boolean(value)} onCheckedChange={onChange} />
          {label}
        </div>
      );
    default:
      return (
        <>
          {label}
          <Input
            id={id}
            type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
            required={field.required}
            min={field.min}
            step={field.type === 'number' ? 'any' : undefined}
            value={value ?? ''}
            placeholder={field.placeholder}
            onChange={(ev) => onChange(ev.target.value)}
          />
          {field.help && <p className="text-xs text-gray-500 mt-1">{field.help}</p>}
        </>
      );
  }
}

// ---------- Conversion formulaire <-> entité ----------

function defaultValues(fields) {
  return Object.fromEntries(
    fields.filter((f) => f.type === 'boolean').map((f) => [f.name, f.default ?? false])
  );
}

function toFormValues(item, fields) {
  return Object.fromEntries(
    fields.map((f) => {
      const raw = item[f.name];
      if (f.type === 'list') return [f.name, Array.isArray(raw) ? raw.join('\n') : ''];
      if (f.type === 'number') return [f.name, raw ?? ''];
      if (f.type === 'boolean') return [f.name, Boolean(raw)];
      return [f.name, raw ?? ''];
    })
  );
}

/**
 * Ne garde que les champs du formulaire (jamais id, created_at…).
 * En création, les champs vides sont omis. En modification, un texte vide est envoyé
 * pour permettre d'effacer la valeur ; un nombre ou une liste de choix vide est omis
 * (une chaîne vide ne respecterait pas le type ou l'enum de l'entité).
 */
function toEntityData(formData, fields, isUpdate) {
  const data = {};
  for (const f of fields) {
    const value = formData[f.name];
    switch (f.type) {
      case 'boolean':
        data[f.name] = Boolean(value);
        break;
      case 'list':
        data[f.name] = String(value ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
        break;
      case 'number':
        if (value !== '' && value !== undefined && value !== null && !Number.isNaN(Number(value))) {
          data[f.name] = Number(value);
        }
        break;
      case 'select':
        if (value) data[f.name] = value;
        break;
      default: {
        const text = typeof value === 'string' ? value.trim() : '';
        if (text || isUpdate) data[f.name] = text;
      }
    }
  }
  return data;
}

function compareByOrder(a, b) {
  const ao = typeof a.display_order === 'number' ? a.display_order : Infinity;
  const bo = typeof b.display_order === 'number' ? b.display_order : Infinity;
  return ao - bo;
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

export function labelOf(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}
