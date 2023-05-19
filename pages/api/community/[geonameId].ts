import type { NextApiRequest, NextApiResponse } from "next";
import { geonamesGetCached } from "../../../src/apiclients/geonames/geonamesGetCached";
import { GeonameExtended } from "../../../src/apiclients/geonames/geonamesGet";
import {
  GeoAdministrativeHierarchy,
  GeoLocation,
} from "../../../src/types/GeoLocation/GeoLocation";
import { getWikidataId } from "../../../src/types/GeoLocation/helpers/getWikidataId";
import { googleMapsFindPlaceFromTextCached } from "../../../src/apiclients/googlemaps/googleMapsFindPlaceFromTextCached";
import { googleMapsPlaceDetailsCached } from "../../../src/apiclients/googlemaps/googleMapsPlaceDetailsCached";
import { AddressComponent, Place } from "@googlemaps/google-maps-services-js";
import { mapGooglemapsAddressComponents2GeoAdministrativeHierarchy } from "../../../src/types/GeoLocation/transformers/mapGooglemapsAddressComponents2GeoAdministrativeHierarchy";
import { adjustGeoPointPrecision } from "../../../src/types/GeoLocation/helpers/adjustGeoPointPrecision";
import { LocatablePrecision } from "../../../src/types/GeoLocation/Abilities/Locateable";
import { geonameGetGeoAdministrativeHierarchyCached } from "../../../src/apiclients/geonames/geonameGetGeoAdministrativeHierarchyCached";

/**
 * @swagger
 * /api/community/{geonameId}:
 *   get:
 *     summary: Return a geolocation for a given geoname id.
 *     description: Based on the geoname id this api returns a geolocation with geonames.org data if it is an actual community.
 *     tags:
 *       - Geocoding
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: location
 *         description: Geoname id as string, e.g. "2806816" for "Wolfradshof, Schmatzin".
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Typed Geolocation.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GeoLocation | any>
) {
  const { geonameId } = req.query;

  if (!geonameId)
    return res
      .status(400)
      .end("Missing geoname id. Please provide a geoname id as path segment.");

  // check if geonameId is a number with 6..10 digits by regex
  if (!/^\d{6,10}$/.test(geonameId as string))
    return res
      .status(400)
      .end("Geoname id is not valid. Please provide a valid geoname id.");

  // fetch data from geonames
  const geonameLocation: GeonameExtended | null = await geonamesGetCached(
    parseInt(geonameId as string)
  );

  if (!geonameLocation) {
    return res.status(404).json({
      staud: 404,
      message: "Could not find any entry at geonames.org for given geoname id.",
    });
  }

  if (geonameLocation?.fcl != "P") {
    return res
      .status(404)
      .json({ staud: 404, message: "Given geoname id is not a community." });
  }

  // build up geo hierarchy
  const geoAdministrativeHierarchy: GeoAdministrativeHierarchy | null =
    await geonameGetGeoAdministrativeHierarchyCached(geonameLocation);

  if (!geoAdministrativeHierarchy) {
    return res.status(404).json({
      staud: 404,
      message: "Could not compose a geo hierarchy for given geoname id.",
    });
  }

  // look for google places
  const addressString: string = `${geonameLocation.name}, ${geonameLocation.adminName4}, ${geonameLocation.countryName}`;
  const googlePlace: any = await googleMapsFindPlaceFromTextCached(
    addressString
  );

  const googlePlaceDetails: Place | null = await googleMapsPlaceDetailsCached(
    googlePlace.place_id
  );
  const googlePlaceHierarchy =
    mapGooglemapsAddressComponents2GeoAdministrativeHierarchy(
      googlePlaceDetails?.address_components as AddressComponent[]
    );

  if (
    geoAdministrativeHierarchy.municipality &&
    !geoAdministrativeHierarchy.municipality?.zip &&
    googlePlaceHierarchy.municipality?.zip
  ) {
    geoAdministrativeHierarchy.municipality.zip = googlePlaceHierarchy
      .municipality?.zip as string;
  }

  const geoLocation: GeoLocation = {
    geonamesId: geonameLocation.geonameId || null,
    googlePlaceId:
      googlePlace && googlePlace?.place_id ? googlePlace.place_id : null,
    wikidataId: getWikidataId(geonameLocation) || null,
    googleMyBusinessId: null, // TODO: maybe fetch my business id later?
    name: geonameLocation.name,
    localName: geonameLocation.name,
    type: "community",
    geo: {
      point: adjustGeoPointPrecision(
        {
          lat: parseFloat(geonameLocation.lat),
          lng: parseFloat(geonameLocation.lng),
        },
        LocatablePrecision.PLACE
      ),
      box: {
        north: geonameLocation.bbox.north,
        east: geonameLocation.bbox.east,
        south: geonameLocation.bbox.south,
        west: geonameLocation.bbox.west,
      },
    },
    location: geonameLocation.name,
    address: googlePlace?.formatted_address || addressString,
    hierarchy: geoAdministrativeHierarchy,
  };

  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  const cacheStaleWhileRevalidate: string =
    process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  res.setHeader(
    "Cache-Control",
    `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  );

  return res.status(200).json(geoLocation);
}
