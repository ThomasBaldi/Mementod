import React, { useState } from 'react';
import './index.css';
import { Menu, MenuItem, TextField, Button } from '@mui/material';
import AlertMsg from '../../../../utils/AlertMsg';
import { axiosCalls } from '../../../../utils/AxiosCalls';
import { useAuth0 } from '@auth0/auth0-react';
import reload from '../../../../utils/WindowsReload';

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function UpdateProfile({ onClose, onUsernameChange }) {
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
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
			//if not social user profile image exists, delete it
			const response = await axiosCalls('getProfile', undefined, getAccessTokenSilently);
			console.log(response);
			if (response !== undefined) {
				await axiosCalls('delete', response.data.name, getAccessTokenSilently);
			}
			//then set the new one
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

	const handleButtonClick = () => {
		if (showInput === false) setShowInput(true);
		else setShowInput(false);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSubmit = async () => {
		onUsernameChange(inputValue);
		setShowInput(false);
	};

	return (
		<>
			<div className='menu-overlay'>
				<Menu className='menu' keepMounted open='true'>
					<MenuItem className='item' as='label' htmlFor='profileInput'>
						Change Profile Picture
					</MenuItem>
					<input
						id='profileInput'
						type='file'
						onChange={handleProfilePicture}
						style={{ display: 'none' }}
					></input>
					<MenuItem className='item' onClick={handleButtonClick}>
						Change Username
					</MenuItem>
					{showInput && (
						<MenuItem onKeyDown={(e) => e.stopPropagation()}>
							<div style={{ display: 'flex', flexDirection: 'row', margin: '0' }}>
								<TextField color='secondary' value={inputValue} onChange={handleInputChange} />
								<Button color='secondary' variant='contained' onClick={handleSubmit}>
									Submit
								</Button>
							</div>
						</MenuItem>
					)}
					<MenuItem className='close-button' onClick={onClose}>
						Close Menu
					</MenuItem>
				</Menu>
				<AlertMsg message={message} error={error} />
			</div>
		</>
	);
}
