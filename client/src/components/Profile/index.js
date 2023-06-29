import UserComponent from './User/index';
import FileUpload from '../UploadImage';
import ShowUserImages from '../GetImages';

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
