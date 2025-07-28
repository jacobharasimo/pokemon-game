import { Container } from '@mui/material'
import { Battle } from './containers/battle'

function App() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Battle />
        </Container>
    )
}

export default App