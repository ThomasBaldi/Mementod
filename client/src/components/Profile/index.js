import './index.css';
import UserComponent from './User/index';
import FileUpload from '../File';
import Navbar from '../Navbar';
import ShowUserImages from './Images';

const Profile = () => {
	return (
		<>
			<Navbar />
			<div className='container' id='profileContainer'>
				<UserComponent />
				<FileUpload className='upload' />
				<ShowUserImages />
			</div>
		</>
	);
};

export default Profile;
