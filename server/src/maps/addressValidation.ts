/**
 * This snippet has been automatically generated and should be regarded as a code template only.
 * It will require modifications to work.
 * It may require correct/in-range values for request initialization.
 * TODO(developer): Uncomment these variables before running the sample.
 */
/**
 *  Required. The address being validated. Unformatted addresses should be
 *  submitted via `address_lines` google.type.PostalAddress.address_lines.
 *  The total length of the fields in this input must not exceed 300
 *  characters.
 *  Supported regions can be found in the
 *  FAQ (https://developers.google.com/maps/documentation/address-validation/faq#which_regions_are_currently_supported).
 *  The language_code google.type.PostalAddress.language_code  value in the
 *  input address is reserved for future uses and is ignored today. The
 *  validated address result will be populated based on the preferred language
 *  for the given address, as identified by the system.
 *  The Address Validation API ignores the values in
 *  recipients google.type.PostalAddress.recipients  and
 *  organization google.type.PostalAddress.organization. Any values in those
 *  fields will be discarded and not returned. Please do not set them.
 */
// const address = {}
/**
 *  This field must be empty for the first address validation request. If
 *  more requests are necessary to fully validate a single address (for
 *  example if the changes the user makes after the initial validation need to
 *  be re-validated), then each followup request must populate this field with
 *  the
 *  response_id google.maps.addressvalidation.v1.ValidateAddressResponse.response_id
 *  from the very first response in the validation sequence.
 */
// const previousResponseId = 'abc123'
/**
 *  Enables USPS CASS compatible mode. This affects _only_ the
 *  google.maps.addressvalidation.v1.ValidationResult.usps_data  field of
 *  google.maps.addressvalidation.v1.ValidationResult. Note: for USPS CASS
 *  enabled requests for addresses in Puerto Rico, a
 *  google.type.PostalAddress.region_code  of the `address` must be provided
 *  as "PR", or an google.type.PostalAddress.administrative_area  of the
 *  `address` must be provided as "Puerto Rico" (case-insensitive) or "PR".
 *  It's recommended to use a componentized `address`, or alternatively specify
 *  at least two google.type.PostalAddress.address_lines  where the first line
 *  contains the street number and name and the second line contains the city,
 *  state, and zip code.
 */
// const enableUspsCass = true

import { AddressProps } from "../controllers/map.contreller";

// Imports the Addressvalidation library
const {AddressValidationClient} = require('@googlemaps/addressvalidation').v1;

// Instantiates a client
const addressvalidationClient = new AddressValidationClient();

async function callValidateAddress(request: AddressProps) {
  // Construct request
  // const request = {
  //   address: {
  //     regionCode: 'BR',
  //     addressLines: ['Estrada Particular, 65', 'Jardim Paraiso'],
  //   },
  // };

  // Run request
  const response = await addressvalidationClient.validateAddress(request);
  return response;
}

export default callValidateAddress;