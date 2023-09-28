import { Grid } from '@mui/material';
import React from 'react';
function AlbumContainer({ albumName }) {
	return (
		<Grid className='album'>
			<h3>{albumName}</h3>
		</Grid>
	);
}

export default AlbumContainer;
