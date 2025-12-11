import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, Building, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadsManager() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.Lead.list('-created_date'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      toast.success('Lead mis à jour');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Lead.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      toast.success('Lead supprimé');
    },
  });

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(l => l.status === filterStatus);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    proposal: 'bg-orange-100 text-orange-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Leads ({filteredLeads.length})</h2>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="new">Nouveau</SelectItem>
            <SelectItem value="contacted">Contacté</SelectItem>
            <SelectItem value="qualified">Qualifié</SelectItem>
            <SelectItem value="proposal">Proposition</SelectItem>
            <SelectItem value="won">Gagné</SelectItem>
            <SelectItem value="lost">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{lead.full_name}</h3>
                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {lead.email}
                  </span>
                  {lead.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {lead.phone}
                    </span>
                  )}
                  {lead.company && (
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {lead.company}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMutation.mutate(lead.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <p className="text-gray-600 mb-3">{lead.message}</p>

            <div className="flex items-center gap-3">
              <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
              {lead.interest && <Badge variant="outline">{lead.interest}</Badge>}
              {lead.budget_range && <Badge variant="outline">{lead.budget_range}</Badge>}
              <Select
                value={lead.status}
                onValueChange={(status) => 
                  updateMutation.mutate({ id: lead.id, data: { status } })
                }
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="qualified">Qualifié</SelectItem>
                  <SelectItem value="proposal">Proposition</SelectItem>
                  <SelectItem value="won">Gagné</SelectItem>
                  <SelectItem value="lost">Perdu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}