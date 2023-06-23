import './index.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { ButtonGroup, Button } from '@mui/material';

const Navbar = () => {
	const { isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		return (
			<div className='container'>
				<ButtonGroup size='large' color='secondary' aria-label='large button group'>
					<Button href='/'>Home</Button>
					<Button href='/profile'>Profile</Button>
					<Button href='/builder'>Builder</Button>
					<Button href='/contact'>Contact</Button>
				</ButtonGroup>
				<LogoutButton className='Login' />
			</div>
		);
	} else {
		return (
			<div className='container'>
				<ButtonGroup size='large' color='secondary' aria-label='large button group'>
					<Button href='/'>Home</Button>
					<Button href='/profile'>Profile</Button>
					<Button href='/builder'>Builder</Button>
					<Button href='/contact'>Contact</Button>
				</ButtonGroup>
				<LoginButton className='Logout' />
			</div>
		);
	}
};
export default Navbar;
