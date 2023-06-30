import UserComponent from './User/index';
import ShowUserImages from '../AxiosCalls/GetImages';
import FileUpload from '../AxiosCalls/UploadImage';

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
