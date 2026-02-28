import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { FormEvent } from "react";

export default function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(false);

    if (!name.trim() || !email.trim()) {
      setError("Per favore compila almeno nome e email per inviare la richiesta.");
      return;
    }

    setError(null);
    setSent(true);
  };

  return (
    <section id="cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-primary/5 border-2 border-primary/20 py-20 md:py-32 px-4"
      >
        <div className="max-w-6xl mx-auto rounded-2xl  md:p-12">
          <div className="grid gap-10 md:grid-cols-2 ">
            <div className="text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Pronto a digitalizzare la gestione delle fotocopie del tuo istituto?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8 max-w-2xl"
              >
                Inizia subito con ScriptaScuola per monitorare, controllare e analizzare
                le fotocopie del tuo istituto in modo semplice e strutturato.
              </motion.p>
              <motion.ul initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }} className="mt-6 space-y-3  text-muted-foreground flex flex-col gap-3 font-bold">
                <motion.li initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }} className="flex items-baseline gap-3 shrink-0">
                  <span
                    className="h-2 w-2 rounded-full bg-primary "
                    aria-hidden="true"
                  />
                  <p>
                
                      Tracciamento automatico delle fotocopie
                
                  </p>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }} className="flex items-baseline gap-3 shrink-0">
                  <span
                    className="h-2 w-2 rounded-full bg-primary "
                    aria-hidden="true"
                  />
                  <p>
            
                      Limiti personalizzati per ogni docente
         
                  </p>
                </motion.li>
                <motion.li initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }} className="flex items-baseline gap-3 shrink-0">
                  <span
                    className="h-2 w-2 rounded-full bg-primary "
                    aria-hidden="true"
                  />
                  <p>
                  
                      Import da Excel e report in pochi clic
                    
                  </p>
                </motion.li>
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center items-center mt-10"
              >
                <Button
                  size="lg"
                  asChild
                  className="text-base px-8 py-6 w-full sm:w-auto"
                >
                  <Link to="/register">Registra il tuo istituto</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-base px-8 py-6 w-full sm:w-auto"
                >
                  <Link to="/login">Accedi al tuo account</Link>
                </Button>
              </motion.div>

          
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background rounded-xl border border-primary/20 p-6 md:p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Richiedi ulteriori informazioni
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lascia i tuoi dati per essere ricontattato e ricevere maggiori
                dettagli su come adottare ScriptaScuola nel tuo istituto.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e cognome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Es. Mario Rossi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email istituzionale</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Es. nome.cognome@istituto.it"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">Nome istituto</Label>
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Es. Istituto Comprensivo XX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio (opzionale)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descrivi brevemente le tue esigenze o domande."
                    rows={4}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
                {sent && !error && (
                  <p className="text-sm text-emerald-700 mt-1">
                    Richiesta inviata. Ti ricontatteremo via email al più presto.
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full mt-2"
                >
                  Invia richiesta di informazioni
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
