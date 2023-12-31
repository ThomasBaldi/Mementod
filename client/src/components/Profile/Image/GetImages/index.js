import './index.css';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Masonry } from '@mui/lab';
import { Button, Box, useMediaQuery } from '@mui/material';
import OpenIn from '@mui/icons-material/OpenInNewOutlined';
import DeleteImage from '../DeleteImage';
import AlertMsg from '../../../../utils/AlertMsg';
import { axiosCalls } from '../../../../utils/AxiosCalls';

export default function ShowUserImages() {
	const { getAccessTokenSilently } = useAuth0();
	const [picturesArr, setPicturesArr] = useState([]);
	const [error, setError] = useState('');
	const [message] = useState('');
	const [hovered, setHovered] = useState(false);

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
				<Box className='masonryBox' sx={{ minHeight: 829 }}>
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
										borderRadius: 10,
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
								{hovered === item.name && <DeleteImage image={item.name} />}
							</div>
						))}
					</Masonry>
				</Box>
			)}
			<AlertMsg message={message} error={error} />
		</>
	);
}
