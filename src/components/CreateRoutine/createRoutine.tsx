import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useEffect, useState } from "react";

import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRoutineStore } from "../../store/useRoutineStore";

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
    const [open, setOpen] = useState(false);

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

    const { register, handleSubmit, control, setValue, reset, watch } = useForm<RoutinesAddSchema>({
        resolver: zodResolver(routinesAddSchema),
        defaultValues: {
            name: "",
            hour: "",
            insumos: [{
                nome: '',
                quantidade: 0,
                unidade: ''
            }],
            cho: "",
            ptn: "",
            lip: "",
            mau: "",
            obs: "",
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "insumos"
    });


    const addRoutine = useRoutineStore(state => state.addRoutine);

    function handleCreateRoutine(data: RoutinesAddSchema) {
        addRoutine(data);
        setOpen(false)
    }

    useEffect(() => {
        if (open === false) {
            reset();
        }
    }, [open, reset]);

    return (
        <div className="dialog">
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button className="bg-purple-600">
                        <CirclePlus />
                        Adicionar Rotina
                    </Button>
                </DialogTrigger>
                <DialogContent className="add-routine w-[95vw] sm:w-[600px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
                    <DialogHeader className="header-dialog">
                        <DialogTitle>Nova Rotina</DialogTitle>
                        <DialogDescription>Adicionar uma nova rotina no sistema</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleCreateRoutine)}>
                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <Input
                                className="flex-1"
                                placeholder="Nome da Rotina"
                                {...register('name')}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <Label>Horário</Label>
                                <Input
                                    className="w-[100px]"
                                    type="time"
                                    {...register('hour')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between items-center mt-5">
                            <Label>Adicionar Insumos/Reagentes:</Label>
                            <Button type="button" onClick={() => append({ nome: "", quantidade: 0, unidade: "" })}>
                                <CirclePlus />
                            </Button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col sm:flex-row gap-3 my-5">
                                <Input
                                    className="flex-1"
                                    placeholder="Nome do Insumo/Reagente"
                                    {...register(`insumos.${index}.nome`)}
                                    required
                                />
                                <Input
                                    className="w-[100px]"
                                    type="number"
                                    placeholder="Qtd."
                                    {...register(`insumos.${index}.quantidade`)}
                                    required
                                />
                                <Select
                                    onValueChange={(value) => setValue(`insumos.${index}.unidade`, value)}
                                    defaultValue={field.unidade}
                                    required
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
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="sm:ml-3"
                                    disabled={fields.length === 1}
                                >
                                    <CircleMinus />
                                </Button>
                            </div>
                        ))}

                        <div className="w-full bg-gray-200 h-0.5 my-5" />

                        <div className="flex flex-col sm:flex-row gap-3 my-3">
                            {[
                                { label: "CHO", name: "cho" },
                                { label: "PTN", name: "ptn" },
                                { label: "LIP", name: "lip" },
                                { label: "mAU", name: "mau" },
                            ].map((item) => (
                                <div key={item.name} className="flex flex-col gap-1 flex-1">
                                    <Label>{item.label}</Label>
                                    <Input
                                        type="number"
                                        placeholder={item.label}
                                        {...register(item.name as "cho" | "ptn" | "lip" | "mau")}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col my-5">
                            <Label className="mb-2">Observações</Label>
                            <Textarea
                                placeholder="Digite aqui as observações"
                                {...register('obs')}
                            />
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
        </div>
    )
}