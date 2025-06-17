import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRoutineStore } from "../../store/useRoutineStore"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const routinesFiltersSchema = z.object({
    search: z.string(),
})

type RoutinesFiltersSchema = z.infer<typeof routinesFiltersSchema>

export function RoutinesFilters() {
    const filterRoutines = useRoutineStore(state => state.filterRoutines)

    const { register, handleSubmit } = useForm<RoutinesFiltersSchema>({
        resolver: zodResolver(routinesFiltersSchema)
    })

    function handleFilterRoutines(data: RoutinesFiltersSchema) {
        filterRoutines(data.search)
    }

    return (
        <form onSubmit={handleSubmit(handleFilterRoutines)} className="my-10">
            <div className="inputs flex flex-row gap-5">
                <Input type="text" className="input-page w-xs" placeholder="Buscar por nome ou horário..." {...register('search')} />
                <Button type="submit" className="input-page bg-purple-600">Buscar</Button>
                <Dialog>
                    <DialogTrigger>
                        <Button type="submit" className="input-page">Filtragem Avançada</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Filtragem Avançada</DialogTitle>
                            <DialogDescription>Filtrar rotinas por insumo, horario ou nome</DialogDescription>
                        </DialogHeader>
                        <form>
                            <div>
                                <Input type="text" placeholder="Faça aqui sua pesquisa por nome, hora ou insumo/reagente..." />
                            </div>
                        </form>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant='outline'>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Filtrar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </form>
    )
}