import './index.css';

export default function UserComponent(props) {
	const displayUser = (props) => {
		const { user } = props;

		if (user !== undefined) {
			return (
				<>
					<h2 className='user'>{user.Username}</h2>
					<h3 className='name'>Name: {user.Name}</h3>
					<h3 className='email'>Email: {user.Email}</h3>
					<img className='picture' alt='profilePicture' src={user.Picture} />
				</>
			);
		} else {
			return <h3>Guest user. Login to see your user profile.</h3>;
		}
	};
	return <>{displayUser(props)}</>;
}
