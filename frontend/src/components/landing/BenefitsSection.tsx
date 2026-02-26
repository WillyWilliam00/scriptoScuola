import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SettingsIcon,
  LayoutIcon,
  ShieldIcon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons";

const benefits = [
  {
    icon: SettingsIcon,
    title: "Risparmio tempo",
    description:
      "Elimina i registri cartacei e automatizza la gestione delle fotocopie, risparmiando ore di lavoro amministrativo.",
  },
  {
    icon: LayoutIcon,
    title: "Controllo costi",
    description:
      "Monitora i consumi in tempo reale e rispetta i budget stabiliti con alert automatici quando si avvicinano i limiti.",
  },
  {
    icon: ShieldIcon,
    title: "Export in Excel",
    description:
      "Esporta i dati delle fotocopie in Excel per analisi, report interni e verifiche, quando necessario.",
  },
  {
    icon: FloppyDiskIcon,
    title: "Efficienza",
    description:
      "Importazione rapida da Excel per aggiungere docenti in massa, senza inserimenti manuali ripetitivi.",
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

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perché scegliere{" "}
            <span className="text-primary">ScriptaScuola</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ScriptaScuola trasforma la gestione delle fotocopie da compito
            amministrativo complesso a processo semplice e automatizzato.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <HugeiconsIcon
                  icon={benefit.icon}
                  className="h-6 w-6 text-primary"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
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
            <Link to="/register">Prova ScriptaScuola gratuitamente</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
