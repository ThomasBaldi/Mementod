import React, { useEffect, useState } from 'react';
import './index.css';
/* import AlbumContainer from './Album'; */
import { Button, Card, CardActions, CardMedia, Container } from '@mui/material';
import { cardBtnStyling, cardTitleStyling, txtStyling } from '../../utils/Styling';
import { axiosCalls } from '../../utils/AxiosCalls';
import { useAuth0 } from '@auth0/auth0-react';
import AlertMsg from '../../utils/AlertMsg';
import AlbumContainer from './Album';

const Builder = () => {
	const { getAccessTokenSilently } = useAuth0();
	const [error, setError] = useState('');
	const [message] = useState('');
	const [albums, setAlbums] = useState([]);
	const [openAlbumNames, setOpenAlbumNames] = useState([]);

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

	const handleToggleAlbum = (albumName) => {
		if (openAlbumNames.includes(albumName)) {
			// Close the album
			setOpenAlbumNames((prevOpenAlbumNames) =>
				prevOpenAlbumNames.filter((name) => name !== albumName)
			);
		} else {
			// Open the album
			setOpenAlbumNames((prevOpenAlbumNames) => [...prevOpenAlbumNames, albumName]);
		}
	};

	return (
		<>
			<div className='container' id='builderContainer'>
				<h3 style={txtStyling}>EXPLORE ALL OF YOUR ALBUMS HERE</h3>
				<div className='albumContainer'>
					{albums &&
						albums.map((album, index) => {
							const isAlbumOpen = openAlbumNames.includes(album.folderName);
							return (
								<Container className='album' key={index}>
									<Card className='albumCard' sx={{ borderRadius: '10px' }}>
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
												onClick={() => handleToggleAlbum(album.folderName)}
											>
												{isAlbumOpen ? 'Close Album' : 'Open Album'}
											</Button>
										</CardActions>
									</Card>
									{isAlbumOpen && (
										<div className='albumContainer'>
											<AlbumContainer albumName={album.folderName} />
										</div>
									)}
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
