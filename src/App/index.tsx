import React, { useEffect, useState } from 'react'

import logo from './logo.svg'
import { Button, Buttons, Header, Link, Logo, StyledApp } from './styled'

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

const App: React.FC<Props> = ({ apiUrl }) => {
	const [text, setText] = useState('')

	useEffect(() => {
		loadTemperature(apiUrl).then((text) => setText(text))
	}, [apiUrl])

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
			</Header>
		</StyledApp>
	)
}

export default App
