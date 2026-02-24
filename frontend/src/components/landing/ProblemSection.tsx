import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileIcon,
  HelpCircleIcon,
  EyeOff,
  SettingsIcon,
} from "@hugeicons/core-free-icons";

const problems = [
  {
    icon: FileIcon,
    title: "Tracciamento manuale",
    description:
      "Fogli Excel sparsi, registri cartacei difficili da consultare e rischio di perdita dati.",
  },
  {
    icon: HelpCircleIcon,
    title: "Difficoltà nel rispettare i limiti",
    description:
      "Impossibile monitorare in tempo reale i consumi e rispettare i budget stabiliti.",
  },
  {
    icon: EyeOff,
    title: "Mancanza di visibilità",
    description:
      "Nessuna dashboard centralizzata per avere una visione d'insieme delle fotocopie effettuate.",
  },
  {
    icon: SettingsIcon,
    title: "Tempo perso in gestione",
    description:
      "Ore spese in compilazione manuale di registri e calcoli, sottraendo tempo alle attività principali.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-20 md:py-32 px-4 bg-muted/30"
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
            Il problema delle scuole moderne
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La gestione manuale delle fotocopie crea inefficienze e complicazioni
            che rallentano il lavoro amministrativo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-destructive/10">
                  <HugeiconsIcon
                    icon={problem.icon}
                    className="h-8 w-8 text-destructive"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
