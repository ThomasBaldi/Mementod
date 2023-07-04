import React, { useState } from 'react';
import './index.css';
import { Menu, MenuItem } from '@mui/material';
import AlertMsg from '../../../../utils/AlertMsg';
import { axiosCalls } from '../../../../utils/AxiosCalls';
import { useAuth0 } from '@auth0/auth0-react';
import reload from '../../../../utils/WindowsReload';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function UpdateProfile({ onClose }) {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { getAccessTokenSilently } = useAuth0();

	const handleProfilePicture = async (e) => {
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
			const updatedFileName = `profile.${file.type.split('/').pop()}`;
			const updatedFile = new File([file], updatedFileName, { type: file.type });
			const formData = new FormData();
			formData.append('file', updatedFile);
			await axiosCalls('post', formData, getAccessTokenSilently).then(() => {
				setMessage(updatedFile.name);
				reload();
			});
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	const handleNameEdit = async (e) => {
		e.preventDefault();
		console.log('CHANGE NAME!!');
	};

	return (
		<>
			<div className='menu-overlay'>
				<Menu className='menu' keepMounted open='true'>
					<MenuItem className='item' as='label' htmlFor='profileInput'>
						Change Profile Picture
					</MenuItem>
					<MenuItem className='item' onClick={handleNameEdit}>
						Change Username
					</MenuItem>
					<input
						id='profileInput'
						type='file'
						onChange={handleProfilePicture}
						style={{ display: 'none' }}
					></input>
					<MenuItem className='close-button' onClick={onClose}>
						Close Menu
					</MenuItem>
				</Menu>

				<AlertMsg message={message} error={error} />
			</div>
		</>
	);
}
