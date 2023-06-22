import './index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function FileUpload() {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { getAccessTokenSilently } = useAuth0();

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
				.then(setMessage(`${file.name} uploaded`));
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	return (
		<>
			<input
				id='imageInput'
				type='file'
				onChange={handleUpload}
				style={{ display: 'none' }}
			></input>
			<button>
				<label as='label' htmlFor='imageInput'>
					Upload Picture
				</label>
			</button>
			{error && <p style={{ color: '#FF0000' }}>{error}</p>}
			{message && <p style={{ color: '##00FF00' }}>{message}</p>}
		</>
	);
}
