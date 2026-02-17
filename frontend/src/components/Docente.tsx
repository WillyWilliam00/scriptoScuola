import { DeleteIcon, EditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Docente() {
    return (
        <AlertDialog>
            <Item variant="outline" className="">
                <ItemContent>
                    <ItemTitle>Mario Rossi</ItemTitle>
                    <ItemDescription><span className="font-bold">Limite:</span> 1000</ItemDescription>
                </ItemContent>

                <ItemActions>
                    <Button variant="outline" className="">
                        <HugeiconsIcon icon={EditIcon} strokeWidth={2} />
                        <span className="">Modifica</span>
                    </Button>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />

                        </Button>
                    </AlertDialogTrigger>

                </ItemActions>
            </Item>
            <AlertDialogContent size="default">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Eliminare il docente Mario Rossi?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Questa azione eliminerà il docente Mario Rossi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Annulla</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Elimina</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}