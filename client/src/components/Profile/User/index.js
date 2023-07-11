import './index.css';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import UpdateProfile from './Update';
import { axiosCalls } from '../../../utils/AxiosCalls';
import AlertMsg from '../../../utils/AlertMsg';

export default function UserComponent() {
	const [error, setError] = useState('');
	const [profilePicture, setProfile] = useState(null);
	const [username, setUsername] = useState('');
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [isMenuOpen, setMenuOpen] = useState(false);

	const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
	const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

	let width = 'lg';

	if (isSmScreen) {
		width = 'sm';
	} else if (isMdScreen) {
		width = 'md';
	} else if (isLgScreen) {
		width = 'lg';
	}
	useEffect(() => {
		const getProfile = async () => {
			try {
				const response = await axiosCalls('getProfile', undefined, getAccessTokenSilently);
				if (response.data !== undefined) setProfile(response.data.src);
			} catch (err) {
				setError(err.message);
				console.log(err);
			}
		};
		getProfile();
		// eslint-disable-next-line
	}, []);

	const handleClick = () => {
		setMenuOpen(true);
	};

	const handleClose = () => {
		setMenuOpen(false);
	};

	const handleUsername = (newUsername) => {
		setUsername(newUsername);
		localStorage.setItem(user.email, newUsername);
	};

	useEffect(() => {
		// Load the username from local storage
		if (user && user.email) {
			const storedUsername = localStorage.getItem(user.email);
			if (storedUsername) {
				setUsername(storedUsername);
			}
		}
	}, [user]);

	if (isAuthenticated) {
		return (
			<>
				<Box onClick={handleClick} size={width} id='userBox'>
					{profilePicture ? (
						<img className='picture' alt='profilePicture' src={profilePicture} />
					) : (
						<img className='picture' alt='profilePicture' src={user.picture} />
					)}
					<div className='details'>
						{user.name !== user.email && (
							<h3 className='name'>{username !== '' ? username : user.name}</h3>
						)}
						{user.name === user.email && (
							<h3 className='name'>{username !== '' ? username : user.nickname}</h3>
						)}

						<h3 className='email'>{user.email}</h3>
					</div>
				</Box>
				{isMenuOpen && <UpdateProfile onClose={handleClose} onUsernameChange={handleUsername} />}
				<AlertMsg error={error} />
			</>
		);
	} else {
		return <h3>Please log in to view your profile and personal files.</h3>;
	}
}
