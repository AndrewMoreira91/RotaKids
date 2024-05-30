import * as NetWork from 'expo-network';

const getIp = () => {
	console.log("Getting IP address...");
	const ipAddress = NetWork.getIpAddressAsync();
	return ipAddress;
}

export default getIp;