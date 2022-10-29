import { GeoPosition } from "../GeoLocation";
import { googlePlaceToGeoPosition } from "./googlePlaceToGeoPosition";
import { mockGooglePlaces } from "./mocks/googlePlaces/googlePlaces.mock";

describe("should transform a google place geo position data into geo location point and box", () => {
  test("returns a geo point", () => {
    const result: GeoPosition = googlePlaceToGeoPosition(
      mockGooglePlaces.geoposition
    );
    expect(result.point).toEqual({
      lat: 53.5,
      lng: 13.5,
    });
  });

  test("returns a geo box by bounds", () => {
    const result: GeoPosition = googlePlaceToGeoPosition(
      mockGooglePlaces.geoposition
    );
    expect(result.box).toEqual({
      north: 53.6,
      east: 13.4,
      south: 53.6,
      west: 13.4,
    });
  });

  test("returns a geo box by viewport if bounds are missing", () => {
    const result: GeoPosition = googlePlaceToGeoPosition(
      mockGooglePlaces.geopositionNoBounds
    );
    expect(result.box).toEqual({
      north: 53.7,
      east: 13.7,
      south: 53.3,
      west: 13.3,
    });
  });
});
