import { LocatablePrecision } from "../Abilities/Locateable";
import { GeoPoint } from "../GeoLocation";
import { adjustGeoCoordinatePrecision } from "./adjustGeoCoordinatePrecision";

export const adjustGeoPointPrecision = (
  geopoint: GeoPoint,
  precision: LocatablePrecision
): GeoPoint => {
  const factor: number = Math.pow(10, precision);
  return {
    lat: adjustGeoCoordinatePrecision(geopoint.lat, precision),
    lng: adjustGeoCoordinatePrecision(geopoint.lng, precision),
  };
};
