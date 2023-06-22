import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
	return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
			cacheLocation='localstorage'
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: `${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
			}}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithHistory;
