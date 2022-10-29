import { GeoAdministrativeHierarchy } from "../GeoLocation";
import {
  AddressComponent,
  PlaceType2,
} from "@googlemaps/google-maps-services-js";
import { find } from "lodash";

/**
 * Maps a ...
 */
export const mapGooglemapsAddressComponents2GeoAdministrativeHierarchy = (
  googlemapsAddressComponents: AddressComponent[]
): GeoAdministrativeHierarchy => {
  const politicalAddressComponents: AddressComponent[] =
    googlemapsAddressComponents.filter(
      (item) =>
        item.types.includes(PlaceType2.political) ||
        item.types.includes(PlaceType2.postal_code)
    );

  const country: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return o.types.includes(PlaceType2.country);
    }
  );

  const state: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return o.types.includes(PlaceType2.administrative_area_level_1);
    }
  );

  const county: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return o.types.includes(PlaceType2.administrative_area_level_3);
    }
  );

  const municipality: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return o.types.includes(PlaceType2.locality);
    }
  );

  const zip: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return o.types.includes(PlaceType2.postal_code);
    }
  );

  const community: AddressComponent | undefined = find(
    politicalAddressComponents,
    function (o) {
      return (
        o.types.includes(PlaceType2.sublocality) ||
        o.types.includes(PlaceType2.sublocality_level_1) ||
        o.types.includes(PlaceType2.locality)
      );
    }
  );

  const result: GeoAdministrativeHierarchy = {
    country: country
      ? {
          geonameId: null,
          name: country.long_name,
          ISO3166: country.short_name,
        }
      : undefined,
    state: state
      ? {
          geonameId: null,
          name: state.long_name,
          ISO3166: state.short_name,
        }
      : undefined,
    county: county
      ? {
          geonameId: null,
          name: county.long_name,
        }
      : undefined,
    municipality: municipality
      ? {
          geonameId: null,
          name: municipality.long_name,
          zip: zip?.long_name || null,
          wikidataId: null,
        }
      : undefined,
    community: community
      ? {
          geonameId: null,
          name: community.long_name || community?.short_name,
          wikidataId: null,
        }
      : undefined,
    place: undefined,
  };

  return result;
};
