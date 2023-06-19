import './index.css';
import React, { useState } from 'react';
import axios from 'axios';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function FileUpload() {
	const [error, setError] = useState('');
	const [message, setMNessage] = useState('');
	const handleUpload = async (e) => {
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
		//make API call to load the image through form
		try {
			const formData = new FormData();
			formData.append('file', file);
			await axios
				.post('/pictures', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
				.then((res) => {
					if (res.status === 200) setMNessage(`${file.name} uploaded`);
				});
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
