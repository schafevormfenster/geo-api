import { GeoPoint } from "../GeoLocation";

/**
 * Geo point accuracy to use for geo distances indexes and searches.
 *
 * Number of digits.
 *  2: 1,1km, separates a village from the next
 *  3: 110m, large agricultural field or institutional campus
 *  4: 11m, uncorrected gps
 */
export enum LocatablePrecision {
  "VILLAGE" = 2,
  "FIELD" = 3,
  "PLACE" = 4,
}

export const DefaultLocatablePrecision = LocatablePrecision.FIELD;
