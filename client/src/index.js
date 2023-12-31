import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/Auth/auth0-provider';
import App from './App';
import '@fontsource/roboto/300.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Auth0ProviderWithHistory>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<App />
			</BrowserRouter>
		</Auth0ProviderWithHistory>
	</React.StrictMode>
);
