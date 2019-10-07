import React from 'react';
import Box from '@material-ui/core/Box';

const Footer = () => {
	return (
		<footer
		style={{
			flexShrink: '0',
			zIndex: '-1',
			position: 'absolute',
			bottom: '0px',
			width: '100%',
			backgroundColor: '#FF8855',
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'baseline',
			textAlign: 'center',
			clear: 'both'
			}}>
			<h1
			style={{
				fontSize: '3em',
				fontFamily: 'Reenie Beanie'
			}}> FutSTAT </h1>
			<p
			style={{
				fontWeight: 'bold'
			}}>Powered by Tal Milecki</p>
		</footer>
	)
}

export default Footer;