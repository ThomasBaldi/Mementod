import UserComponent from './User/index';
import FileUpload from '../File';
import ShowUserImages from './Images';

const Profile = () => {
	return (
		<>
			<div className='container' id='profileContainer'>
				<UserComponent />
				<FileUpload className='upload' />
				<ShowUserImages />
			</div>
		</>
	);
};

export default Profile;
