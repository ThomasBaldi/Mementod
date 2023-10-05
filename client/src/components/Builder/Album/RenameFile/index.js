import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';

function RenameFileDialog({ open, onClose, onSubmit, label }) {
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
					label={label}
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
