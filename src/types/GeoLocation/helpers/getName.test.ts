import { GeonameExtended } from "../../../apiclients/geonames/geonamesSearch";
import { getName } from "./getName";
import { mockGeonameWithPreferredName } from "./getName.mock";

describe("should return the best name from a geonames record", () => {
  test("returns a wikidata id", () => {
    const result: string = getName(
      mockGeonameWithPreferredName as GeonameExtended
    );
    expect(result).toEqual("Preferred Name");
  });
});
