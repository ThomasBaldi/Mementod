import './App.css';
import { Routes, Route } from 'react-router-dom';
/* import Layout from './components/Layout'; */
import Home from './components/Home';
import Profile from './components/Profile';
/* import Builder from './components/Builder';
import Contact from './components/Contact'; */

function App() {
	return (
		<Routes>
			<Route to='/' /*  element={<Layout />} */>
				<Route index element={<Home />} />
				<Route path='profile' element={<Profile />} />
				{/* 	<Route path='profile' element={<Builder />} />
				<Route path='contact' element={<Contact />} /> */}
			</Route>
		</Routes>
	);
}

export default App;
