import { GeonamesDetermineHierarchyQuery } from "../geonamesDetermineHierarchy";
import { buildGeonamesDetermineHierarchyQuery } from "./buildGeonamesDetermineHierarchyQuery";
import {
  mockGeonamesHierarchy,
  mockGeonamesHierarchyNoCountryIso,
  mockGeonamesHierarchyNoStateName,
  mockGeonamesHierarchyNoStateNoCountry,
} from "./buildGeonamesDetermineHierarchyQuery.mock";

describe("should build a geonames hierarchy query based on a geo administrative hierarchy", () => {
  test("returns a valid query object", () => {
    const result: GeonamesDetermineHierarchyQuery =
      buildGeonamesDetermineHierarchyQuery(mockGeonamesHierarchy);
    expect(result.place).toEqual("Geonames Building");
    expect(result.community).toEqual("Geonames Village");
    expect(result.municipality).toEqual("Geonames Municipality");
    expect(result.county).toEqual("Geonames County");
    expect(result.state).toEqual("Geonames State");
    expect(result.country).toEqual("DE");
  });

  test("use state iso if state name is missing", () => {
    const result: GeonamesDetermineHierarchyQuery =
      buildGeonamesDetermineHierarchyQuery(mockGeonamesHierarchyNoStateName);
    expect(result.state).toEqual("MV");
  });

  test("use country name if country iso is missing", () => {
    const result: GeonamesDetermineHierarchyQuery =
      buildGeonamesDetermineHierarchyQuery(mockGeonamesHierarchyNoCountryIso);
    expect(result.country).toEqual("Geonames Country");
  });

  test("use country and state defaults if both are missing", () => {
    const result: GeonamesDetermineHierarchyQuery =
      buildGeonamesDetermineHierarchyQuery(
        mockGeonamesHierarchyNoStateNoCountry
      );
    expect(result.state).toEqual("MV");
    expect(result.country).toEqual("DE");
  });
});
