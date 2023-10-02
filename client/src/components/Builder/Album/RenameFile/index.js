import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';

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
					fullWidth
					value={newFileName}
					onChange={handleInputChange}
				/>
			</DialogContent>
			<Button onClick={handleSubmit} variant='contained' color='primary'>
				Rename
			</Button>
		</Dialog>
	);
}

export default RenameFileDialog;
