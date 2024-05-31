const { AddressValidationClient } = require('@googlemaps/addressvalidation').v1;

export type AddressProps = {
	rua: string,
	bairro: string
}

const addressvalidationClient = new AddressValidationClient();

async function addressValidation({ bairro, rua }: AddressProps) {
	const request = {
		address: {
			regionCode: 'BR',
			addressLines: [rua, bairro],
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
}

export default addressValidation;