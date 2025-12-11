import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';

export default function BlogManager() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: () => base44.entities.BlogPost.list(),
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Articles de blog ({posts.length})</h2>
      <p className="text-gray-600">Gestion du blog à venir...</p>
    </Card>
  );
}