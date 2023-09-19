import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import AlertMsg from '../../../../utils/AlertMsg';
import { axiosCalls } from '../../../../utils/AxiosCalls';
import reload from '../../../../utils/WindowsReload';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function FileUpload() {
	const [albumName, setAlbumName] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const handleAlbumNameChange = (e) => {
		setAlbumName(e.target.value);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		if (!validFileTypes.find((type) => type === file.type)) {
			setError('File must be jpeg/jpg/png format.');
			return;
		} else {
			setError('');
		}
		try {
			const formData = new FormData();
			formData.append('file', file);
			if (albumName !== '') {
				formData.append('album', albumName);
			}
			await axiosCalls('post', formData, getAccessTokenSilently).then(() => {
				setMessage(`${file.name} uploaded`);
				reload();
			});
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
			border: '1px solid #7c4dff',
			color: '#7c4dff',
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
				{/*  */}
				<input
					id='albumNameInput'
					type='text'
					placeholder='Album Name'
					value={albumName} // Bind the albumName state to the input value
					onChange={handleAlbumNameChange}
				/>
				{/*  */}

				<label htmlFor='imageInput' style={{ width: '100%' }}>
					<Button
						className='button'
						sx={btnStyling}
						color='secondary'
						variant='contained'
						component='span'
					>
						Upload Picture
					</Button>
				</label>

				<AlertMsg message={message} error={error} />
			</>
		);
}
