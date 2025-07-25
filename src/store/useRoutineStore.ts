import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Routine = {
    name: string
    hour: string
    insumos: { nome: string; quantidade: number; unidade: string }[]
    cho: string
    ptn: string
    lip: string
    mau: string
    obs: string
}

interface RoutineStore {
    routines: Routine[]
    filteredRoutines: Routine[]
    addRoutine: (routine: Routine) => void
    filterRoutines: (search: string) => void
    reset: () => void
}

export const useRoutineStore = create<RoutineStore>()(
    persist(
        (set, get) => ({
            routines: [],
            filteredRoutines: [],

            addRoutine: (routine) => set((state) => {
                const updated = [...state.routines, routine].sort((a, b) => a.hour.localeCompare(b.hour))
                return {
                    routines: updated,
                    filteredRoutines: updated,
                }
            }),

            filterRoutines: (search) => {
                const searchLower = search.toLowerCase()

                const filtered = get().routines.filter(routine =>
                    routine.name.toLowerCase().includes(searchLower) ||
                    routine.hour.includes(searchLower)
                )

                set({ filteredRoutines: filtered })
            },

            reset: () => set({ routines: [], filteredRoutines: [] }),
        }),
        {
            name: 'routine-storage',
        }
    )
)
