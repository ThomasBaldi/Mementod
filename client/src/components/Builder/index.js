import ShowUserImages from '../AxiosCalls/GetImages';
import FileUpload from '../AxiosCalls/UploadImage';

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
