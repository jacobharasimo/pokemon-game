import {Box, Typography} from "@mui/material";
import {PokemonDetails} from "../../types";

interface BattleLogProps {
    attacker: PokemonDetails;
    defender: PokemonDetails;
}

const BattleLog = ({attacker, defender}: BattleLogProps) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 2,
                left: 2,
                right: 2,
                height: 65,
                border: '1px solid #0f380f',
                borderRadius: 1,
                backgroundColor: '#8bac0f',
                p: 1,
                overflow: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Typography sx={{ fontSize: '12px', color: '#0f380f', mb: 0.5 }}>
                BATTLE LOG
            </Typography>
            <Typography sx={{ fontSize: '10px', color: '#0f380f', lineHeight: 1.2 }}>
                {attacker.name.toUpperCase()} VS {defender.name.toUpperCase()}
            </Typography>
            <Typography sx={{ fontSize: '10px', color: '#0f380f', lineHeight: 1.2 }}>
                READY TO BATTLE!
            </Typography>
        </Box>
    )
}

export { BattleLog }