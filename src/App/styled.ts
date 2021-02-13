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
