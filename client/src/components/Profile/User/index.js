import './index.css';
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import UpdateProfile from './Update';

export default function UserComponent() {
	const { user, isAuthenticated } = useAuth0();
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

	const handleClick = () => {
		setMenuOpen(true);
	};

	const handleClose = () => {
		setMenuOpen(false);
	};

	if (isAuthenticated) {
		return (
			<>
				<Box onClick={handleClick} size={width} id='userBox'>
					<img className='picture' alt='profilePicture' src={user.picture} />
					<div className='details'>
						{user.name !== user.email && <h3 className='name'>{user.name}</h3>}
						{user.name === user.email && <h3 className='name'>{user.nickname}</h3>}
						<h3 className='email'>{user.email}</h3>
					</div>
				</Box>
				{isMenuOpen && <UpdateProfile onClose={handleClose} />}
			</>
		);
	} else {
		return <h3>Please log in to view your profile and personal files.</h3>;
	}
}
