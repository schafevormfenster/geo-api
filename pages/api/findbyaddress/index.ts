import { AddressComponent, Place } from "@googlemaps/google-maps-services-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { geonamesDetermineHierarchyCached } from "../../../src/apiclients/geonames/geonamesDetermineHierarchyCached";
import { buildGeonamesDetermineHierarchyQuery } from "../../../src/apiclients/geonames/helpers/buildGeonamesDetermineHierarchyQuery";
import { googleMapsFindPlaceFromTextCached } from "../../../src/apiclients/googlemaps/googleMapsFindPlaceFromTextCached";
import { googleMapsPlaceDetailsCached } from "../../../src/apiclients/googlemaps/googleMapsPlaceDetailsCached";
import {
  GeoAdministrativeHierarchy,
  GeoLocation,
} from "../../../src/types/GeoLocation/GeoLocation";
import { composeGeocodedGeoLocation } from "../../../src/types/GeoLocation/helpers/composeGeocodedGeoLocation";
import { evaluateLocalPlaceName } from "../../../src/types/GeoLocation/helpers/evaluateLocalPlaceName";

import { googlePlaceToGeoPosition } from "../../../src/types/GeoLocation/transformers/googlePlaceToGeoPosition";
import { mapGooglemapsAddressComponents2GeoAdministrativeHierarchy } from "../../../src/types/GeoLocation/transformers/mapGooglemapsAddressComponents2GeoAdministrativeHierarchy";

/**
 * @swagger
 * /api/findbyaddress/?location={location}:
 *   get:
 *     summary: Return a geolocation for a given address string.
 *     description: Based on the address string this api starts a search with google maps. Additionally the data is enhanced by geonames.org structures.
 *     tags:
 *       - Geocoding
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: location
 *         description: Address or location as a string, e.g. "Gemeindehaus Schlatkow, Deutschland".
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Typed Geolocation.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeoLocation>
) {
  const { location } = req.query;

  // TODO: check auth header by middleware

  if (!location)
    return res
      .status(400)
      .end(
        "Missing location parameter. Please provide an location as url encoded string."
      );

  if (location.length < 3)
    return res
      .status(400)
      .end(
        "Too short location parameter. Please provide an location as url encoded string with some more characters."
      );

  // search at google maps and fetch place details
  const googlePlaceRef: Place | null = await googleMapsFindPlaceFromTextCached(
    <string>location
  );

  if (!googlePlaceRef)
    return res
      .status(204)
      .end("Could not find any matching geo location at googlemaps.");

  const googlePlace: Place | null = await googleMapsPlaceDetailsCached(
    <string>googlePlaceRef.place_id
  );

  if (!googlePlace)
    return res
      .status(204)
      .end(
        `Could not find a proper geo location at googlemaps for place id '${googlePlaceRef.place_id}'.`
      );

  // decompose hierarchy
  const googlePlaceHierarchy: GeoAdministrativeHierarchy = {
    ...mapGooglemapsAddressComponents2GeoAdministrativeHierarchy(
      googlePlace.address_components as AddressComponent[]
    ),
    place: {
      name: <string>googlePlace.name,
      geonameId: null,
      code: null,
      class: null,
      wikidataId: null,
    },
  };

  // determine geonames.org references and hierarchy
  const geonamesHierarchy: GeoAdministrativeHierarchy | undefined =
    (await geonamesDetermineHierarchyCached(
      buildGeonamesDetermineHierarchyQuery(googlePlaceHierarchy)
    )) || undefined;

  // merge geonames.org hierarchy and google place data into one geo location
  const geocodedLocation: GeoLocation = composeGeocodedGeoLocation(
    location as string, // keep original location
    googlePlace as Place,
    geonamesHierarchy as GeoAdministrativeHierarchy,
    googlePlaceHierarchy as GeoAdministrativeHierarchy
  );

  // TODO: add cache header by middleware

  return res.status(200).json(geocodedLocation);
}
