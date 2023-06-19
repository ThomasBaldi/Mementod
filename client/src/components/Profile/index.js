import './index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserComponent from './User/index';
import FileUpload from '../File';

const Profile = () => {
	const [user, getUser] = useState('');

	useEffect(() => {
		getProfile();
	}, []);
	const getProfile = () => {
		axios
			.get('/profile')
			.then((res) => {
				const userProfile = res.data.userProfile;
				getUser(userProfile);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<UserComponent user={user} />
			<FileUpload />
		</>
	);
};

export default Profile;
