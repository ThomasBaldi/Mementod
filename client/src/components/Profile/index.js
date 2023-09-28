import UserComponent from './User/index';
import ShowUserImages from './Image/GetImages';
import FileUpload from './Image/UploadImage';

const txtStyling = {
	marginBottom: '3vh',
	paddingLeft: '2vw',
	paddingRight: '2vw',
	color: '#121212',
	borderRadius: '5px',
	textAlign: 'center',
	backgroundColor: '#7c4dff',
};

const Profile = () => {
	return (
		<>
			<div className='container' id='profileContainer'>
				<UserComponent />
				<h2 style={txtStyling}>A COLLECTION OF ALL YOUR UPLOADED PICTURES</h2>
				<FileUpload />
				<ShowUserImages />
			</div>
		</>
	);
};

export default Profile;
