import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  SettingsIcon,
  LayoutIcon,
  FloppyDiskIcon,
  UserIcon,
  ShieldIcon,
} from "@hugeicons/core-free-icons";

const features = [
  {
    icon: FileIcon,
    title: "Tracciamento automatico",
    description:
      "Registra ogni fotocopia in modo semplice e veloce, con storico completo delle operazioni.",
  },
  {
    icon: SettingsIcon,
    title: "Gestione limiti per docente",
    description:
      "Imposta limiti personalizzati per ogni docente e monitora i consumi in tempo reale.",
  },
  {
    icon: LayoutIcon,
    title: "Tutto sotto controllo",
    description:
      "Visualizza tutte le informazioni in un'unica schermata: statistiche, report e analisi.",
  },
  {
    icon: FloppyDiskIcon,
    title: "Importazione da Excel",
    description:
      "Importa rapidamente l'elenco docenti da file Excel, con anteprima e controlli automatici.",
  },
  {
    icon: UserIcon,
    title: "Multi-utente con ruoli",
    description:
      "Gestisci admin e collaboratori con permessi differenziati per un controllo granulare.",
  },
  {
    icon: ShieldIcon,
    title: "Istituti separati e ruoli chiari",
    description:
      "Ogni scuola ha il proprio spazio dedicato e puoi definire ruoli diversi per chi accede.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-32 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Funzionalità principali
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una soluzione completa e intuitiva per digitalizzare la gestione
            delle fotocopie nella tua scuola.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <HugeiconsIcon
                  icon={feature.icon}
                  className="h-6 w-6 text-primary"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base"
          >
            <Link to="/register">Registrati in pochi minuti</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
