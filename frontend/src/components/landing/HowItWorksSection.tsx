import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  FileIcon,
  SettingsIcon,
  CameraIcon,
} from "@hugeicons/core-free-icons";

const steps = [
  {
    number: "01",
    icon: UserIcon,
    title: "Registra il tuo istituto",
    description:
      "Crea il tuo account amministratore e configura l'istituto in pochi minuti.",
    mockup: "register",
  },
  {
    number: "02",
    icon: FileIcon,
    title: "Importa i docenti",
    description:
      "Aggiungi i docenti manualmente o importa l'elenco completo da file Excel.",
    mockup: "import",
  },
  {
    number: "03",
    icon: SettingsIcon,
    title: "Imposta i limiti di copie",
    description:
      "Definisci i limiti di fotocopie per ogni docente in base alle tue esigenze.",
    mockup: "settings",
  },
  {
    number: "04",
    icon: CameraIcon,
    title: "Inizia a registrare le fotocopie",
    description:
      "Comincia subito a tracciare le fotocopie effettuate con un'interfaccia semplice e intuitiva.",
    mockup: "register-copies",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariantsReverse = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Componente per mockup delle schermate
function MockupScreen({ type }: { type: string }) {
  const mockups = {
    register: (
      <div className="bg-background border rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <div className="h-3 w-3 rounded-full bg-muted" />
          <div className="space-y-3">
            <div className="h-4 bg-primary/20 rounded w-3/4" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-primary rounded w-1/3" />
          </div>
        </div>
      </div>
    ),
    import: (
      <div className="bg-background border rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted" />
            <div className="h-3 w-3 rounded-full bg-muted" />
            <div className="h-3 w-3 rounded-full bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-primary/20 rounded w-full" />
            <div className="h-3 bg-muted rounded w-5/6" />
            <div className="h-3 bg-muted rounded w-4/6" />
            <div className="h-3 bg-muted rounded w-3/4" />
          </div>
          <div className="h-8 bg-primary/10 rounded border-2 border-dashed border-primary/30 flex items-center justify-center">
            <HugeiconsIcon icon={FileIcon} className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    ),
    settings: (
      <div className="bg-background border rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <div className="h-4 bg-primary/20 rounded w-2/3" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-6 w-16 bg-primary rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-6 w-16 bg-primary rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-6 w-16 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    ),
    "register-copies": (
      <div className="bg-background border rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <div className="h-4 bg-primary/20 rounded w-1/2" />
          <div className="space-y-3">
            <div className="h-10 bg-muted rounded" />
            <div className="flex gap-2">
              <div className="h-10 bg-primary rounded flex-1" />
              <div className="h-10 bg-muted rounded w-20" />
            </div>
            <div className="h-20 bg-muted/50 rounded border-2 border-dashed" />
          </div>
        </div>
      </div>
    ),
  };

  return mockups[type as keyof typeof mockups] || null;
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 px-4 bg-muted/30"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Come funziona ScriptaScuola
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inizia a usare ScriptaScuola in pochi semplici passaggi.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 p-6 bg-background rounded-lg border shadow-sm`}
              >
                {/* Contenuto testo */}
                <div className="flex-1 flex flex-col md:flex-row items-start gap-6 w-full md:w-auto">
                  {/* Numero e icona */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                    <div className="hidden md:block p-3 rounded-full bg-primary/10">
                      <HugeiconsIcon
                        icon={step.icon}
                        className="h-6 w-6 text-primary"
                      />
                    </div>
                  </div>

                  {/* Testo */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <div className="p-2 rounded-full bg-primary/10">
                        <HugeiconsIcon
                          icon={step.icon}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <h3 className="hidden md:block text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Mockup immagine */}
                <motion.div
                  variants={isEven ? imageVariants : imageVariantsReverse}
                  className="flex-shrink-0 w-full md:w-64"
                >
                  <MockupScreen type={step.mockup} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
