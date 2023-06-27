import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@mui/material';

export default function UserComponent() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isAuthenticated) {
		return (
			<>
				<Container maxWidth='lg' id='userContainer'>
					<div className='details'>
						<h3 className='name'>{user.name}</h3>
						<h3 className='email'>{user.email}</h3>
					</div>
					<img className='picture' alt='profilePicture' src={user.picture} />
				</Container>
			</>
		);
	} else {
		return <h3>Guest user. Please log in to view your profile.</h3>;
	}
}
