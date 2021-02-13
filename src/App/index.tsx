import React, { useCallback, useEffect, useState } from 'react'

import head from './img/head.png'
import loading from './img/loading.gif'
import {
	Button,
	Buttons,
	CommandForm,
	Header,
	Image,
	ImageContainer,
	Link,
	RefreshButton,
	StyledApp,
	StyledCode,
	StyledInput,
} from './styled'

type Props = {
	apiUrl: string
}

const loadInfo = async (apiUrl: string): Promise<string> => {
	try {
		const result = await fetch(`${apiUrl}/cgi-bin/welcome.cgi`)
		return result.text()
	} catch (error) {
		console.error(error)
		return 'Error loading info...'
	}
}

const turnOnGreen = async (apiUrl: string): Promise<void> => {
	try {
		await fetch(`${apiUrl}/cgi-bin/ledon-green.cgi`)
	} catch (error) {
		console.error(error)
	}
}

const turnOnRed = async (apiUrl: string): Promise<void> => {
	try {
		await fetch(`${apiUrl}/cgi-bin/ledon-red.cgi`)
	} catch (error) {
		console.error(error)
	}
}

const turnOff = async (apiUrl: string): Promise<void> => {
	try {
		await fetch(`${apiUrl}/cgi-bin/ledoff.cgi`)
	} catch (error) {
		console.error(error)
	}
}

const sendCommand = async (
	apiUrl: string,
	command: string
): Promise<string> => {
	try {
		const result = await fetch(
			encodeURI(`${apiUrl}/cgi-bin/runparam.cgi?input=${command}`)
		)
		return result.text()
	} catch (error) {
		console.error(error)
		return 'Unknown error while executing the command...'
	}
}

type KeyListener = (key: string) => void

const registerKeyListener = (keyListener: KeyListener): void => {
	document.addEventListener('keydown', (event) => keyListener(event.code))
}

const App: React.FC<Props> = ({ apiUrl }) => {
	const [text, setText] = useState('')
	const [command, setCommand] = useState('')
	const [commandResult, setCommandResult] = useState('')

	const refreshInfo = useCallback((): void => {
		loadInfo(apiUrl).then((text) => setText(text))
	}, [apiUrl])

	const handleKeypress = useCallback(
		(key: string): void => {
			switch (key) {
				case 'KeyG':
					turnOnGreen(apiUrl)
					break
				case 'KeyR':
					turnOnRed(apiUrl)
					break
				case 'KeyQ':
					turnOff(apiUrl)
					break
				default:
				// Ignore key press on purpose
			}
		},
		[apiUrl]
	)

	useEffect(() => {
		registerKeyListener(handleKeypress)
		refreshInfo()
	}, [apiUrl, refreshInfo, handleKeypress])

	const commandFormSubmit = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()
		sendCommand(apiUrl, command).then((result) => {
			setCommandResult(result)
			setCommand('')
		})
	}

	return (
		<StyledApp>
			<Header>
				<ImageContainer>
					<Image src={head} alt="head" />
					<Image src={loading} alt="loading" />
				</ImageContainer>
				<RefreshButton color="#008CBA" onClick={refreshInfo}>
					Refresh Info
				</RefreshButton>
				<p dangerouslySetInnerHTML={{ __html: text }} />
				<Buttons>
					<Button color="#4CAF50" onClick={() => turnOnGreen(apiUrl)}>
						Green On (G)
					</Button>
					<Button color="#f44336" onClick={() => turnOnRed(apiUrl)}>
						Red On (R)
					</Button>
					<Button color="#555555" onClick={() => turnOff(apiUrl)}>
						Both Off (Q)
					</Button>
				</Buttons>
				<p>Command execution:</p>
				<CommandForm onSubmit={commandFormSubmit}>
					<StyledInput
						onChange={({ target }) => setCommand(target.value)}
					/>
					<Button type="submit" color="#008CBA">
						Execute
					</Button>
				</CommandForm>
				<StyledCode
					dangerouslySetInnerHTML={{ __html: commandResult }}
				/>
				<Link
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</Link>
			</Header>
		</StyledApp>
	)
}

export default App
