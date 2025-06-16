import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRoutineStore } from "../../store/useRoutineStore"

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
                <Input type="text" className="w-xs" placeholder="Buscar por nome ou horário..." {...register('search')} />
                <Button type="submit" className="bg-purple-600">Buscar</Button>
                <Button>Filtragem Avançada</Button>
            </div>
        </form>
    )
}