import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import { cardBtnStyling } from '../../../../utils/Styling';

function RenameFileDialog({ open, onClose, onSubmit }) {
	const [newFileName, setNewFileName] = useState('');

	const handleInputChange = (event) => {
		setNewFileName(event.target.value);
	};

	const handleSubmit = () => {
		onSubmit(newFileName);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent>
				<TextField
					label='New File Name'
					variant='outlined'
					color='secondary'
					focused
					fullWidth
					value={newFileName}
					onChange={handleInputChange}
				/>
			</DialogContent>
			<Button color='secondary' onClick={handleSubmit} variant='contained'>
				Rename
			</Button>
		</Dialog>
	);
}

export default RenameFileDialog;
