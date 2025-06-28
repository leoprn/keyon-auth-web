'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        return;
      }

      // Actualizar estado local
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: newStatus } : msg
      ));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mensajes de Contacto</h1>
        
        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          {['all', 'new', 'read', 'replied'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'Todos' : 
               status === 'new' ? 'Nuevos' :
               status === 'read' ? 'Leídos' : 'Respondidos'}
            </button>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">Nuevos</h3>
            <p className="text-2xl font-bold text-red-600">
              {messages.filter(m => m.status === 'new').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">Leídos</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {messages.filter(m => m.status === 'read').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">Respondidos</h3>
            <p className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.status === 'replied').length}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hay mensajes para mostrar
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{message.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status === 'new' ? 'Nuevo' :
                       message.status === 'read' ? 'Leído' : 'Respondido'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    📧 {message.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    🕒 {formatDate(message.created_at)} • IP: {message.ip_address}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                {message.status === 'new' && (
                  <button
                    onClick={() => updateStatus(message.id, 'read')}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium hover:bg-yellow-200 transition-colors"
                  >
                    Marcar como leído
                  </button>
                )}
                {message.status === 'read' && (
                  <button
                    onClick={() => updateStatus(message.id, 'replied')}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    Marcar como respondido
                  </button>
                )}
                <a
                  href={`mailto:${message.email}?subject=Re: Tu consulta en KeyOn&body=Hola ${message.name},%0D%0A%0D%0AGracias por contactarnos.%0D%0A%0D%0A`}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded text-sm font-medium hover:bg-indigo-200 transition-colors"
                >
                  Responder por email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 