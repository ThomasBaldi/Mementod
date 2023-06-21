import './index.css';
import UserComponent from './User/index';
import FileUpload from '../File';
import Navbar from '../Navbar';

const Profile = () => {
	return (
		<>
			<Navbar />
			<UserComponent />
			<FileUpload />
		</>
	);
};

export default Profile;
