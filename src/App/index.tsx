import React, { useEffect, useState } from 'react'

import logo from './logo.svg'
import {
	Button,
	Buttons,
	CommandForm,
	Header,
	Link,
	Logo,
	StyledApp,
	StyledCode,
	StyledInput,
} from './styled'

type Props = {
	apiUrl: string
}

const loadTemperature = async (apiUrl: string): Promise<string> => {
	try {
		const result = await fetch(`${apiUrl}/cgi-bin/test.cgi`)
		return result.text()
	} catch (error) {
		console.error(error)
		return 'Error loading CPU temperature...'
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

const App: React.FC<Props> = ({ apiUrl }) => {
	const [text, setText] = useState('')
	const [command, setCommand] = useState('')
	const [commandResult, setCommandResult] = useState('')

	useEffect(() => {
		loadTemperature(apiUrl).then((text) => setText(text))
	}, [apiUrl])

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
				<Logo src={logo} alt="logo" />
				<p>{text}</p>
				<Link
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</Link>
				<Buttons>
					<Button color="#4CAF50" onClick={() => turnOnGreen(apiUrl)}>
						Green On
					</Button>
					<Button color="#f44336" onClick={() => turnOnRed(apiUrl)}>
						Red On
					</Button>
					<Button color="#555555" onClick={() => turnOff(apiUrl)}>
						Both Off
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
			</Header>
		</StyledApp>
	)
}

export default App
