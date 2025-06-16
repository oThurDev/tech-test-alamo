import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const routinesFiltersSchema = z.object({
    search: z.string(),
})

type RoutinesFiltersSchema = z.infer<typeof routinesFiltersSchema> 

export function RoutinesFilters() {
    const { register, handleSubmit } = useForm<RoutinesFiltersSchema>({
        resolver: zodResolver(routinesFiltersSchema)
    })

    function handleFilterRoutines(data: RoutinesFiltersSchema) {
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(handleFilterRoutines)}>
            <div className="inputs flex flex-row gap-5">
                <Input type="text" className="w-xs" {...register('search')} />
                <Button type="submit" className="bg-purple-600">Buscar</Button>
                <Button>Filtragem Avançada</Button>
            </div>
        </form>
    )
}