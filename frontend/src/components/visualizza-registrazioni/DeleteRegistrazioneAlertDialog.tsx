import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { DeleteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Registrazioni } from "@/components/table/columns";
import { useDeleteRegistrazione } from "@/hooks/use-registrazioni";
import { formatError } from "@/lib/utils";

interface DeleteRegistrazioneAlertDialogProps {
  selectedRegistrazione: Registrazioni | null;
  typeForm: "view" | "edit" | "delete" | null;
  onClose: () => void;
}

const docenteNomeCompleto = (r: Registrazioni | null) =>
  r ? `${r.docenteNome ?? ""} ${r.docenteCognome ?? ""}`.trim() || "-" : "-";

export function DeleteRegistrazioneAlertDialog({
  selectedRegistrazione,
  typeForm,
  onClose,
}: DeleteRegistrazioneAlertDialogProps) {
  const deleteRegistrazione = useDeleteRegistrazione();

  const handleDelete = () => {
    if (selectedRegistrazione === null) return;
    deleteRegistrazione.mutate(selectedRegistrazione.id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <AlertDialog
      open={typeForm === "delete" && selectedRegistrazione !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Eliminare la registrazione di {docenteNomeCompleto(selectedRegistrazione)}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione eliminerà la registrazione di{" "}
            {selectedRegistrazione?.copieEffettuate ?? 0} copie per{" "}
            {docenteNomeCompleto(selectedRegistrazione)} dal sistema. Questa operazione non può
            essere annullata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {deleteRegistrazione.isError && deleteRegistrazione.error && (
          <p className="text-sm text-destructive px-6" role="alert">
            {formatError(deleteRegistrazione.error, "Errore durante l'eliminazione.")}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={deleteRegistrazione.isPending}>
            Annulla
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={deleteRegistrazione.isPending}
          >
            {deleteRegistrazione.isPending ? "Eliminazione…" : "Elimina"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
