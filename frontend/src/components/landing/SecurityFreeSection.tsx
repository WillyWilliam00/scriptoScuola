import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShieldIcon,
  KeyIcon,
  HelpCircleIcon,
  UserIcon,
  SettingsIcon,
  FileIcon,
} from "@hugeicons/core-free-icons";

const securityItems = [
  {
    icon: ShieldIcon,
    title: "Dati di ogni istituto separati",
    description: "Ogni scuola ha il proprio spazio dedicato e indipendente.",
  },
  {
    icon: UserIcon,
    title: "Accessi con ruoli diversi",
    description:
      "Puoi assegnare permessi diversi ad amministratori, collaboratori e altri utenti.",
  },
  {
    icon: KeyIcon,
    title: "Nessuna condivisione indesiderata",
    description:
      "I dati non vengono condivisi con terze parti non autorizzate.",
  },
];

const freeItems = [
  {
    icon: FileIcon,
    title: "Nessun canone mensile",
    description: "Utilizzi ScriptaScuola senza spese ricorrenti.",
    badge: "GRATUITO",
  },
  {
    icon: SettingsIcon,
    title: "Nessuna carta di credito richiesta",
    description: "Puoi iniziare subito, senza vincoli contrattuali.",
  },
  {
    icon: HelpCircleIcon,
    title: "Tutte le funzionalità incluse",
    description:
      "Accedi a tutte le funzioni senza versioni limitate o costi aggiuntivi.",
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

export default function SecurityFreeSection() {
  return (
    <section id="security" className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sicurezza dei dati per il tuo istituto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ScriptaScuola tutela le informazioni del tuo istituto e ti permette di
            utilizzarla senza costi di licenza.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Blocco sicurezza dati */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              Sicurezza e protezione dei dati
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Ogni istituto mantiene il pieno controllo sulle proprie informazioni,
              con protezioni pensate per un utilizzo quotidiano semplice e sicuro.
            </p>
            <ul className="space-y-4">
              {securityItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <HugeiconsIcon
                      icon={item.icon}
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="#faq"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Scopri di più sulla gestione dei dati
              </a>
            </div>
          </div>

          {/* Blocco completamente gratuito */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-green-500 text-white border-green-500 text-xs md:text-sm px-3 py-1">
                  GRATUITO
                </Badge>
                <span className="text-xs md:text-sm text-muted-foreground">
                  Nessun costo di licenza
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                Completamente gratuito
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Nessun canone mensile, nessun costo nascosto: utilizzi tutte le
                funzionalità di ScriptaScuola senza alcun impegno economico.
              </p>
              <ul className="space-y-4 mb-6">
                {freeItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-full bg-green-500/10">
                      <HugeiconsIcon
                        icon={item.icon}
                        className="h-6 w-6 text-green-600"
                      />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="mt-2 flex justify-start">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-base bg-green-600 hover:bg-green-700 text-white"
              >
                <Link to="/register">Registrati gratuitamente</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
