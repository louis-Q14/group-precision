import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function TestimonialsManager() {
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list('-created_date'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Testimonial.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
      toast.success('Témoignage mis à jour');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Testimonial.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['testimonials']);
      toast.success('Témoignage supprimé');
    },
  });

  if (isLoading) return <div>Chargement...</div>;

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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMutation.mutate(testimonial.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
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