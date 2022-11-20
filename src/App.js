import { Container, Box } from '@mui/material'
import { useState } from 'react'
import Shortener from './Components/Shortener/Shortener'
import Expander from './Components/Expander/Expander'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

function App() {
	const [shortenerOpen, setShortenerOpen] = useState(true)

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='md'>
				<Box
					sx={{
						display: 'grid',
						placeItems: 'center',
						margin: '2rem 0',
					}}
				>
					<div className='switch-button'>
						<input
							className='switch-button-checkbox'
							type='checkbox'
							value={shortenerOpen}
							onChange={() => setShortenerOpen(prevState => !prevState)}
						></input>
						<label className='switch-button-label'>
							<span className='switch-button-label-span'>Shortener</span>
						</label>
					</div>
				</Box>
				{shortenerOpen ? <Shortener /> : <Expander />}
			</Container>
		</ThemeProvider>
	)
}

export default App
