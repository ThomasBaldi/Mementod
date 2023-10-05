import React, { useEffect, useState } from 'react';
import './index.css';
import { Box, Button, Card, CardActions, CardMedia } from '@mui/material';
import { cardBtnStyling, cardTitleStyling, txtStyling } from '../../utils/Styling';
import { axiosCalls } from '../../utils/AxiosCalls';
import { useAuth0 } from '@auth0/auth0-react';
import AlertMsg from '../../utils/AlertMsg';
import AlbumContainer from './Album';
import RenameFileDialog from './Album/RenameFile';
import reload from '../../utils/WindowsReload';

const Builder = () => {
	const { getAccessTokenSilently } = useAuth0();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [albums, setAlbums] = useState([]);
	const [openAlbumNames, setOpenAlbumNames] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState('');

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

	const handleAlbumRename = async (newAlbumName) => {
		try {
			await axiosCalls(
				'renameAlbum',
				{ oldAlbumName: selectedAlbum, newAlbumName },
				getAccessTokenSilently
			).then(() => {
				setMessage(`${selectedAlbum} renamed to "${newAlbumName}"`);
				reload();
			});
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<div className='container' id='builderContainer'>
				<h3 style={txtStyling}>EXPLORE ALL OF YOUR ALBUMS HERE</h3>
				{albums &&
					albums.map((album, index) => {
						const isAlbumOpen = openAlbumNames.includes(album.folderName);
						return (
							<div className='album' key={index}>
								<Card
									className='albumCard'
									sx={{
										borderRadius: '10px',
										borderBottomLeftRadius: isAlbumOpen ? '0px' : '10px',
										borderBottomRightRadius: isAlbumOpen ? '0px' : '10px',
									}}
								>
									<CardMedia
										sx={{
											height: isAlbumOpen ? '0vh' : '40vh',
											transition: 'height 0.5s ease-in-out',
											overflow: 'hidden',
										}}
										image={album.src}
									/>
									<CardActions className='cardBtns'>
										<Box
											sx={cardTitleStyling}
											onClick={() => {
												setIsDialogOpen(true);
												setSelectedAlbum(album.folderName);
											}}
										>
											{album.folderName}
										</Box>
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
								{isAlbumOpen && <AlbumContainer albumName={album.folderName} />}
							</div>
						);
					})}
			</div>
			<AlertMsg message={message} error={error} />
			<RenameFileDialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSubmit={handleAlbumRename}
				label='New Album Name'
			/>
		</>
	);
};

export default Builder;
