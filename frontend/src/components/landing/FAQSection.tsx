import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "ScriptaScuola è gratuito?",
    answer:
      "Sì, ScriptaScuola è completamente gratuito. Non ci sono costi nascosti, limitazioni di funzionalità o abbonamenti. Puoi usare tutte le funzionalità senza alcun costo.",
  },
  {
    question: "Quanto tempo serve per configurare l'istituto?",
    answer:
      "La configurazione iniziale richiede solo pochi minuti. Dopo la registrazione, puoi iniziare subito a importare i docenti e configurare i limiti di copie. Il setup completo di un istituto medio richiede meno di 30 minuti.",
  },
  {
    question: "Posso importare i docenti da Excel?",
    answer:
      "Assolutamente sì! ScriptaScuola supporta l'importazione bulk da file Excel. Puoi caricare l'elenco completo dei docenti con un solo click, con anteprima e validazione automatica dei dati prima dell'importazione.",
  },
  {
    question: "Come funziona il controllo dei limiti di copie?",
    answer:
      "Puoi impostare un limite personalizzato per ogni docente. ScriptaScuola monitora automaticamente i consumi in tempo reale e ti avvisa quando un docente si avvicina al limite. Il sistema blocca automaticamente nuove registrazioni quando il limite viene superato.",
  },
  {
    question: "I dati sono sicuri? Ogni istituto vede solo i propri dati?",
    answer:
      "Sì, ScriptaScuola utilizza un'architettura multi-tenant sicura. Ogni istituto ha i propri dati completamente isolati e protetti. Nessun istituto può vedere o accedere ai dati di altri istituti. La sicurezza è garantita a livello di database e applicazione.",
  },
  {
    question: "Posso avere più utenti con ruoli diversi?",
    answer:
      "Sì, ScriptaScuola supporta più utenti con ruoli differenziati. Puoi creare utenti amministratori (con accesso completo) e collaboratori (con permessi limitati). Ogni utente ha le proprie credenziali e può accedere solo alle funzionalità consentite dal proprio ruolo.",
  },
  {
    question: "Cosa succede se un docente supera il limite di copie?",
    answer:
      "Quando un docente supera il limite, ScriptaScuola blocca automaticamente nuove registrazioni per quel docente. Riceverai una notifica e potrai decidere se aumentare il limite o mantenere il blocco. Tutte le registrazioni precedenti rimangono nel sistema per audit.",
  },
  {
    question: "Posso esportare i dati delle registrazioni?",
    answer:
      "Sì, puoi visualizzare e consultare tutte le registrazioni attraverso la dashboard. ScriptaScuola mantiene uno storico completo di tutte le operazioni, facilmente consultabile per report e verifiche. L'esportazione in Excel è una funzionalità pianificata per le prossime versioni.",
  },
  {
    question: "Serve un server dedicato o è un servizio cloud?",
    answer:
      "ScriptaScuola è un'applicazione web che funziona nel browser. Non serve installare software o configurare server. Basta registrarsi e accedere tramite browser. I dati sono ospitati su server cloud sicuri e accessibili da qualsiasi dispositivo con connessione internet.",
  },
  {
    question: "Posso provare ScriptaScuola prima di registrarmi?",
    answer:
      "Sì! La registrazione è gratuita e richiede solo pochi minuti. Puoi creare il tuo account amministratore e iniziare subito a usare ScriptaScuola. Non è richiesta alcuna carta di credito o informazione di pagamento.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Domande frequenti
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trova risposte alle domande più comuni su ScriptaScuola.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
