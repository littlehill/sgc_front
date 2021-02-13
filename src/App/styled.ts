import styled from 'styled-components'

export const StyledApp = styled.div`
	text-align: center;
`

export const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-size: calc(10px + 2vmin);
	color: white;
	background-color: #282c34;
`

export const Logo = styled.img`
	height: 40vmin;
	pointer-events: none;

	@keyframes App-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		animation: App-logo-spin infinite 20s linear;
	}
`

export const Link = styled.a`
	color: #61dafb;
`

export const Buttons = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	margin: 1em;
`

type ButtonProps = { color: string }

export const Button = styled.button<ButtonProps>`
	background-color: ${({ color }) => color};
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 24px;
	border-radius: 8px;
	cursor: pointer;
	outline: none;

	&:hover {
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
			0 17px 50px 0 rgba(0, 0, 0, 0.19);
	}
`
