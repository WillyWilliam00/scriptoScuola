import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CameraIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Qui puoi aggiungere la logica di autenticazione
        console.log('Dati login:', formData);
        navigate('/')
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary ">
            <div className="bg-secondary rounded-lg p-6 w-full max-w-xl">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary p-2 mx-auto">
                    <HugeiconsIcon icon={CameraIcon} strokeWidth={2} className="text-secondary w-12 h-12" />
                </div>
                <h1 className="text-2xl font-semibold text-primary text-center mt-4">Registro Copie Scolastico</h1>
                <h3 className="text-sm text-center text-muted-foreground">Accesso Riservato</h3>

                <form onSubmit={handleSubmit} className="mt-6">
                    <FieldGroup className="">
                        <Field>
                            <FieldLabel htmlFor="nome">Nome</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="nome"
                                    type="text"
                                    placeholder="Inserisci il tuo nome"
                                    required
                                    className="rounded-none h-12"
                                    value={formData.nome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="cognome">Cognome</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="cognome"
                                    type="text"
                                    placeholder="Inserisci il tuo cognome"
                                    required
                                    className="rounded-none h-12"
                                    value={formData.cognome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cognome: e.target.value }))}
                                />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Inserisci la password"
                                    required
                                    className="rounded-none h-12"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                />
                            </FieldContent>
                        </Field>

                        <div className="pt-2">
                            <Button type="submit" className="w-full rounded-none " size="lg" variant="default">
                                Accedi
                            </Button>
                            <Link to="/register" className="text-sm text-muted-foreground block text-center mt-2">
                                <span className="text-sm text-muted-foreground underline hover:text-primary">Registrati</span>
                            </Link>
                        </div>
                    </FieldGroup>
                </form>
            </div>
            <Footer />
        </div>
    )
}