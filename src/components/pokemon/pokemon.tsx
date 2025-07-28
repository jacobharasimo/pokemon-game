import {PokemonDetails} from "../../types";

export interface PokemonProps {
    height: number;
    width: number;
    pokemon: PokemonDetails
}

const Pokemon = ({height, width, pokemon}: PokemonProps) => {
    return <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
            width,
            height,
            imageRendering: 'pixelated',
            filter: 'sepia(1) hue-rotate(60deg) saturate(0.8) brightness(0.8)'
        }}
    />
}

export { Pokemon }