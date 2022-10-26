import { LocatablePrecision } from "../../Abilities/Locateable";
import { adjustGeoPointPrecision } from "./adjustGeoPointPrecision";

describe("should adjust the precision of geo coordinates", () => {
  test("returns a geo point with coordinates rounded to 2 digits", () => {
    expect(
      adjustGeoPointPrecision(
        { lat: 15.11111, lng: 12.11111 },
        LocatablePrecision.VILLAGE
      )
    ).toMatchObject({ lat: 15.11, lng: 12.11 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.55555, lng: 12.55555 },
        LocatablePrecision.VILLAGE
      )
    ).toMatchObject({ lat: 15.56, lng: 12.56 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.99999, lng: 12.99999 },
        LocatablePrecision.VILLAGE
      )
    ).toMatchObject({ lat: 16.0, lng: 13.0 });
  });

  test("returns a geo point with coordinates rounded to 3 digits", () => {
    expect(
      adjustGeoPointPrecision(
        { lat: 15.11111, lng: 12.11111 },
        LocatablePrecision.FIELD
      )
    ).toMatchObject({ lat: 15.111, lng: 12.111 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.55555, lng: 12.55555 },
        LocatablePrecision.FIELD
      )
    ).toMatchObject({ lat: 15.556, lng: 12.556 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.99999, lng: 12.99999 },
        LocatablePrecision.FIELD
      )
    ).toMatchObject({ lat: 16.0, lng: 13.0 });
  });

  test("returns a geo point with coordinates rounded to 4 digits", () => {
    expect(
      adjustGeoPointPrecision(
        { lat: 15.11111, lng: 12.11111 },
        LocatablePrecision.PLACE
      )
    ).toMatchObject({ lat: 15.1111, lng: 12.1111 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.55555, lng: 12.55555 },
        LocatablePrecision.PLACE
      )
    ).toMatchObject({ lat: 15.5556, lng: 12.5556 });
    expect(
      adjustGeoPointPrecision(
        { lat: 15.99999, lng: 12.99999 },
        LocatablePrecision.PLACE
      )
    ).toMatchObject({ lat: 16.0, lng: 13.0 });
  });
});
