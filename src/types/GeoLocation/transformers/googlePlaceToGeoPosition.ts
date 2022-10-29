import { Place } from "@googlemaps/google-maps-services-js";
import { LocatablePrecision } from "../Abilities/Locateable";
import { GeoPosition } from "../GeoLocation";
import { adjustGeoPointPrecision } from "../helpers/adjustGeoPointPrecision";

/**
 * Maps the geometry attributes of an google maps place object to a typed GeoPosition 'GeoLocationType' object.
 * @param Place google place
 * @returns GeoPosition
 */
export const googlePlaceToGeoPosition = (googlePlace: Place): GeoPosition => {
  const geoPosition: GeoPosition = {
    point: adjustGeoPointPrecision(
      {
        lat: googlePlace.geometry?.location.lat as number,
        lng: googlePlace.geometry?.location.lng as number,
      },
      LocatablePrecision.PLACE
    ),
    box: {
      north:
        (googlePlace.geometry?.bounds?.northeast.lat as number) ||
        (googlePlace.geometry?.viewport?.northeast.lat as number),
      east:
        (googlePlace.geometry?.bounds?.northeast.lng as number) ||
        (googlePlace.geometry?.viewport?.northeast.lng as number),
      south:
        (googlePlace.geometry?.bounds?.southwest.lat as number) ||
        (googlePlace.geometry?.viewport?.southwest.lat as number),
      west:
        (googlePlace.geometry?.bounds?.southwest.lng as number) ||
        (googlePlace.geometry?.viewport?.southwest.lng as number),
    },
  };

  return geoPosition;
};
