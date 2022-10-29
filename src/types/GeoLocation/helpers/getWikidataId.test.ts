import { GeonameExtended } from "../../../apiclients/geonames/geonamesSearch";
import { getWikidataId } from "./getWikidataId";
import { mockGeonameWithWikidataId } from "./getWikidataId.mock";

describe("should return the wikidata id from a geonames record", () => {
  test("returns a wikidata id", () => {
    const result: string = getWikidataId(
      mockGeonameWithWikidataId as GeonameExtended
    );
    expect(result).toEqual("Q15923993");
  });
});
