import { LocatablePrecision } from "../../Abilities/Locateable";

import { adjustGeoCoordinatePrecision } from "./adjustGeoCoordinatePrecision";

describe("should adjust the precision of a geo coordinate", () => {
  test("returns coordinate rounded to 2 digits", () => {
    expect(
      adjustGeoCoordinatePrecision(15.11111, LocatablePrecision.VILLAGE)
    ).toEqual(15.11);
    expect(
      adjustGeoCoordinatePrecision(15.55555, LocatablePrecision.VILLAGE)
    ).toEqual(15.56);
    expect(
      adjustGeoCoordinatePrecision(15.99999, LocatablePrecision.VILLAGE)
    ).toEqual(16.0);
  });

  test("returns coordinate rounded to 3 digits", () => {
    expect(
      adjustGeoCoordinatePrecision(15.11111, LocatablePrecision.FIELD)
    ).toEqual(15.111);
    expect(
      adjustGeoCoordinatePrecision(15.55555, LocatablePrecision.FIELD)
    ).toEqual(15.556);
    expect(
      adjustGeoCoordinatePrecision(15.99999, LocatablePrecision.FIELD)
    ).toEqual(16.0);
  });

  test("returns coordinate rounded to 4 digits", () => {
    expect(
      adjustGeoCoordinatePrecision(15.11111, LocatablePrecision.PLACE)
    ).toEqual(15.1111);
    expect(
      adjustGeoCoordinatePrecision(15.55555, LocatablePrecision.PLACE)
    ).toEqual(15.5556);
    expect(
      adjustGeoCoordinatePrecision(15.99999, LocatablePrecision.PLACE)
    ).toEqual(16.0);
  });
});
