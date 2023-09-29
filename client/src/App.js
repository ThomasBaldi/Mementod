import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import Builder from './components/Builder';
import { useEffect } from 'react';
/* import Contact from './components/Contact'; */

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		secondary: {
			light: '#5635b2',
			main: '#7c4dff',
			dark: '#9670ff',
			contrastText: '#fff',
		},
		success: {
			light: '#52b202',
			main: '#76ff03',
			dark: '#91ff35',
			contrastText: '#000',
		},
	},
});

function App() {
	//avoid resizeObserver from triggering
	useEffect(() => {
		window.addEventListener('error', (e) => {
			if (
				e.message === 'ResizeObserver loop limit exceeded' ||
				'ResizeObserver loop completed with undelivered notifications.'
			) {
				const resizeObserverErrDiv = document.getElementById(
					'webpack-dev-server-client-overlay-div'
				);
				const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
				if (resizeObserverErr) {
					resizeObserverErr.setAttribute('style', 'display: none');
				}
				if (resizeObserverErrDiv) {
					resizeObserverErrDiv.setAttribute('style', 'display: none');
				}
			}
		});
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Routes>
				<Route to='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='profile' element={<Profile />} />
					<Route path='builder' element={<Builder />} />
					{/* <Route path='contact' element={<Contact />} /> */}
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
