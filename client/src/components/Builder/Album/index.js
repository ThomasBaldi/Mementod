import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Masonry } from '@mui/lab';
import { useAuth0 } from '@auth0/auth0-react';
import { axiosCalls } from '../../../utils/AxiosCalls';
import AlertMsg from '../../../utils/AlertMsg';

function AlbumContainer({ albumName }) {
	const { getAccessTokenSilently } = useAuth0();
	const [picturesArr, setPicturesArr] = useState([]);
	const [error, setError] = useState('');
	const [message] = useState('');

	useEffect(() => {
		const getImages = async () => {
			try {
				const response = await axiosCalls('get', undefined, getAccessTokenSilently);
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

	return (
		<>
			<div className='album'>
				{picturesArr && (
					<Box className='masonryBox' sx={{ width: 600, minHeight: 829 }}>
						<h3>{albumName}</h3>
						<Masonry columns={columns} spacing={2}>
							{picturesArr.map((item) => (
								<div key={item.name} className='imageCont'>
									<img
										className='image'
										src={item.src}
										alt={item.name}
										loading='lazy'
										style={{
											borderBottomLeftRadius: 4,
											borderBottomRightRadius: 4,
											display: 'block',
											width: '100%',
										}}
									/>
								</div>
							))}
						</Masonry>
					</Box>
				)}
			</div>
			<AlertMsg message={message} error={error} />
		</>
	);
}

export default AlbumContainer;
