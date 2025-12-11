import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';

export default function ServicesManager() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.Service.list(),
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Services ({services.length})</h2>
      <p className="text-gray-600">Gestion des services à venir...</p>
    </Card>
  );
}