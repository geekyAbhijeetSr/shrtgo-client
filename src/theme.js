import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#31497e',
			mainGradient: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
		},
	},
	shape: {
		borderRadius: 10,
	},
	typography: {
		button: {
			textTransform: 'none',
			letterSpacing: '0.05em',
			background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
		},
	},
})

export default theme
