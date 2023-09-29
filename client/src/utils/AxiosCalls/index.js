import axios from 'axios';

export const axiosCalls = async (method, data, getAccessTokenSilently) => {
	const accessToken = await getAccessTokenSilently({
		authorizationParams: {
			audience: `${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
		},
	});

	const axiosConfig = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	let response;

	switch (method) {
		case 'get':
			response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pictures`, axiosConfig);
			break;
		case 'getProfile':
			response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/pictures/profile`,
				axiosConfig
			);
			break;
		case 'getAlbumList':
			response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/pictures/albums`,
				axiosConfig
			);
			break;
		case 'post':
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/pictures`, data, axiosConfig);
			break;
		case 'delete':
			await axios.delete(`${process.env.REACT_APP_SERVER_URL}/pictures/${data}`, axiosConfig);
			break;
		default:
			throw new Error(`Invalid method: ${method}`);
	}

	return response;
};
