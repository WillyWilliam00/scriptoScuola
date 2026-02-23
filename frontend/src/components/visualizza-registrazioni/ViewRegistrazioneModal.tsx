import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Registrazioni } from "@/components/table/columns";

interface ViewRegistrazioneModalProps {
  selectedRegistrazione: Registrazioni | null;
  typeForm: "view" | "edit" | "delete" | null;
  onClose: () => void;
}

const docenteNomeCompleto = (r: Registrazioni | null) =>
  r ? `${r.docenteNome ?? ""} ${r.docenteCognome ?? ""}`.trim() || "-" : "-";

const utenteDisplay = (r: Registrazioni | null) =>
  r ? (r.utenteUsername ?? r.utenteEmail ?? "-") : "-";

export function ViewRegistrazioneModal({
  selectedRegistrazione,
  typeForm,
  onClose,
}: ViewRegistrazioneModalProps) {
  return (
    <Dialog
      open={typeForm === "view" && selectedRegistrazione !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Visualizza registrazione</DialogTitle>
          <DialogDescription>
            Visualizza i dettagli della registrazione copie.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Field>
            <FieldLabel htmlFor="docente-view">Docente</FieldLabel>
            <FieldContent>
              <Input
                id="docente-view"
                value={docenteNomeCompleto(selectedRegistrazione)}
                disabled
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="copie-view">Copie Effettuate</FieldLabel>
            <FieldContent>
              <Input
                id="copie-view"
                type="number"
                value={selectedRegistrazione?.copieEffettuate ?? 0}
                disabled
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="utente-view">Utente</FieldLabel>
            <FieldContent>
              <Input
                id="utente-view"
                value={utenteDisplay(selectedRegistrazione)}
                disabled
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="note-view">Note</FieldLabel>
            <FieldContent>
              <Textarea
                id="note-view"
                value={selectedRegistrazione?.note ?? ""}
                disabled
                rows={3}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="data-view">Data/Ora</FieldLabel>
            <FieldContent>
              <Input
                id="data-view"
                value={
                  selectedRegistrazione?.createdAt
                    ? new Date(selectedRegistrazione.createdAt).toLocaleString("it-IT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
                disabled
              />
            </FieldContent>
          </Field>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Chiudi</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
