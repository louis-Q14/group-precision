import EntityManager from '@/components/admin/EntityManager';

const FIELDS = [
  { name: 'name', label: 'Nom complet', type: 'text', required: true, half: true },
  { name: 'position', label: 'Poste', type: 'text', required: true, half: true },
  { name: 'email', label: 'Email', type: 'email', half: true },
  { name: 'display_order', label: "Ordre d'affichage", type: 'number', half: true },
  { name: 'photo_url', label: 'Photo (URL)', type: 'url' },
  { name: 'linkedin', label: 'LinkedIn (URL)', type: 'url', half: true },
  { name: 'twitter', label: 'Twitter / X (URL)', type: 'url', half: true },
  { name: 'bio', label: 'Biographie courte', type: 'textarea', rows: 4 },
  { name: 'expertise', label: "Domaines d'expertise", type: 'list', rows: 4 },
  { name: 'is_leadership', label: 'Membre de la direction', type: 'boolean' },
];

const renderItem = (member) => ({
  title: member.name,
  subtitle: member.position,
  description: member.bio,
  badges: member.expertise ?? [],
});

export default function TeamManager() {
  return (
    <EntityManager
      entity="TeamMember"
      title="Équipe"
      singular="membre"
      fields={FIELDS}
      sortByOrder
      renderItem={renderItem}
      toggles={[{ field: 'is_leadership', label: 'Direction' }]}
      grid
    />
  );
}
