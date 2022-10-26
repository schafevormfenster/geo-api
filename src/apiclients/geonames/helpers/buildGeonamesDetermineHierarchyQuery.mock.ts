import { GeoAdministrativeHierarchy } from "../../../types/GeoLocation/GeoLocation";

export const mockGeonamesHierarchy: GeoAdministrativeHierarchy = {
  place: {
    geonameId: 10000,
    name: "Geonames Building",
    code: "FRM",
    class: "P",
  },
  community: { geonameId: 20000, name: "Geonames Village" },
  municipality: {
    geonameId: 30000,
    name: "Geonames Municipality",
    zip: "12345",
  },
  county: { geonameId: 40000, name: "Geonames County" },
  state: { geonameId: 50000, name: "Geonames State", ISO3166: "MV" },
  country: { geonameId: 60000, name: "Geonames Country", ISO3166: "DE" },
};

export const mockGeonamesHierarchyNoStateName: GeoAdministrativeHierarchy = {
  ...mockGeonamesHierarchy,
  state: { geonameId: 50000, name: "", ISO3166: "MV" },
};

export const mockGeonamesHierarchyNoCountryIso: GeoAdministrativeHierarchy = {
  ...mockGeonamesHierarchy,
  country: { geonameId: 60000, name: "Geonames Country", ISO3166: "" },
};

export const mockGeonamesHierarchyNoStateNoCountry: GeoAdministrativeHierarchy =
  {
    ...mockGeonamesHierarchy,
    state: { geonameId: null, name: "", ISO3166: "" },
    country: { geonameId: null, name: "", ISO3166: "" },
  };

export const mockGooglePlaceHierarchy: GeoAdministrativeHierarchy = {
  place: { geonameId: null, name: "Google Building", code: null, class: null },
  community: { geonameId: null, name: "Google Village" },
  municipality: { geonameId: null, name: "My Municipality", zip: "12345" },
  county: { geonameId: null, name: "Google County" },
  state: { geonameId: null, name: "Google State", ISO3166: "MV" },
  country: { geonameId: null, name: "Google Country", ISO3166: "DE" },
};
