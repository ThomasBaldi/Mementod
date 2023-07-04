import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

export default function UserComponent() {
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

	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isAuthenticated) {
		return (
			<>
				<Box size={width} id='userBox'>
					<img className='picture' alt='profilePicture' src={user.picture} />
					<div className='details'>
						<h3 className='name'>{user.nickname}</h3>
						<h3 className='email'>{user.email}</h3>
					</div>
				</Box>
			</>
		);
	} else {
		return <h3>Please log in to view your profile and personal files.</h3>;
	}
}
