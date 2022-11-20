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
import { ContentCopy, Done } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

function Shortener() {
	const theme = useTheme()
	const smDownMatches = useMediaQuery(theme.breakpoints.down('sm'))
	const [inputLink, setInputLink] = useState('')
	const [inputCache, setInputCache] = useState('')
	const [srtLink, setSrtLink] = useState()
	const [copied, setCopied] = useState(false)

	const submit = async e => {
		e.preventDefault()

		if (inputLink.length === 0) return
		
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/create`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url: inputLink }),
			}
		)

		if (response.ok) {
			const link = await response.json()
			setSrtLink(link)
			setInputCache(inputLink)
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
				Create Short Links!
			</Typography>

			<form className='form' onSubmit={submit}>
				<TextField
					value={inputLink}
					onChange={e => {
						setInputLink(e.target.value)
					}}
					fullWidth
					placeholder='Paste a link to shorten it'
				/>
				<Button type='submit' className='buttton' variant='contained'>
					Shorten
				</Button>
			</form>

			{srtLink && (
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
						Your shortened URL
					</Typography>
					<Box
						onClick={() => {
							navigator.clipboard.writeText(srtLink.shortUrl)
							setCopied(true)
						}}
						sx={{
							border: 1,
							borderColor: theme.palette.primary.main,
							textAlign: 'center',
							padding: smDownMatches ? '1rem' : '2rem',
							borderRadius: 1,
							cursor: 'pointer',
							height: 'auto',
						}}
					>
						<Stack
							direction='row'
							spacing={smDownMatches ? 1 : 2}
							justifyContent='center'
							alignItems='center'
							sx={{
								marginBottom: '1rem',
							}}
						>
							<Typography
								color={theme.palette.grey[800]}
								component='h5'
								variant='h5'
							>
								{srtLink.shortUrl}
							</Typography>
							<Typography color='primary' component='h5' variant='h5'>
								{!copied ? (
									<Tooltip title='Copy'>
										<ContentCopy />
									</Tooltip>
								) : (
									<Tooltip title='Copied'>
										<Done />
									</Tooltip>
								)}
							</Typography>
						</Stack>
						<Typography component='p' variant='body' color='primary'>
							{srtLink.hostname}
						</Typography>
						<Typography
							component='p'
							variant='body'
							color={theme.palette.grey[700]}
							sx={{
								display: 'inline-block',
								wordBreak: 'break-word',
							}}
						>
							{/* {textAbstract(inputCache, 60)} */}
							{inputCache}
						</Typography>
					</Box>
				</Box>
			)}
			{/* <pre>{JSON.stringify(srtLink, undefined, 2)}</pre> */}
		</Box>
	)
}

export default Shortener
