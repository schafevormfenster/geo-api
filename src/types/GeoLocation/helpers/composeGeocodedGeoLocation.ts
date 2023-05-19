import { Place } from "@googlemaps/google-maps-services-js";
import {
  GeoAdministrativeHierarchy,
  GeoLocation,
  GeoLocationType,
} from "../GeoLocation";
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
  // evaluate location type
  let type: GeoLocationType | null;
  if (geonamesHierarchy?.place) {
    type = "place";
  } else if (geonamesHierarchy?.community) {
    type = "community";
  } else if (geonamesHierarchy?.municipality) {
    type = "municipality";
  } else if (geonamesHierarchy?.county) {
    type = "county";
  } else if (geonamesHierarchy?.state) {
    type = "state";
  } else if (geonamesHierarchy?.country) {
    type = "country";
  } else {
    type = null;
  }

  //
  let geocodedLocation: GeoLocation = {
    geonamesId:
      geonamesHierarchy?.place?.geonameId ||
      geonamesHierarchy?.community?.geonameId ||
      null,
    googlePlaceId: googlePlace.place_id as string,
    wikidataId:
      geonamesHierarchy?.place?.wikidataId ||
      geonamesHierarchy?.community?.wikidataId ||
      null,
    googleMyBusinessId: null, // TODO: maybe fetch my business id later?
    name: googlePlace.name || (location as string),
    localName: evaluateLocalPlaceName(
      googlePlaceHierarchy?.place?.name as string,
      geonamesHierarchy?.community?.name as string
    ),
    type: type || undefined,
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
