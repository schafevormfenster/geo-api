import { values, toString, sortBy, sortedUniqBy, filter } from "lodash";
import Geonames from "geonames.js";
import { Geoname } from "geonames-api-typescript/src/models/Geoname";
import {
  GeonamesSearchQueryStyle,
  GeonamesSearchResult,
} from "./geonamesSearch";
import { GeoPoint } from "../../types/GeoLocation/GeoLocation";

const geonames = Geonames({
  username: process.env.GEONAMES_USERNAME,
  lan: "de",
  encoding: "JSON",
});

export interface GeonamesGeoSearchQuery {
  geo: GeoPoint;
  style?: GeonamesSearchQueryStyle;
  radius?: number;
}

/**
 * Searches an item from geonames.org.
 * @param geonameId
 * @returns
 */
export const geonamesGeoSearch = async (
  query: GeonamesGeoSearchQuery
): Promise<GeonamesSearchResult> => {
  try {
    console.debug(
      `Execute geonames.geonamesGeoSearch(${toString(values(query))})`
    );
    const requestQuery: any = {
      lat: query.geo.lat,
      lng: query.geo.lng,
      radius: query.radius || 5,
      style: query.style || "SHORT",
      lang: "de",
    };

    const response: any = await geonames.findNearbyPlaceName(requestQuery);

    if (response.geonames.length <= 0 || response.totalResultsCount <= 0)
      throw new Error("No data.");

    // filter for fcode=PPL
    const results = response.geonames.filter((geoname: Geoname) => {
      return geoname.fcode === "PPL";
    });
    if (results.length <= 0) return null;

    // return results
    console.debug(results);
    return results;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
