import ShowUserImages from '../Profile/Image/GetImages';
import FileUpload from '../Profile/Image/UploadImage';

const Builder = () => {
	return (
		<>
			<div className='container' id='builderContainer'>
				<FileUpload className='upload' />
				<ShowUserImages />
			</div>
		</>
	);
};

export default Builder;
