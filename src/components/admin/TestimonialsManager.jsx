import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/api/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Star } from 'lucide-react';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { toast } from 'sonner';

export default function TestimonialsManager() {
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => db.Testimonial.list('-created_at'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => db.Testimonial.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Témoignage mis à jour');
    },
    onError: (error) => {
      console.error('Erreur mise à jour témoignage:', error);
      toast.error('Impossible de mettre à jour le témoignage');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => db.Testimonial.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Témoignage supprimé');
    },
    onError: (error) => {
      console.error('Erreur suppression témoignage:', error);
      toast.error('Impossible de supprimer le témoignage');
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600 mb-4">Impossible de charger les témoignages.</p>
        <Button variant="outline" onClick={() => refetch()}>Réessayer</Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Témoignages ({testimonials.length})</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{testimonial.author_name}</h3>
                <p className="text-sm text-gray-600">
                  {testimonial.position} {testimonial.company && `- ${testimonial.company}`}
                </p>
              </div>
              <div className="flex gap-2">
                {!testimonial.is_approved && (
                  <Button
                    size="sm"
                    onClick={() => 
                      updateMutation.mutate({ 
                        id: testimonial.id, 
                        data: { is_approved: true } 
                      })
                    }
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approuver et publier
                  </Button>
                )}
                {testimonial.is_approved && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => 
                      updateMutation.mutate({ 
                        id: testimonial.id, 
                        data: { is_approved: false } 
                      })
                    }
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Retirer
                  </Button>
                )}
                <ConfirmDeleteButton
                  itemLabel={testimonial.author_name}
                  disabled={deleteMutation.isPending}
                  onConfirm={() => deleteMutation.mutate(testimonial.id)}
                />
              </div>
            </div>
            <p className="text-gray-700 mb-2">{testimonial.content}</p>
            <div className="flex gap-2 items-center">
              <Badge variant={testimonial.is_approved ? 'default' : 'secondary'}>
                {testimonial.is_approved ? 'Approuvé' : 'En attente'}
              </Badge>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}