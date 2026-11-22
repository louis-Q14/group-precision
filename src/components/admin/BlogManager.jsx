import React from 'react';
import EntityManager, { labelOf } from '@/components/admin/EntityManager';

const CATEGORIES = [
  { value: 'insights', label: 'Analyses' },
  { value: 'tutorials', label: 'Tutoriels' },
  { value: 'news', label: 'Actualités' },
  { value: 'case-study', label: 'Étude de cas' },
];

const FIELDS = [
  { name: 'title', label: 'Titre', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', half: true, help: 'Laissé vide, il est généré à partir du titre.' },
  { name: 'category', label: 'Catégorie', type: 'select', options: CATEGORIES, half: true },
  { name: 'author', label: 'Auteur', type: 'text', half: true },
  { name: 'reading_time', label: 'Temps de lecture (min)', type: 'number', min: 1, half: true, help: 'Laissé vide, il est estimé à partir du contenu.' },
  { name: 'cover_image', label: "Image de couverture (URL)", type: 'url' },
  { name: 'excerpt', label: 'Extrait', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Contenu (Markdown)', type: 'textarea', rows: 12, required: true },
  { name: 'tags', label: 'Tags', type: 'list', rows: 3 },
  { name: 'is_published', label: 'Publié', type: 'boolean', half: true },
  { name: 'is_featured', label: 'À la une', type: 'boolean', half: true },
];

// « Mon Article Été 2026 ! » -> « mon-article-ete-2026 »
const slugify = (text) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Environ 200 mots par minute
const estimateReadingTime = (content) =>
  Math.max(1, Math.ceil(String(content ?? '').trim().split(/\s+/).filter(Boolean).length / 200));

const beforeSave = (data) => ({
  ...data,
  slug: slugify(data.slug || data.title),
  reading_time: data.reading_time ?? estimateReadingTime(data.content),
});

const renderItem = (post) => ({
  title: post.title,
  subtitle: [post.author, post.reading_time && `${post.reading_time} min`].filter(Boolean).join(' · '),
  description: post.excerpt,
  badges: [post.category && labelOf(CATEGORIES, post.category), ...(post.tags ?? [])],
});

export default function BlogManager() {
  return (
    <EntityManager
      entity="BlogPost"
      title="Articles de blog"
      singular="article"
      fields={FIELDS}
      beforeSave={beforeSave}
      renderItem={renderItem}
      toggles={[
        { field: 'is_published', label: 'Publié' },
        { field: 'is_featured', label: 'À la une' },
      ]}
    />
  );
}
