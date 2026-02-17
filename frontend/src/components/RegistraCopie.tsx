import { CameraIcon, Plus, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import HeaderSection from "./HeaderSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import type { Docenti } from "./table/columns";
import { Button } from "./ui/button";

export default function RegistraCopie() {
    const [selectedDocente, setSelectedDocente] = useState<Docenti | null>(null);
 

    const handleSelectDocente = (docente: Docenti) => {
        // Toggle: se il docente è già selezionato, deselezionalo, altrimenti selezionalo
        // TODO: Sostituire con confronto per ID quando disponibile
        const isAlreadySelected = selectedDocente &&
            selectedDocente.nome === docente.nome &&
            selectedDocente.cognome === docente.cognome;

        setSelectedDocente(isAlreadySelected ? null : docente);
    }

    const docenti: Docenti[] = [
        {
            nome: "Mario",
            cognome: "Rossi",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        },
        {
            nome: "Luigi",
            cognome: "Bianchi",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        },
        {
            nome: "Giovanni",
            cognome: "Verdi",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        },
        {
            nome: "Francesco",
            cognome: "Neri",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        },
        {
            nome: "Matteo",
            cognome: "Gialli",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        },
        {
            nome: "Davide",
            cognome: "Rosi",
            copieEffettuate: 0,
            copieRimanenti: 1000,
            limite: 1000,
        }
    ];
    return (
        <div>
            <HeaderSection title="Registra Fotocopie" icon={CameraIcon} />
            <div className="flex flex-col gap-2 items-center justify-center mt-9">
                <div className="flex flex-col max-w-xl w-full gap-2 px-4 ">
                    <InputGroup>
                        <InputGroupInput placeholder="Cerca docente per nome o cognome..." />
                        <InputGroupAddon>
                            <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <ScrollArea className="max-w-xl md:max-w-2xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] w-full mt-4 h-[calc(100vh-250px)] p-4">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 p-4 items-start">
                        {docenti.map((docente) => {
                            // TODO: Sostituire con confronto per ID quando disponibile
                            const isSelected = selectedDocente &&
                                selectedDocente.nome === docente.nome &&
                                selectedDocente.cognome === docente.cognome;

                            return (
                                <button
                                    key={`${docente.nome}-${docente.cognome}`}
                                    onClick={() => handleSelectDocente(docente)}
                                    className="cursor-pointer "
                                >
                                    <Item
                                        variant="outline"
                                        className={` hover:bg-muted transition-all duration-200 ease-linear ${isSelected ? 'ring-2 ring-primary' : ''
                                            }`}
                                    >
                                        <ItemContent>
                                            <ItemTitle>{docente.nome} {docente.cognome}</ItemTitle>
                                            <ItemDescription>Copie: {docente.copieEffettuate}/{docente.limite}</ItemDescription>
                                        </ItemContent>
                                        <ItemContent>
                                            <ItemDescription className="text-sm text-green-500">
                                                Copie Rimanenti: {docente.copieRimanenti}
                                            </ItemDescription>
                                        </ItemContent>
                                        {isSelected && <ItemContent className="w-full">
                                            <ItemDescription className="text-sm ">
                                                Inserisci copie effettuate
                                            </ItemDescription>
                                            <div className="flex  gap-2">
                                                <InputGroup className="">
                                                    <InputGroupInput type="number" placeholder="Inserisci copie effettuate" />
                                                    <InputGroupAddon align="inline-end">
                                                        /{docente.limite}
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <Button variant="default" size="icon">
                                                    <HugeiconsIcon icon={Plus} strokeWidth={2} />

                                                </Button>
                                            </div>
                                        </ItemContent>}
                                    </Item>
                                </button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}