import { useForm } from '@tanstack/react-form';
import { insertIstitutoSchema, registerSchema } from '@shared/validation'; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Register() {
  const form = useForm({
    defaultValues: {
      istituto: {
        nome: '',
        codiceIstituto: '',
      },
      utente: {
        email: '',
        password: '',
      },
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('http://localhost:3000/api/setup-scuola', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        });
        
        const result = await response.json();

        if (!response.ok) {
          // Gestiamo l'errore che arriva dal nostro middleware Express
          throw new Error(result.error || 'Errore durante la registrazione');
        }
        
        alert('Configurazione completata con successo!');
        // Qui potresti reindirizzare l'utente alla dashboard
      } catch (err: any) {
        alert(err.message);
      }
    },
  });

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Benvenuto nel SaaS Fotocopie</h1>
        <p className="text-muted-foreground mt-2">Configura il tuo istituto e il primo account amministratore.</p>
      </div>

    </div>
  );
}