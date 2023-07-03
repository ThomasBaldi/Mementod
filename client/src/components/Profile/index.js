import UserComponent from './User/index';
import ShowUserImages from './Image/GetImages';
import FileUpload from './Image/UploadImage';

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
