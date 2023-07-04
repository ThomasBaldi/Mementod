import Alert from '@mui/material/Alert';
import React, { useState } from 'react';

export default function AlertMsg({ message, error }) {
	const [showAlert, setShowAlert] = useState(true);

	const alertStyling = {
		position: 'fixed',
		bottom: '0',
		left: '0',
		fontSize: '3vh',
		display: 'flex',
		alignItems: 'center',
		zIndex: '1',
	};

	const handleClose = () => {
		setShowAlert(false);
	};

	return (
		<>
			{error && showAlert && (
				<Alert sx={alertStyling} className='alert' severity='error' onClose={handleClose}>
					{error}
				</Alert>
			)}
			{message && showAlert && (
				<Alert sx={alertStyling} className='alert' severity='success' onClose={handleClose}>
					{message}
				</Alert>
			)}
		</>
	);
}
