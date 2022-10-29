import { Place } from "@googlemaps/google-maps-services-js";
import { GeoAdministrativeHierarchy, GeoLocation } from "../GeoLocation";
import { googlePlaceToGeoPosition } from "../transformers/googlePlaceToGeoPosition";
import { evaluateLocalPlaceName } from "./evaluateLocalPlaceName";

/**
 * merge geonames.org hierarchy and google place data into one geo location object, prefer place data from google places api and geo hierarchy from geonames.org
 * @param geonamesHierarchy
 * @param googlePlaceHierarchy
 */
export const composeGeocodedGeoLocation = (
  location: string,
  googlePlace: Place,
  geonamesHierarchy: GeoAdministrativeHierarchy,
  googlePlaceHierarchy: GeoAdministrativeHierarchy
): GeoLocation => {
  //
  let geocodedLocation: GeoLocation = {
    geonamesId: geonamesHierarchy?.place?.geonameId || null,
    googlePlaceId: googlePlace.place_id as string,
    wikidataId: null, // TODO: add from geonames query
    googleMyBusinessId: null, // TODO: maybe fetch my business id later?
    slug: null, // TODO: maybe add later, has to be different for each type of location
    name: googlePlace.name || (location as string),
    localName: evaluateLocalPlaceName(
      googlePlaceHierarchy?.place?.name as string,
      geonamesHierarchy?.community?.name as string
    ),
    geo: {
      point: googlePlaceToGeoPosition(googlePlace).point,
      box: googlePlaceToGeoPosition(googlePlace).box,
    },
    location: location as string,
    address: googlePlace.formatted_address,
    hierarchy: geonamesHierarchy,
  };

  return geocodedLocation;
};
