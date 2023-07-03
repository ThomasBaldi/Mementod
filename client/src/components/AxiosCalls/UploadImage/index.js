import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import AlertMsg from '../../AlertMsg';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function FileUpload() {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const handleUpload = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		//validate file
		if (!validFileTypes.find((type) => type === file.type)) {
			setError('File must be jpeg/jpg/png format.');
			return;
		} else {
			setError('');
		}
		//make API call to server to load the image through form
		try {
			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: `${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
				},
			});
			const formData = new FormData();
			formData.append('file', file);
			await axios
				.post(`${process.env.REACT_APP_SERVER_URL}/pictures`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${accessToken}`,
					},
				})
				.then(() => {
					setMessage(`${file.name} uploaded`);
				});
			/* .then(window.location.reload()); */
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	const btnStyling = {
		marginBottom: '3vh',
		width: '100%',
		transition: '0s 0.1s',
		'&:active': {
			backgroundColor: '#121212',
			transition: '0s',
			border: '1px solid #834bff',
		},
	};

	if (isAuthenticated)
		return (
			<>
				<input
					id='imageInput'
					type='file'
					onChange={handleUpload}
					style={{ display: 'none' }}
				></input>
				<Button
					className='button'
					color='secondary'
					variant='contained'
					as='label'
					htmlFor='imageInput'
					sx={btnStyling}
				>
					Upload Picture
				</Button>
				<AlertMsg message={message} error={error} />
			</>
		);
}
