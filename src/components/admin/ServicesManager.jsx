import React from 'react';
import EntityManager, { labelOf } from '@/components/admin/EntityManager';

const CATEGORIES = [
  { value: 'consulting', label: 'Conseil & Stratégie' },
  { value: 'development', label: 'Développement' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'formation', label: 'Formation' },
];

const FIELDS = [
  { name: 'title', label: 'Nom du service', type: 'text', required: true },
  { name: 'category', label: 'Catégorie', type: 'select', options: CATEGORIES, half: true },
  { name: 'icon', label: 'Icône Lucide', type: 'text', half: true, placeholder: 'ex. Code, Megaphone', help: 'Nom d’une icône de lucide.dev/icons.' },
  { name: 'price_range', label: 'Fourchette de prix', type: 'text', half: true, placeholder: 'ex. À partir de 5 000 €' },
  { name: 'display_order', label: "Ordre d'affichage", type: 'number', half: true },
  { name: 'short_description', label: 'Description courte', type: 'textarea', rows: 2, required: true },
  { name: 'full_description', label: 'Description détaillée', type: 'textarea', rows: 6 },
  { name: 'features', label: 'Caractéristiques', type: 'list', rows: 5 },
  { name: 'is_featured', label: 'Mis en avant', type: 'boolean' },
];

const renderItem = (service) => ({
  title: service.title,
  subtitle: [service.category && labelOf(CATEGORIES, service.category), service.price_range].filter(Boolean).join(' · '),
  description: service.short_description,
  badges: [typeof service.display_order === 'number' ? `Ordre ${service.display_order}` : null],
});

export default function ServicesManager() {
  return (
    <EntityManager
      entity="Service"
      title="Services"
      singular="service"
      fields={FIELDS}
      sortByOrder
      renderItem={renderItem}
      toggles={[{ field: 'is_featured', label: 'Mis en avant' }]}
      grid
    />
  );
}
