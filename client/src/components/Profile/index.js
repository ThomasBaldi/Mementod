import UserComponent from './User/index';
import ShowUserImages from './Image/GetImages';
import FileUpload from './Image/UploadImage';
import { txtStyling } from '../../utils/Styling';

const Profile = () => {
	return (
		<>
			<div className='container' id='profileContainer'>
				<UserComponent />
				<h3 style={txtStyling}>A COLLECTION OF ALL YOUR UPLOADED PICTURES</h3>
				<FileUpload />
				<ShowUserImages />
			</div>
		</>
	);
};

export default Profile;
