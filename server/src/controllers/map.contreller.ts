const { AddressValidationClient } = require('@googlemaps/addressvalidation').v1;

export type AddressProps = {
	address: string;
}

const addressvalidationClient = new AddressValidationClient();

async function addressValidation({ address }: AddressProps) {
	try {
		const request = {
			address: {
				regionCode: 'BR',
				addressLines: [address],
			},
		};
		const response = await addressvalidationClient.validateAddress(request);
		const result = {
			formattedAddress: response[0].result.address.formattedAddress,
			latitude: response[0].result.geocode.location.latitude,
			longitude: response[0].result.geocode.location.longitude
		}
		console.log(result);
		return result;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export default addressValidation;