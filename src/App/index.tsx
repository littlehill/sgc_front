import React from 'react'

import logo from './logo.svg'
import { Header, Link, Logo, StyledApp } from './styled'

const App: React.FC = () => (
	<StyledApp>
		<Header>
			<Logo src={logo} alt="logo" />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
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

export default App
