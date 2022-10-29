import { GeoLocation } from "../GeoLocation";
import { composeGeocodedGeoLocation } from "./composeGeocodedGeoLocation";
import {
  mockGeonamesHierarchy,
  mockGooglePlace,
  mockGooglePlaceHierarchy,
} from "./composeGeocodedGeoLocation.mock";

describe("should compose a geo location object based on location, googlePlace, geonamesHierarchy and googlePlaceHierarchy", () => {
  test("keep original location", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.location).toEqual("Super Great Place");
  });

  test("use name from google place", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.name).toEqual("Kirche Groß Bünzow");
  });

  test("use local name from google place hierarchy", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.localName).toEqual("Google Building");
  });

  test("use address name from google place", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.address).toEqual(
      "Groß Bünzow 22, 17390 Klein Bünzow, Deutschland"
    );
  });

  test("use geonames and google place ids", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.geonamesId).toEqual(10000);
    expect(result.googlePlaceId).toEqual("ChIJDZyVbduoq0cRTG58egpV2l0");
  });

  test("use hierarchy from geonames hierarchy", () => {
    const result: GeoLocation = composeGeocodedGeoLocation(
      "Super Great Place",
      mockGooglePlace,
      mockGeonamesHierarchy,
      mockGooglePlaceHierarchy
    );
    expect(result.hierarchy?.place?.geonameId).toEqual(10000);
    expect(result.hierarchy?.place?.name).toEqual("Geonames Building");
    expect(result.hierarchy?.community?.geonameId).toEqual(20000);
    expect(result.hierarchy?.community?.name).toEqual("Geonames Village");
    expect(result.hierarchy?.municipality?.geonameId).toEqual(30000);
    expect(result.hierarchy?.municipality?.name).toEqual(
      "Geonames Municipality"
    );
    expect(result.hierarchy?.county?.geonameId).toEqual(40000);
    expect(result.hierarchy?.county?.name).toEqual("Geonames County");
    expect(result.hierarchy?.state?.geonameId).toEqual(50000);
    expect(result.hierarchy?.state?.ISO3166).toEqual("MV");
    expect(result.hierarchy?.country?.geonameId).toEqual(60000);
    expect(result.hierarchy?.country?.ISO3166).toEqual("DE");
  });
});
