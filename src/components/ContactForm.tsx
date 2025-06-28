'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación del lado del cliente
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Todos los campos son requeridos'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Enviando mensaje...'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: result.message
        });
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Error de conexión. Inténtalo de nuevo.'
      });
    }
  };

  return (
    <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-50">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Solicita información</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresá tu nombre completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base shadow-sm"
            disabled={status.type === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base shadow-sm"
            disabled={status.type === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Contanos cómo podemos ayudarte..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-400 text-base resize-none shadow-sm"
            disabled={status.type === 'loading'}
          />
        </div>
        
        {/* Mensaje de estado */}
        {status.message && (
          <div className={`p-4 rounded-lg text-sm font-medium ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : status.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {status.message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-base transition-all duration-200 shadow-md ${
            status.type === 'loading'
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-indigo-700 hover:bg-indigo-800 text-white'
          }`}
        >
          {status.type === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            'Enviar mensaje'
          )}
        </button>
      </form>
    </div>
  );
} 