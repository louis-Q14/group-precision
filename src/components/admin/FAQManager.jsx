import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';

export default function FAQManager() {
  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faq'],
    queryFn: () => base44.entities.FAQ.list(),
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">FAQ ({faqs.length})</h2>
      <p className="text-gray-600">Gestion FAQ à venir...</p>
    </Card>
  );
}