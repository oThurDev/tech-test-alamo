'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Cog, Inbox, Info, ListChecks } from "lucide-react";
import { RoutinesFilters } from "@/components/RoutinesFilters/routinesFilters";
import { CreateRoutine } from "@/components/CreateRoutine/createRoutine";

import { useRoutineStore } from "../../store/useRoutineStore";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Registers() {
    const routines = useRoutineStore(state => state.filteredRoutines);

    const routinesSorted = [...routines].sort((a, b) => {
        const [aHour, aMinute] = a.hour.split(':').map(Number);
        const [bHour, bMinute] = b.hour.split(':').map(Number);

        return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
    });

    const reset = useRoutineStore(state => state.reset)

    return (
        <div className="container-dash mt-10">
            <header className="header-dash flex flex-row justify-between items-center">
                <div className="left-nav">
                    <h1>Cadastros</h1>
                </div>
                <div className="right-nav flex flex-row items-center gap-3">
                    <Button className="tasks bg-purple-600"><ListChecks />Tarefas</Button>
                    <Inbox className="icon-config" />
                    <Info className="icon-config" />
                    <Cog className="icon-config" />
                </div>
            </header>

            <section className="navsTitle flex flex-row justify-between items-center mt-13">
                <h1 className="text-3xl font-semibold">Gestão de rotinas de laboratório</h1>
                <CreateRoutine />
            </section>
            <section className="routines">
                <RoutinesFilters />
                {routines.length === 0 ? (
                    <p>Nenhuma rotina cadastrada.</p>
                ) : (
                    <div className="tables mt-5">
                        <Accordion type="single" collapsible className="w-full">
                            {routinesSorted.map((routine, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger>
                                        <h1 className="text-lg">{routine.hour} — {routine.name}</h1>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-row items-center justify-between">
                                            <ul className="space-y-1">
                                                {routine.insumos.map((insumo, index) => (
                                                    <li key={index}>
                                                        <strong>{insumo.nome}:</strong> {insumo.quantidade} {insumo.unidade}
                                                    </li>
                                                ))}
                                                {routine.obs && (
                                                    <li className="italic mt-5">Observação: {routine.obs}</li>
                                                )}
                                            </ul>
                                            <div className="mt-4 flex flex-col items-center gap-6">
                                                <div>CHO: <strong>{routine.cho}g</strong></div>
                                                <div>PTN: <strong>{routine.ptn}g</strong></div>
                                                <div>LIP: <strong>{routine.lip}g</strong></div>
                                                <div className="text-purple-600 font-bold">{routine.mau} mAU</div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}
                {routines.length === 0 ? (
                    <div className="hidden"></div>
                ) : (
                    <div className="mt-10">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant="destructive">
                                    Limpar todas as rotinas
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir todas as rotinas?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente todas as suas rotinas do site, tem certeza disso?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={reset}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog >
                    </div >
                )
                }
            </section >
        </div >
    );
}