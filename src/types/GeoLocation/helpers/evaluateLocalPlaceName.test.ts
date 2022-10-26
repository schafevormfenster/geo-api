import { evaluateLocalPlaceName } from "./evaluateLocalPlaceName";

describe("should evaluate or parse a short local plcae name by given place name and community name adjust the", () => {
  test("returns a local name by extracting the community name", () => {
    const result: string = evaluateLocalPlaceName(
      "Melkerschule Schlatkow",
      "Schlatkow"
    );
    expect(result).toEqual("Melkerschule");
  });

  test("returns the original place name for partly matching community", () => {
    const result: string = evaluateLocalPlaceName(
      "Ivenacker Eichen",
      "Ivenack"
    );
    expect(result).toEqual("Ivenacker Eichen");
  });

  test("returns the original place name for community with the middle of the name", () => {
    const result: string = evaluateLocalPlaceName(
      "Hotel Superdorf 23",
      "Superdorf"
    );
    expect(result).toEqual("Hotel Superdorf 23");
  });
  test("returns the original place name for non matching community", () => {
    const result: string = evaluateLocalPlaceName(
      "Melkerschule Schlatkow",
      "Schmatzin"
    );
    expect(result).toEqual("Melkerschule Schlatkow");
  });
});
