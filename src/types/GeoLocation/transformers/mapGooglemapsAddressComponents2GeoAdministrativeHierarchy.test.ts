import { AddressComponent } from "@googlemaps/google-maps-services-js";
import { GeoAdministrativeHierarchy } from "../GeoLocation";
import { mapGooglemapsAddressComponents2GeoAdministrativeHierarchy } from "./mapGooglemapsAddressComponents2GeoAdministrativeHierarchy";
import { mockGooglePlaces } from "./mocks/googlePlaces/googlePlaces.mock";

describe("should transform a google place address components array into a geo administrative hierarchy", () => {
  test("returns a transformed hierarchy for a google place based on an address", () => {
    const addressComponentsForAddress: AddressComponent[] = mockGooglePlaces
      .address.address_components as AddressComponent[];
    const geoAdministrativeHierarchy: GeoAdministrativeHierarchy =
      mapGooglemapsAddressComponents2GeoAdministrativeHierarchy(
        addressComponentsForAddress
      );
    expect(geoAdministrativeHierarchy.place).toBeUndefined();
    expect(geoAdministrativeHierarchy.community?.name).toMatch("Schlatkow");
    expect(geoAdministrativeHierarchy.community?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.municipality?.name).toMatch("Schmatzin");
    expect(geoAdministrativeHierarchy.municipality?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.county?.name).toMatch(
      "Vorpommern-Greifswald"
    );
    expect(geoAdministrativeHierarchy.county?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.state?.ISO3166).toMatch("MV");
    expect(geoAdministrativeHierarchy.state?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.country?.ISO3166).toMatch("DE");
    expect(geoAdministrativeHierarchy.country?.geonameId).toBeNull();
  });

  test("returns a transformed hierarchy for a google place based on a place", () => {
    const addressComponentsForAddress: AddressComponent[] = mockGooglePlaces
      .place.address_components as AddressComponent[];
    const geoAdministrativeHierarchy: GeoAdministrativeHierarchy =
      mapGooglemapsAddressComponents2GeoAdministrativeHierarchy(
        addressComponentsForAddress
      );

    expect(geoAdministrativeHierarchy.place).toBeUndefined();
    expect(geoAdministrativeHierarchy.community?.name).toMatch("Groß Bünzow");
    expect(geoAdministrativeHierarchy.community?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.municipality?.name).toMatch(
      "Klein Bünzow"
    );
    expect(geoAdministrativeHierarchy.municipality?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.county?.name).toMatch(
      "Vorpommern-Greifswald"
    );
    expect(geoAdministrativeHierarchy.county?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.state?.ISO3166).toMatch("MV");
    expect(geoAdministrativeHierarchy.state?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.country?.ISO3166).toMatch("DE");
    expect(geoAdministrativeHierarchy.country?.geonameId).toBeNull();
  });

  test("returns a transformed hierarchy for a google place based on a community", () => {
    const addressComponentsForCommunity: AddressComponent[] = mockGooglePlaces
      .community.address_components as AddressComponent[];
    const geoAdministrativeHierarchy: GeoAdministrativeHierarchy =
      mapGooglemapsAddressComponents2GeoAdministrativeHierarchy(
        addressComponentsForCommunity
      );

    expect(geoAdministrativeHierarchy.place).toBeUndefined();
    expect(geoAdministrativeHierarchy.community?.name).toMatch("Schlatkow");
    expect(geoAdministrativeHierarchy.community?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.municipality?.name).toMatch("Schmatzin");
    expect(geoAdministrativeHierarchy.municipality?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.county?.name).toMatch(
      "Vorpommern-Greifswald"
    );
    expect(geoAdministrativeHierarchy.county?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.state?.ISO3166).toMatch("MV");
    expect(geoAdministrativeHierarchy.state?.geonameId).toBeNull();
    expect(geoAdministrativeHierarchy.country?.ISO3166).toMatch("DE");
    expect(geoAdministrativeHierarchy.country?.geonameId).toBeNull();
  });
});
