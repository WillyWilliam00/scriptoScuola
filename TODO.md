# Todo – ScriptaScuola

Lista di attività da completare per il progetto. Usa questo file come roadmap.

---






## Architettura frontend



- [ ] **Gestire ErrorBoundary localmente nelle tabelle**  
  Implementare ErrorBoundary specifici per ogni tabella (DataTable) per gestire errori di caricamento dati in modo isolato, senza bloccare l'intera applicazione.

---

## CRUD


- [ ] **Controllare CRUD in tabelle**  
  Verificare e testare tutte le operazioni CRUD nelle tabelle esistenti (docenti, utenti) per assicurarsi che funzionino correttamente e gestiscano gli errori in modo appropriato.


- [ ] **Implementare reset docenti con possibilità di cambiare i limiti**  
  Nella funzionalità di reset docenti, aggiungere la possibilità di modificare i limiti di copie per ogni docente durante l'operazione di reset.

- [ ] **Export Excel tabella**  
  Implementare funzionalità di esportazione in formato Excel per le tabelle (docenti, utenti, registrazioni). Permettere l'esportazione dei dati filtrati/visualizzati nella tabella corrente.



## UI/UX

- [x] **Inserire landing page**  
  Creare una pagina di benvenuto/landing page per l'applicazione con informazioni sul sistema e accesso rapido alle funzionalità principali.


---

## Autenticazione e sicurezza

- [ ] **Inserire recupero password per collaboratori**  
  Implementare funzionalità di recupero password per i collaboratori:
  - Form di richiesta reset password (email)
  - Invio email con link di reset
  - Pagina di reset password con token
  - Validazione token e aggiornamento password

- [ ] **Recupero password per admin**  
  Implementare funzionalità di recupero password per gli amministratori:
  - Form di richiesta reset password (email)
  - Invio email con link di reset
  - Pagina di reset password con token
  - Validazione token e aggiornamento password





---

*Ultimo aggiornamento: febbraio 2026*
