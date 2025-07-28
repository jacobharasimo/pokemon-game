// PokeAPI response types
export interface PokeApiResponse {
    count: number
    next: string | null
    previous: string | null
    results: PokeApiPokemon[]
}

export interface PokeApiPokemon {
    name: string
    url: string
}

// Move details from individual move API calls
export interface MoveDetails {
    id: number
    name: string
    accuracy: number | null
    power: number
    pp: number
    priority: number
    damage_class: {
        name: string
        url: string
    }
    effect_entries: Array<{
        effect: string
        language: {
            name: string
        }
    }>
    flavor_text_entries: Array<{
        flavor_text: string
        language: {
            name: string
        }
    }>
    type: {
        name: string
        url: string
    }
}

// Detailed Pokemon data from individual API calls
export interface PokemonDetails {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
        front_default: string
        back_default: string
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    moves: Array<{
        move: {
            name: string
            url: string
        }
    }>
    types: Array<{
        type: {
            name: string
        }
    }>
    selectedMove: MoveDetails
}

// Selected Pokemon for battle with full details
export interface SelectedPokemon {
    attacker: PokemonDetails
    defender: PokemonDetails
}