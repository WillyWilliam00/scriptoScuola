import HeaderSection from "./HeaderSection";
import { DataTable } from "./table/DataTable";
import { createColumnsUtenze, type Utenze } from "./table/columns";
import { KeyIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogMedia } from "@/components/ui/alert-dialog";
import { DeleteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
type DialogMode = 'add' | 'edit' | 'view' | 'delete' | null;
export default function GestioneUtenze() {
    const [dialogMode, setDialogMode] = useState<DialogMode>(null);
    const [selectedUtenza, setSelectedUtenza] = useState<Utenze | null>(null);

    const [formData, setFormData] = useState<Pick<Utenze, 'nome' | 'cognome' | 'ruolo'>>({
        nome: '',
        cognome: '',
        ruolo: 'collaboratore',
    });


    const handleAddUtenza = () => {
        setFormData({ nome: '', cognome: '', ruolo: 'collaboratore' });
        setDialogMode('add');
    }
    const handleCloseDialog = () => {
        setDialogMode(null);
        setSelectedUtenza(null);
        setFormData({ nome: '', cognome: '', ruolo: 'collaboratore' });
    }
    const handleSaveUtenza = () => {
        console.log(formData);
    }
    const data: Utenze[] = [
        {
            nome: "Mario",
            cognome: "Rossi",
            ruolo: "admin",
        },
        {
            nome: "Luigi",
            cognome: "Bianchi",
            ruolo: "collaboratore",
        },
        {
            nome: "Giovanni",
            cognome: "Verdi",
            ruolo: "collaboratore",
        },
        {
            nome: "Francesco",
            cognome: "Neri",
            ruolo: "collaboratore",
        },
    ]

    const columns = createColumnsUtenze({
        onView: (utenza) => {
            setSelectedUtenza(utenza);
            setDialogMode('view');
        },
        onEdit: (utenza) => {
            setSelectedUtenza(utenza);
            setFormData({ nome: utenza.nome, cognome: utenza.cognome, ruolo: utenza.ruolo });
            setDialogMode('edit');
        },
        onDelete: (utenza) => {
            setSelectedUtenza(utenza);
            setDialogMode('delete');
        },
    });
    return (
        <div>
            <HeaderSection title="Gestione Utenze" icon={KeyIcon} />

            <div className="  w-full mt-10 p-4">
                <DataTable columns={columns} data={data} tableType="utenze" onAddClick={handleAddUtenza} showAddButton />
            </div>

            <Dialog open={dialogMode !== null && dialogMode !== 'delete'} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMode === 'add' && 'Aggiungi utenza'}
                            {dialogMode === 'edit' && 'Modifica utenza'}
                            {dialogMode === 'view' && 'Visualizza utenza'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogMode === 'add' && 'Inserisci il nome, il cognome e il ruolo dell utenza.'}
                            {dialogMode === 'edit' && 'Modifica il nome, il cognome e il ruolo dell utenza.'}
                            {dialogMode === 'view' && 'Visualizza i dettagli dell utenza.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Field>
                            <FieldLabel htmlFor="nome-utenza">Nome</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="nome-utenza"
                                    placeholder="Inserisci il nome dell utenza"
                                    required={dialogMode !== 'view'}
                                    disabled={dialogMode === 'view'}
                                    value={dialogMode === 'view' ? selectedUtenza?.nome ?? '' : formData.nome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                                />
                            </FieldContent>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="cognome-utenza">Cognome</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="cognome-utenza"
                                    placeholder="Inserisci il cognome dell utenza"
                                    required={dialogMode !== 'view'}
                                    disabled={dialogMode === 'view'}
                                    value={dialogMode === 'view' ? selectedUtenza?.cognome ?? '' : formData.cognome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cognome: e.target.value }))}
                                />
                            </FieldContent>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="ruolo-utenza">Seleziona il ruolo</FieldLabel>
                            <Select disabled={dialogMode === 'view'} value={formData.ruolo} onValueChange={(value) => setFormData(prev => ({ ...prev, ruolo: value as 'admin' | 'collaboratore' }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleziona il ruolo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="collaboratore">Collaboratore</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleCloseDialog}>
                                {dialogMode === 'view' ? 'Chiudi' : 'Annulla'}
                            </Button>
                        </DialogClose>
                        {dialogMode !== 'view' && (
                            <Button variant="default" onClick={handleSaveUtenza}>
                                {dialogMode === 'add' ? 'Aggiungi' : 'Salva'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog open={dialogMode === 'delete'} onOpenChange={(open) => !open && setDialogMode(null)}>
                
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Eliminare l'utenza {selectedUtenza?.nome} {selectedUtenza?.cognome}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Questa azione eliminerà l'utenza {selectedUtenza?.nome} {selectedUtenza?.cognome} dal sistema. Questa operazione non può essere annullata.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">Annulla</AlertDialogCancel>
                        <AlertDialogAction variant="destructive">Elimina</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}