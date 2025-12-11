import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';

export default function TeamManager() {
  const { data: team = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Équipe ({team.length})</h2>
      <p className="text-gray-600">Gestion de l'équipe à venir...</p>
    </Card>
  );
}