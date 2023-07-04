import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AlertMsg from '../../../../utils/AlertMsg';
import { axiosCalls } from '../../../../utils/AxiosCalls';
import reload from '../../../../utils/WindowsReload';

export default function DeleteImage({ image }) {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleConfirm = async (e) => {
		e.preventDefault();
		try {
			await axiosCalls('delete', image, getAccessTokenSilently).then(() => {
				setMessage(`${image} deleted!`);
				setOpen(false);
				reload();
			});
		} catch (err) {
			setError(err.message);
			console.log(err);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	if (isAuthenticated)
		return (
			<>
				<Button
					onClick={handleClickOpen}
					className='deleteBtn'
					style={{
						position: 'absolute',
						bottom: '10px',
						right: '5px',
						background: '#121212',
					}}
					color='error'
					variant='outlined'
				>
					<DeleteIcon />
				</Button>
				<Dialog open={open} onClose={handleCancel}>
					<DialogTitle>Delete Confirmation</DialogTitle>
					<DialogContent>
						<DialogContentText>Are you sure you want to delete {image}?</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancel} color='secondary' variant='contained'>
							Cancel
						</Button>
						<Button onClick={handleConfirm} color='secondary' variant='contained' autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
				<AlertMsg message={message} error={error} />
			</>
		);
}
