import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Masonry } from '@mui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import { axiosCalls } from '../../../utils/AxiosCalls';
import AlertMsg from '../../../utils/AlertMsg';
import RenameFileDialog from './RenameFile';
import reload from '../../../utils/WindowsReload';

function AlbumContainer({ albumName }) {
	const { getAccessTokenSilently } = useAuth0();
	const [picturesArr, setPicturesArr] = useState([]);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedAlbumName, setSelectedAlbumName] = useState('');

	useEffect(() => {
		const getImages = async () => {
			try {
				const response = await axiosCalls('getAlbumPictures', albumName, getAccessTokenSilently);
				setPicturesArr(response.data);
			} catch (err) {
				setError(err.message);
				console.log(err);
			}
		};

		getImages();
		// eslint-disable-next-line
	}, []);

	const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
	const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

	let columns = 3;

	if (isSmScreen) {
		columns = 1;
	} else if (isMdScreen) {
		columns = 2;
	} else if (isLgScreen) {
		columns = 3;
	}

	// Function to handle renaming and sending to the server
	const handleRenameAndSend = async (newFileName) => {
		// Send `newFileName` to the server to rewrite the file name in S3
		// You can use axios or your preferred HTTP library for this
		// Example using axios:
		try {
			await axiosCalls(
				'rename',
				{ oldFileName: selectedAlbumName, newFileName },
				getAccessTokenSilently
			).then(() => {
				setMessage(`${selectedAlbumName} renamed to "${newFileName}`);
				reload();
			});
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	return (
		<>
			{picturesArr && (
				<Box className='albumBox'>
					<Masonry columns={columns} spacing={2}>
						{picturesArr.map((item) => {
							const [itemName] = item.name.split('.');
							return (
								<div key={item.name} className='imageCont'>
									<img
										className='image'
										src={item.src}
										alt={item.name}
										loading='lazy'
										style={{
											borderTopLeftRadius: '10px',
											borderTopRightRadius: '10px',
											display: 'block',
											width: '100%',
										}}
									/>
									<Box
										style={{
											borderBottomLeftRadius: '10px',
											borderBottomRightRadius: '10px',
											background: '#1f1f1f',
											display: 'block',
											width: '100%',
										}}
										size='medium'
										onClick={() => {
											setIsDialogOpen(true);
											setSelectedAlbumName(item.name);
										}}
									>
										{itemName}
									</Box>
								</div>
							);
						})}
					</Masonry>
				</Box>
			)}
			<AlertMsg message={message} error={error} />
			<RenameFileDialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSubmit={handleRenameAndSend}
			/>
		</>
	);
}

export default AlbumContainer;
