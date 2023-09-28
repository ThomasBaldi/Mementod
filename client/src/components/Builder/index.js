import React, { useState } from 'react';
import './index.css';
import AlbumContainer from './Album';
import { Button, Grid } from '@mui/material';
/* import { Button } from '@mui/base';

const btnStyling = {
	marginBottom: '3vh',
	width: '100%',
	transition: '0s 0.1s',
	'&:active': {
		backgroundColor: '#121212',
		transition: '0s',
		border: '1px solid #7c4dff',
		color: '#7c4dff',
	},
}; */

const Builder = () => {
	const [albums, setAlbums] = useState([]);

	const addAlbum = () => {
		// Generate a unique key for each album
		const uniqueKey = `album-${albums.length + 1}`;
		// Create a new album component and add it to the array
		const newAlbum = (
			<div key={uniqueKey} className='album-column'>
				<AlbumContainer albumName={`Album ${albums.length + 1}`} />
			</div>
		);

		setAlbums([...albums, newAlbum]);
	};

	return (
		<>
			<div className='container' id='builderContainer'>
				<h1>Album Grid</h1>
				<Button className='albumBtn' onClick={addAlbum}>
					Add Album
				</Button>
				<Grid className='album-container'>{albums}</Grid>
			</div>
		</>
	);
};

export default Builder;
