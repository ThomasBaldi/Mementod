import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Masonry } from '@mui/lab';
import { Box, useMediaQuery } from '@mui/material';

export default function ShowUserImages() {
	const { getAccessTokenSilently } = useAuth0();
	const [picturesArr, setPicturesArr] = useState([]);
	const [error, setError] = useState('');
	/* const toast = useToast(); */

	useEffect(() => {
		window.addEventListener('error', (e) => {
			if (e.message === 'ResizeObserver loop limit exceeded') {
				const resizeObserverErrDiv = document.getElementById(
					'webpack-dev-server-client-overlay-div'
				);
				const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
				if (resizeObserverErr) {
					resizeObserverErr.setAttribute('style', 'display: none');
				}
				if (resizeObserverErrDiv) {
					resizeObserverErrDiv.setAttribute('style', 'display: none');
				}
			}
		});
	}, []);

	useEffect(() => {
		const getImages = async () => {
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
					},
				});

				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				if (picturesArr.length <= 0) setPicturesArr(response.data);
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

	const handleImageClick = (imageSrc) => {
		const newWindow = window.open('', '_blank');
		newWindow.document.write(`<img src="${imageSrc}" alt="Image" />`);
	};

	return (
		<>
			{picturesArr && (
				<Box className='imageBox' sx={{ width: 1200, minHeight: 829 }}>
					<Masonry columns={columns} spacing={2}>
						{picturesArr.map((item) => (
							<div key={item.name}>
								<img
									className='image'
									src={item.src}
									alt={item.name}
									onClick={() => handleImageClick(item.src)}
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
			{error && <p style={{ color: '#FF0000' }}>{error}</p>}
		</>
	);
}
