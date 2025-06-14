import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, Cog, Inbox, Info, ListChecks, Search } from "lucide-react";

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
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center text-right gap-3 mt-5 w-65 mr-4">
                            <Input className="col-span-3" placeholder="Nome da Rotina" />
                        </div>
                        <div className="flex flex-row items-center text-right gap-3 mt-5">
                            <Label>Horário</Label>
                            <Input className="w-30" type="time" placeholder="Horario da Rotina" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center text-right gap-3 mt-5">
                        <Label>Nome da Rotina</Label>
                        <Input className="col-span-3" />
                    </div>


                    <DialogFooter>
                        <Button type="button" variant='outline'>Cancelar</Button>
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
