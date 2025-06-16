'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Cog, Inbox, Info, ListChecks } from "lucide-react";
import { RoutinesFilters } from "@/components/RoutinesFilters/routinesFilters";
import { CreateRoutine } from "@/components/CreateRoutine/createRoutine";

export default function Registers() {
    return (
        <div className="container mx-60 mt-10">
        <header className="flex flex-row justify-between items-center">
            <div className="left-nav">
                <h1>Cadastros</h1>
            </div>
            <div className="right-nav flex flex-row items-center gap-3">
                <Button className="bg-purple-600"><ListChecks />Tarefas</Button>
                <Inbox />
                <Info />
                <Cog />
            </div>
        </header>

        <section className="navsTitle flex flex-row justify-between items-center mt-13">
            <h1 className="text-3xl font-semibold">Gestão de rotinas de laboratório</h1>
            <CreateRoutine />
        </section>

        <section className="routines mt-10">
            <RoutinesFilters />
            <div className="tables mt-5">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h1 className="text-lg">10:00 — Procedimento Matinal</h1>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-row items-center justify-between">
                    <ul className="space-y-1">
                        <li><strong>Solução A:</strong> 5 mL</li>
                        <li><strong>Composto B ou C:</strong> 250 mg</li>
                        <li><strong>Reagente Mediolab:</strong> 2 gotas</li>
                        <li><strong>Catalisador (CATPURE):</strong> 5 mg</li>
                        <li className="italic mt-5">Observação: Misturar em recipiente estéril e executar em fluxo laminar.</li>
                    </ul>
                    <div className="mt-4 flex flex-col items-center gap-6">
                        <div>CHO: <strong>26g</strong></div>
                        <div>PTN: <strong>25g</strong></div>
                        <div>LIP: <strong>1.3g</strong></div>
                        <div className="text-purple-600 font-bold">215 mAU</div>
                    </div>
                    </div>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </section>
        </div>
    );
}
