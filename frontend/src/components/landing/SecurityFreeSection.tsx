import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import {
  ShieldIcon,
  KeyIcon,
  HelpCircleIcon,
  UserIcon,
  SettingsIcon,
  FileIcon,
} from "@hugeicons/core-free-icons";

const securityFeatures = [
  {
    icon: FileIcon,
    title: "Completamente gratuito",
    description:
      "Nessun costo nascosto, nessuna limitazione. ScriptaScuola è gratuito per sempre.",
    badge: "GRATUITO",
    color: "green",
  },
  {
    icon: ShieldIcon,
    title: "Sicurezza multi-tenant",
    description:
      "Ogni istituto ha i propri dati completamente isolati e protetti.",
    badge: null,
    color: "blue",
  },
  {
    icon: UserIcon,
    title: "Privacy garantita",
    description:
      "Nessuna condivisione dati con terze parti. Controllo completo sui tuoi dati.",
    badge: null,
    color: "blue",
  },
  {
    icon: KeyIcon,
    title: "Autenticazione sicura",
    description:
      "Password hashate e autenticazione JWT con refresh token per massima sicurezza.",
    badge: null,
    color: "blue",
  },
  {
    icon: SettingsIcon,
    title: "Nessun vincolo",
    description:
      "Nessun contratto a lungo termine, nessuna carta di credito richiesta.",
    badge: null,
    color: "green",
  },
  {
    icon: HelpCircleIcon,
    title: "Supporto incluso",
    description:
      "Documentazione completa e assistenza gratuita per il setup iniziale.",
    badge: null,
    color: "green",
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-green-500 text-white border-green-500 text-base px-4 py-1.5">
              GRATUITO
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sicuro, gratuito e senza compromessi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ScriptaScuola è completamente gratuito e garantisce la massima sicurezza
            dei tuoi dati.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-background p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
                feature.color === "green"
                  ? "border-green-500/20"
                  : "border-blue-500/20"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-full ${
                    feature.color === "green"
                      ? "bg-green-500/10"
                      : "bg-blue-500/10"
                  }`}
                >
                  <HugeiconsIcon
                    icon={feature.icon}
                    className={`h-6 w-6 ${
                      feature.color === "green"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                {feature.badge && (
                  <Badge className="bg-green-500 text-white border-green-500">
                    {feature.badge}
                  </Badge>
                )}
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
      </div>
    </section>
  );
}
