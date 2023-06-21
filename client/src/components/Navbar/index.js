import './index.css';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
	const { user, isAuthenticated } = useAuth0();
	if (isAuthenticated) {
		return (
			<div>
				<div>Welcome back {user.name}! </div>
				<button>
					<Link to='/'>Home</Link>
				</button>
				<button>
					<Link to='/profile'>Profile</Link>
				</button>
				<button>
					<Link to='/builder'>Builder</Link>
				</button>
				<button>
					<Link to='/contact'>Contact</Link>
				</button>
				<LogoutButton />
			</div>
		);
	} else {
		return (
			<div>
				<button>
					<Link to='/'>Home</Link>
				</button>
				<button>
					<Link to='/profile'>Profile</Link>
				</button>
				<button>
					<Link to='/builder'>Builder</Link>
				</button>
				<button>
					<Link to='/contact'>Contact</Link>
				</button>
				<LoginButton />
			</div>
		);
	}
};
export default Navbar;
