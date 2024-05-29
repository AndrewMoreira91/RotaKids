import axios from 'axios';

const api = axios.create({
	baseURL: 'http://192.168.0.11:4000',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});

export default api;