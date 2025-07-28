import { useQuery } from '@tanstack/react-query'
import { PokeApiResponse } from '../../types/pokemon'

const fetchPokedex = async (): Promise<PokeApiResponse> => {
    const startTime = Date.now()

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')

    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list')
    }

    const data = await response.json()

    // Ensure minimum 300ms delay
    const elapsed = Date.now() - startTime
    const remainingDelay = Math.max(0, 300 - elapsed)

    if (remainingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingDelay))
    }

    return data
}

export const usePokedex = () => {
    return useQuery({
        queryKey: ['pokedex'],
        queryFn: fetchPokedex,
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 2,
    })
}