import type {ColumnDef} from "@tanstack/react-table"
import { Field, FieldLabel } from "../ui/field"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button";
import { ArrowUpDownIcon, EditIcon, DeleteIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export type Docenti = {
    nome: string;
    cognome: string;
    copieEffettuate: number;
    copieRimanenti: number;
    limite: number;
}
export type Utenze = {
    nome: string;
    cognome: string;
    ruolo: 'admin' | 'collaboratore';
}

// Callbacks per azioni CRUD sul singolo docente
export type DocenteActions = {
    onView?: (docente: Docenti) => void;
    onEdit?: (docente: Docenti) => void;
    onDelete?: (docente: Docenti) => void;
}

export type UtenzeActions = {
    onView?: (utenza: Utenze) => void;
    onEdit?: (utenza: Utenze) => void;
    onDelete?: (utenza: Utenze) => void;
}

// Factory per le colonne dei docenti, così possiamo iniettare le callback dal componente feature
export const createColumnsDocenti = (actions: DocenteActions = {}): ColumnDef<Docenti>[] => [
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nome 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "nome",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Cognome 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "cognome",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Copie Effettuate 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "copieEffettuate",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Copie Rimanenti 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "copieRimanenti",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Limite 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "limite",
    },
    {
        header: "Progresso",
        cell: ({ row }) => {
            const progresso = Math.round((row.original.copieEffettuate / row.original.limite) * 100)
            const uniqueId = `progress-${row.id}`
            
            return (
                <Field className="w-full max-w-sm">
                    <FieldLabel htmlFor={uniqueId}>
                        <span className="ml-auto">{progresso}%</span>
                    </FieldLabel>
                    <Progress value={progresso} id={uniqueId} />
                </Field>
            )
        },
    },
    {
        id: "azioni",
        header: "Azioni",
        cell: ({ row }) => {
            const docente = row.original;
            const { onView, onEdit, onDelete } = actions;

            return (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (onView) {
                                onView(docente);
                            } else {
                                console.log("Visualizza docente:", docente);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={EyeIcon} strokeWidth={2} className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (onEdit) {
                                onEdit(docente);
                            } else {
                                console.log("Modifica docente:", docente);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={EditIcon} strokeWidth={2} className="size-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (onDelete) {
                                onDelete(docente);
                            } else {
                                console.log("Elimina docente:", docente);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} className="size-4" />
                    </Button>
                </div>
            );
        },
    }
]
export const createColumnsUtenze = (actions: UtenzeActions = {}): ColumnDef<Utenze>[] => [
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nome 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "nome",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Cognome 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "cognome",
    },
    {
        header: ({column}) => {
            return (
                <button className="flex items-center gap-2 text-md cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Ruolo 
                    <HugeiconsIcon icon={ArrowUpDownIcon} strokeWidth={2} className="size-4" />   

                </button>
            )
        },
        accessorKey: "ruolo",
    },
    {
        id: "azioni",
        header: "Azioni",
        cell: ({ row }) => {
            const { onView, onEdit, onDelete } = actions;
            const utenza = row.original;

            return (
                <div className="flex justify-end items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (onView) {
                                onView(utenza);
                            } else {
                                console.log("Visualizza utenza:", utenza);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={EyeIcon} strokeWidth={2} className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (onEdit) {
                                onEdit(utenza);
                            } else {
                                console.log("Modifica utenza:", utenza);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={EditIcon} strokeWidth={2} className="size-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (onDelete) {
                                onDelete(utenza);
                            } else {
                                console.log("Elimina utenza:", utenza);
                            }
                        }}
                    >
                        <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} className="size-4" />
                    </Button>
                </div>
            );
        },
    }
]