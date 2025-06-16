import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const routinesAddSchema = z.object({
    name: z.string(),
    hour: z.string(),
    insumos: z.array(z.object({
        nome: z.string(),
        quantidade: z.coerce.number(),
        unidade: z.string(),
    })),
    cho: z.string(),
    ptn: z.string(),
    lip: z.string(),
    mau: z.string(),
    obs: z.string(),
});

type RoutinesAddSchema = z.infer<typeof routinesAddSchema>

export function CreateRoutine() {
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

    const { register, handleSubmit, control, setValue } = useForm<RoutinesAddSchema>({
        resolver: zodResolver(routinesAddSchema),
        defaultValues: {
            insumos: [{
                nome: '',
                quantidade: 0,
                unidade: ''
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "insumos"
    });


    function handleCreateRoutine(data: RoutinesAddSchema) {
        console.log(data)
    }

    return(
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

                    <form onSubmit={handleSubmit(handleCreateRoutine)}>
                        <div className="flex flex-row mt-3">
                            <div className="flex flex-row items-center gap-3 w-65 mr-4">
                                <Input className="col-span-3" placeholder="Nome da Rotina" {...register('name')} />
                            </div>
                            <div className="flex flex-row items-center text-right gap-3">
                                <Label>Horário</Label>
                                <Input className="w-30 col-span-3" type="time" placeholder="Horario da Rotina" {...register('hour')} />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between mt-5 mr-3">
                            <Label>Adicionar Insumos/Reagentes:</Label>
                            <div className="buttons">
                                <div className="add-routine">
                                    <Button type="button" onClick={() => append({ nome: "", quantidade: 0, unidade: "" })}><CirclePlus /></Button>
                                </div>
                            </div>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-row my-5">
                                <Input
                                    className="col-span-3 w-50 mr-2"
                                    placeholder="Nome do Insumo/Reagente"
                                    {...register(`insumos.${index}.nome`)}
                                />
                                <Input
                                    className="w-20 col-span-3 mr-2"
                                    type="number"
                                    placeholder="Qtd."
                                    {...register(`insumos.${index}.quantidade`)}
                                />
                                <Select
                                    onValueChange={(value) =>
                                        setValue(`insumos.${index}.unidade`, value)
                                    }
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
                                <Button type="button" onClick={() => remove(index)} className="ml-3" disabled={fields.length === 1}><CircleMinus /></Button>
                            </div>
                            ))}

                        <div className="divisor w-full bg-gray-200 h-0.5 my-5" />

                        <div className="flex flex-row my-3">
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>CHO</Label>
                                <Input className="col-span-3" placeholder="CHO" type="number" {...register('cho')} />
                            </div>
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>PTN</Label>
                                <Input className="col-span-3" placeholder="PTN" type="number" {...register('ptn')} />
                            </div>
                            <div className="flex flex-col gap-3 w-25 mr-5">
                                <Label>LIP</Label>
                                <Input className="col-span-3" placeholder="LIP" type="number" {...register('lip')} />
                            </div>
                            <div className="flex flex-col gap-3 w-25">
                                <Label>mAU</Label>
                                <Input className="col-span-3" placeholder="mAU" type="number" {...register('mau')} />
                            </div>
                        </div>

                        <div className="flex flex-col my-5">
                            <Label className="mb-3">Observações</Label>
                            <Textarea placeholder="Digite aqui as observações" {...register('obs')} />
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
    )
}