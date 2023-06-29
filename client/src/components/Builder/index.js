import FileUpload from '../UploadImage';
import ShowUserImages from '../GetImages';

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
