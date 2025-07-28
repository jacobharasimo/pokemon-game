import {Box, Typography, Button} from "@mui/material";
import {SelectedPokemon} from "../../types";
import {Pokemon} from "../pokemon";
import {useState} from "react";

export interface BattleContentProps {
    isLoading: boolean;
    selectedPokemon?: SelectedPokemon
}

const BattleContent = ({isLoading, selectedPokemon}:BattleContentProps) => {
    const [battleResults, setBattleResults]= useState<string|undefined>(undefined)
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography sx={{  fontSize: '12px', color: '#0f380f' }}>Loading...</Typography>
            </Box>
        )
    }

    if (!selectedPokemon) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography sx={{  fontSize: '14px', color: '#0f380f' }}>Empty Pokedex</Typography>
            </Box>
        )
    }

    const battlePokemon = ()=>{
        if(selectedPokemon.attacker.selectedMove.power === selectedPokemon.defender.selectedMove.power){
            setBattleResults('Draw')
        }
        else if(selectedPokemon.attacker.selectedMove.power > selectedPokemon.defender.selectedMove.power){
            setBattleResults(`${selectedPokemon.attacker.name} lands a decisive blow with ${selectedPokemon.attacker.selectedMove.name} knocking out ${selectedPokemon.defender.name}!`)
        }
        else if(selectedPokemon.attacker.selectedMove.power < selectedPokemon.defender.selectedMove.power){
            setBattleResults(`${selectedPokemon.defender.name} lands a decisive blow with ${selectedPokemon.defender.selectedMove.name} knocking out ${selectedPokemon.attacker.name}!`)

        }

    };

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#9bbc0f' }}>
            {/* Top Pokemon (Opponent/Defender) */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                    sx={{
                        p: 1,
                        border: '1px solid #0f380f',
                        borderRadius: 1,
                        backgroundColor: '#8bac0f',
                        minWidth: 60
                    }}
                >
                    <Typography sx={{ fontSize: '12px', color: '#0f380f', mb: 0.5 }}>
                        {selectedPokemon.defender.name.toUpperCase()}
                    </Typography>
                    <Typography sx={{fontSize: '10px', color: '#0f380f' }}>
                        {selectedPokemon.defender.selectedMove.name}: {selectedPokemon.defender.selectedMove.power || 'N/A'}
                    </Typography>
                </Box>

                {selectedPokemon.defender.sprites.front_default && (
                    <Pokemon height={180} width={180} pokemon={selectedPokemon.defender} />
                )}
            </Box>

            {/* Bottom Pokemon (Player/Attacker) */}
            <Box sx={{ position: 'absolute', bottom: 35, left: 8, display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedPokemon.attacker.sprites.back_default && (
                    <Pokemon height={200} width={200} pokemon={selectedPokemon.attacker} />
                )}

                <Box
                    sx={{
                        p: 1,
                        border: '1px solid #0f380f',
                        borderRadius: 1,
                        backgroundColor: '#8bac0f',
                        minWidth: 60
                    }}
                >
                    <Typography sx={{  fontSize: '12px', color: '#0f380f', mb: 0.5 }}>
                        {selectedPokemon.attacker.name.toUpperCase()}
                    </Typography>
                    <Typography sx={{  fontSize: '10px', color: '#0f380f' }}>
                        {selectedPokemon.attacker.selectedMove.name}: {selectedPokemon.attacker.selectedMove.power || 'N/A'}
                    </Typography>
                </Box>
            </Box>

            {/* Battle Log */}
            <Box
                sx={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: 2,
                    left: 2,
                    right: 2,
                    height: 95,
                    width: '100%',
                    p: 1,
                    overflow: 'hidden',
                    overflowY: 'auto',
                }}
            >
                <Box sx={{display: 'flex', width: '74%', border: '1px solid #0f380f',
                    borderRadius: 1,
                    backgroundColor: '#8bac0f',}}>
                    <Box>
                        <Typography sx={{  fontSize: '12px', color: '#0f380f', mb: 0.5 }}>
                            BATTLE LOG
                        </Typography>
                        {battleResults && (
                            <Typography sx={{  fontSize: '10px', color: '#0f380f', lineHeight: 1.2 }}>
                                {battleResults}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box>
                    <Button
                        onClick={battlePokemon}
                        variant="outlined"
                        sx={{
                            ml: 1,
                            fontSize: '10px'
                        }}
                    >
                        Battle
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}

export { BattleContent }