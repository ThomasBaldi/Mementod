import React, { useEffect, useState } from 'react';
import './index.css';
/* import AlbumContainer from './Album'; */
import { Button, Card, CardActions, CardMedia, Container } from '@mui/material';
import { cardBtnStyling, cardTitleStyling, txtStyling } from '../../utils/Styling';
import { axiosCalls } from '../../utils/AxiosCalls';
import { useAuth0 } from '@auth0/auth0-react';
import AlertMsg from '../../utils/AlertMsg';

const Builder = () => {
	const { getAccessTokenSilently } = useAuth0();
	const [error, setError] = useState('');
	const [message] = useState('');
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		const getAlbumList = async () => {
			try {
				const response = await axiosCalls('getAlbumList', undefined, getAccessTokenSilently);
				setAlbums(response.data);
			} catch (err) {
				setError(err.message);
				console.log(err);
			}
		};
		getAlbumList();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className='container' id='builderContainer'>
				<h2 style={txtStyling}>EXPLORE ALL OF YOUR ALBUMS HERE</h2>
				<div className='albumContainer'>
					{albums &&
						albums.map((album, index) => {
							return (
								<Container maxWidth='md' className='album' key={index}>
									<Card className='albumCard' sx={{ maxWidth: '60vw', borderRadius: '10px' }}>
										<CardMedia sx={{ height: '40vh' }} image={album.src} />
										<CardActions className='cardBtns'>
											<Button disabled sx={cardTitleStyling} size='medium'>
												{album.folderName}
											</Button>
											<Button
												color='secondary'
												variant='contained'
												sx={cardBtnStyling}
												size='medium'
											>
												Open Album
											</Button>
										</CardActions>
									</Card>
								</Container>
							);
						})}
				</div>
			</div>
			<AlertMsg message={message} error={error} />
		</>
	);
};

export default Builder;
