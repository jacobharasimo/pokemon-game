import { Box } from '@mui/material'
import { usePokedex } from '../../hooks/usePokedex'
import { useSelectedPokemon } from '../../hooks/useSelectedPokemon'
import {BattleContent} from "../../components/battleContent";

const Battle = () => {
    const { data: pokedexData, isLoading: isLoadingPokedex } = usePokedex()

    const {
        data: selectedPokemon,
        isLoading: isLoadingSelection
    } = useSelectedPokemon(
        pokedexData?.results,
        !isLoadingPokedex && !!pokedexData
    )

    const isLoading = isLoadingPokedex || isLoadingSelection

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
            <Box sx={{ position: 'relative' }}>
                {/* Game Boy SVG from public assets */}
                <img
                    src="/gameboy.svg"
                    alt=""
                    width={800}
                    height={1200}
                    style={{
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                />

                {/* Battle Content Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 150,
                        left: 194,
                        width: 410,
                        height: 350,
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}
                >
                    <BattleContent selectedPokemon={selectedPokemon} isLoading={isLoading} />
                </Box>
            </Box>
        </Box>
    )
}

export { Battle }