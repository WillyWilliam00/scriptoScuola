import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Titolo principale */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Digitalizza la gestione delle{" "}
          <span className="text-primary">fotocopie</span> nella tua scuola
        </motion.h1>

        {/* Sottotitolo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          ScriptaScuola è il gestionale web che ti permette di monitorare, tracciare
          e controllare le fotocopie effettuate dai docenti, rispettando i limiti
          di budget e semplificando la gestione amministrativa.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" asChild className="text-base px-8 py-6">
            <Link to="/register">Registra il tuo istituto</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
            <Link to="/login">Hai già un account? Accedi</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
