import './index.css';
/* import React, { useEffect, useState } from 'react'; */
import { useAuth0 } from '@auth0/auth0-react';

export default function UserComponent() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isAuthenticated) {
		return (
			<>
				<div>
					<h3 className='name'>Name: {user.name}</h3>
					<h3 className='email'>Email: {user.email}</h3>
				</div>
				<img className='picture' alt='profilePicture' src={user.picture} />
			</>
		);
	} else {
		return <h3>Guest user. Please log in to view your profile.</h3>;
	}
}
