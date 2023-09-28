import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { ButtonGroup, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/mementod.jpg';

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
			<div className='navbarContainer'>
				<img className='logo' src={logo} alt='Mementod Logo' />
				<ButtonGroup
					className='btnGroup'
					size={size}
					color='secondary'
					aria-label='large button group'
					orientation='vertical'
				>
					<Button className='btn' href='/'>
						Home
					</Button>
					<Button className='btn' href='/profile'>
						Profile
					</Button>
					<Button className='btn' href='/builder'>
						Albums
					</Button>
					<Button className='btn' href='/contact'>
						Contact
					</Button>
					<br />
					<LogoutButton />
				</ButtonGroup>
			</div>
		);
	} else {
		return (
			<div className='navbarContainer'>
				<img className='logo' src={logo} alt='Mementod Logo' />
				<ButtonGroup
					className='btnGroup'
					size={size}
					color='secondary'
					aria-label='large button group'
					orientation='vertical'
				>
					<Button className='btn' href='/'>
						Home
					</Button>
					<Button className='btn' href='/profile'>
						Profile
					</Button>
					<Button className='btn' href='/builder'>
						Builder
					</Button>
					<Button className='btn' href='/contact'>
						Contact
					</Button>
					<br />
					<LoginButton />
				</ButtonGroup>
			</div>
		);
	}
};
export default Navbar;
