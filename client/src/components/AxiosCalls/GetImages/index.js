import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Masonry } from '@mui/lab';
import { Button, Box, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import OpenIn from '@mui/icons-material/OpenInNewOutlined';

export default function ShowUserImages() {
	const { getAccessTokenSilently } = useAuth0();
	const [picturesArr, setPicturesArr] = useState([]);
	const [error, setError] = useState('');
	const [hovered, setHovered] = useState(false);

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

	const handleMouseEnter = (name) => {
		if (hovered !== name) setHovered(name);
	};

	const handleMouseLeave = () => {
		if (hovered !== null) setHovered(null);
	};

	return (
		<>
			{picturesArr && (
				<Box className='masonryBox' sx={{ width: 1200, minHeight: 829 }}>
					<Masonry columns={columns} spacing={2}>
						{picturesArr.map((item) => (
							<div
								key={item.name}
								className='imageCont'
								onMouseEnter={() => handleMouseEnter(item.name)}
								onMouseLeave={handleMouseLeave}
							>
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
								{hovered === item.name && (
									<Button
										className='openBtn'
										onClick={() => handleImageClick(item.src)}
										style={{
											position: 'absolute',
											bottom: '10px',
											left: '5px',
											background: '#121212',
										}}
										color='success'
										variant='outlined'
									>
										<OpenIn />
									</Button>
								)}
								{hovered === item.name && (
									<Button
										className='deleteBtn'
										style={{
											position: 'absolute',
											bottom: '10px',
											right: '5px',
											background: '#121212',
										}}
										color='error'
										variant='outlined'
									>
										<DeleteIcon />
									</Button>
								)}
							</div>
						))}
					</Masonry>
				</Box>
			)}
			{error && <p style={{ color: '#FF0000' }}>{error}</p>}
		</>
	);
}
