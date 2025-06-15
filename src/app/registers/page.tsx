'use client'

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleMinus, CirclePlus, Cog, Inbox, Info, ListChecks } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Registers() {
    const [insumos, setInsumos] = useState([{ nome: "", quantidade: "", unidade: "" }]);

    const handleAddInsumo = () => {
        setInsumos([...insumos, { nome: "", quantidade: "", unidade: "" }]);
    };

    const handleRemoveInsumo = (index: number) => {
        if (insumos.length === 1) return;
        const newInsumos = [...insumos];
        newInsumos.splice(index, 1);
        setInsumos(newInsumos);
    };


    const handleChange = (index: number, field: string, value: string) => {
        const newInsumos = [...insumos];
        newInsumos[index][field as keyof typeof newInsumos[number]] = value;
        setInsumos(newInsumos);
    };

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-purple-600">
                        <CirclePlus />
                        Adicionar Rotina
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova Rotina</DialogTitle>
                        <DialogDescription>Adicionar uma nova rotina no sistema</DialogDescription>
                    </DialogHeader>

                    <form>
                        <div className="flex flex-row mt-3">
                            <div className="flex flex-row items-center gap-3 w-65 mr-4">
                            <Input className="col-span-3" placeholder="Nome da Rotina" />
                            </div>
                            <div className="flex flex-row items-center text-right gap-3">
                            <Label>Horário</Label>
                            <Input className="w-30 col-span-3" type="time" placeholder="Horario da Rotina" />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between mt-5 mr-3">
                            <Label>Adicionar Insumos/Reagentes:</Label>
                            <div className="buttons">
                                <div className="add-routine">
                                    <Button type="button" onClick={handleRemoveInsumo} className="mr-3" disabled={insumos.length === 1}><CircleMinus /></Button>
                                    <Button type="button" onClick={handleAddInsumo}><CirclePlus /></Button>
                                </div>
                            </div>
                        </div>

                        {insumos.map((insumo, index) => (
                            <div key={index} className="flex flex-row my-5">
                                <div className="flex flex-row items-center gap-3 w-65 mr-2">
                                    <Input
                                        className="col-span-3"
                                        placeholder="Nome do Insumo/Reagente"
                                        value={insumo.nome}
                                        onChange={(e) => handleChange(index, "nome", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row items-center gap-3 mr-2">
                                    <Input
                                        className="w-20 col-span-3"
                                        type="number"
                                        placeholder="Qntd."
                                        value={insumo.quantidade}
                                        onChange={(e) => handleChange(index, "quantidade", e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <Select
                                        value={insumo.unidade}
                                        onValueChange={(value) => handleChange(index, "unidade", value)}
                                    >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Unidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ml">ml</SelectItem>
                                        <SelectItem value="mg">mg</SelectItem>
                                        <SelectItem value="g">g</SelectItem>
                                        <SelectItem value="gts">gts</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ))}

                        <div className="divisor w-full bg-gray-200 h-0.5 my-5" />

                        <div className="flex flex-row my-3">
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>CHO</Label>
                                <Input className="col-span-3" placeholder="CHO" type="number" />
                            </div>
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>PTN</Label>
                                <Input className="col-span-3" placeholder="PTN" type="number" />
                            </div>
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>LIP</Label>
                                <Input className="col-span-3" placeholder="LIP" type="number" />
                            </div>
                            <div className="flex flex-col gap-3 w-25">
                                <Label>mAU</Label>
                                <Input className="col-span-3" placeholder="mAU" type="number" />
                            </div>
                        </div>

                        <div className="flex flex-col my-5">
                            <Label className="mb-3">Observações</Label>
                            <Textarea placeholder="Digite aqui as observações"/>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>

        <section className="routines mt-10">
            <div className="inputs flex flex-row gap-5">
            <Input type="text" className="w-xs" />
            <Button className="bg-purple-600">Buscar</Button>
            <Button>Filtragem Avançada</Button>
            </div>
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
