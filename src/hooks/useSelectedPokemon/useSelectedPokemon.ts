import { useQuery } from '@tanstack/react-query'
import { PokeApiPokemon, SelectedPokemon, PokemonDetails, MoveDetails } from '../../types/pokemon'

const fetchMoveDetails = async (moveUrl: string): Promise<MoveDetails> => {
    const response = await fetch(moveUrl)

    if (!response.ok) {
        throw new Error(`Failed to fetch move details from ${moveUrl}`)
    }

    return response.json()
}

const fetchPokemonDetails = async (pokemonName: string): Promise<PokemonDetails> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch details for ${pokemonName}`)
    }

    const pokemonData = await response.json()

    // Randomly select a move
    let randomMoveIndex = Math.floor(Math.random() * pokemonData.moves.length)
    let selectedMoveData = pokemonData.moves[randomMoveIndex]

    // Fetch the selected move details
    let moveDetails = await fetchMoveDetails(selectedMoveData.move.url)

    // If the move has no power, keep trying different moves
    let attempts = 0
    while (moveDetails.power === null && attempts < 10) {
        randomMoveIndex = Math.floor(Math.random() * pokemonData.moves.length)
        selectedMoveData = pokemonData.moves[randomMoveIndex]
        moveDetails = await fetchMoveDetails(selectedMoveData.move.url)
        attempts++
    }

    return {
        ...pokemonData,
        selectedMove: moveDetails
    }
}

const selectRandomPokemon = async (pokemonList: PokeApiPokemon[]): Promise<SelectedPokemon> => {
    // Add minimum delay for consistent UX
    await new Promise(resolve => setTimeout(resolve, 200))

    // Randomly select two different Pokemon
    const shuffled = [...pokemonList].sort(() => Math.random() - 0.5)
    const selectedAttacker = shuffled[0]
    const selectedDefender = shuffled[1]

    // Fetch detailed data for both Pokemon (including their selected moves)
    const [attackerDetails, defenderDetails] = await Promise.all([
        fetchPokemonDetails(selectedAttacker.name),
        fetchPokemonDetails(selectedDefender.name)
    ])

    return {
        attacker: attackerDetails,
        defender: defenderDetails
    }
}

export const useSelectedPokemon = (pokemonList: PokeApiPokemon[] | undefined, enabled: boolean = false) => {
    return useQuery({
        queryKey: ['selectedPokemon'],
        queryFn: () => selectRandomPokemon(pokemonList!),
        enabled: enabled && !!pokemonList && pokemonList.length > 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}