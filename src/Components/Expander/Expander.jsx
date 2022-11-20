import {
	Box,
	TextField,
	Typography,
	Button,
	Stack,
	Tooltip,
	useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ContentCopy, Done, Toys } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

function Expander() {
	const theme = useTheme()
	const smDownMatches = useMediaQuery(theme.breakpoints.down('sm'))
	const [inputLink, setInputLink] = useState('')
	const [lngLink, setLngLink] = useState('')
	const [copied, setCopied] = useState(false)

	const submit = async e => {
		e.preventDefault()

		if (inputLink.length === 0) return

		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/expand`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ shortUrl: inputLink }),
			}
		)

		if (response.ok) {
			const link = await response.json()
			setLngLink(link)
			setInputLink('')
		}
	}

	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false)
			}, 3000)
		}
	}, [copied])

	return (
		<Box
			sx={{
				margin: '2rem 0rem',
				marginTop: '4rem',
				width: '100%',
				display: 'grid',
				placeItems: 'center',
			}}
		>
			<Typography
				sx={{
					textAlign: 'center',
					fontWeight: 300,
				}}
				color='primary'
				component='h2'
				variant={smDownMatches ? 'h3' : 'h2'}
			>
				Expand Short Links!
			</Typography>

			<form className='form' onSubmit={submit}>
				<TextField
					value={inputLink}
					onChange={e => {
						setInputLink(e.target.value)
					}}
					fullWidth
					placeholder='Paste a shortened link'
				/>
				<Button type='submit' className='buttton' variant='contained'>
					Expand
				</Button>
			</form>

			{lngLink && (
				<Box
					sx={{
						marginTop: '2rem',
						textAlign: 'center',
						width: {
							xs: '100%',
							sm: '75%',
						},
					}}
				>
					<Typography
						sx={{
							marginBottom: '1rem',
						}}
						component='p'
						variant='h5'
						color='primary'
					>
						Original URL
					</Typography>
					<Box
						sx={{
							border: 1,
							borderColor: theme.palette.primary.main,
							textAlign: 'center',
							width: '100%',
							padding: smDownMatches ? '1rem' : '2rem',
							borderRadius: 1,
						}}
					>
						<Typography component='p' variant='body' color='primary' sx={{
							marginBottom: '1rem'
						}}>
							{lngLink.hostname}
						</Typography>
						<Typography
							// color={theme.palette.grey[800]}
							component='a'
							variant='h5'
							href={lngLink.url}
							target='blank'
							rel='noreferrer noopener'
							sx={{
								display: 'inline-block',
								wordBreak: 'break-word',
							}}
						>
							{lngLink.url.split('//')[1].replace('www.', '')}
						</Typography>
					</Box>
				</Box>
			)}
			{/* <pre>{JSON.stringify(srtLink, undefined, 2)}</pre> */}
		</Box>
	)
}

export default Expander
