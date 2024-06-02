import axios from 'axios';

let ipAddress = '192.168.0.16';
// let ipAddress = '192.168.1.97';

const api = axios.create({
	baseURL: `http://${ipAddress}:4000`,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});

export default api;