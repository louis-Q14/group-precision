import EntityManager, { labelOf } from '@/components/admin/EntityManager';

const CATEGORIES = [
  { value: 'general', label: 'Général' },
  { value: 'services', label: 'Services' },
  { value: 'pricing', label: 'Tarifs' },
  { value: 'process', label: 'Méthode' },
  { value: 'technical', label: 'Technique' },
];

const FIELDS = [
  { name: 'question', label: 'Question', type: 'text', required: true },
  { name: 'answer', label: 'Réponse', type: 'textarea', rows: 5, required: true },
  { name: 'category', label: 'Catégorie', type: 'select', options: CATEGORIES, half: true },
  { name: 'display_order', label: "Ordre d'affichage", type: 'number', half: true },
];

const renderItem = (faq) => ({
  title: faq.question,
  description: faq.answer,
  badges: [
    faq.category && labelOf(CATEGORIES, faq.category),
    typeof faq.display_order === 'number' ? `Ordre ${faq.display_order}` : null,
  ],
});

export default function FAQManager() {
  return (
    <EntityManager
      entity="FAQ"
      title="FAQ"
      singular="question"
      feminine
      fields={FIELDS}
      sortByOrder
      renderItem={renderItem}
    />
  );
}
