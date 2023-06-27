import './index.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { ButtonGroup, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
	const { isAuthenticated } = useAuth0();

	const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
	const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

	let size = 'large';

	if (isSmScreen) {
		size = 'small';
	} else if (isMdScreen) {
		size = 'medium';
	} else if (isLgScreen) {
		size = 'large';
	}

	if (isAuthenticated) {
		return (
			<div className='container' id='navbarContainer'>
				<ButtonGroup
					className='btnGroup'
					size={size}
					color='secondary'
					aria-label='large button group'
				>
					<Button href='/'>Home</Button>
					<Button href='/profile'>Profile</Button>
					<Button href='/builder'>Builder</Button>
					<Button href='/contact'>Contact</Button>
				</ButtonGroup>
				<Button variant='text' disabled></Button>
				<LogoutButton />
			</div>
		);
	} else {
		return (
			<div className='container'>
				<ButtonGroup
					className='btnGroup'
					size={size}
					color='secondary'
					aria-label='large button group'
				>
					<Button href='/'>Home</Button>
					<Button href='/profile'>Profile</Button>
					<Button href='/builder'>Builder</Button>
					<Button href='/contact'>Contact</Button>
				</ButtonGroup>
				<Button variant='text' disabled></Button>
				<LoginButton />
			</div>
		);
	}
};
export default Navbar;
