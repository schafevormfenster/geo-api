import { GeoAdministrativeHierarchy } from "../../../types/GeoLocation/GeoLocation";
import { GeonamesDetermineHierarchyQuery } from "../geonamesDetermineHierarchy";

const defaultCountry: string = process.env.DEFAULT_COUNTRY || "DE";
const defaultState: string = process.env.DEFAULT_STATE || "MV";

export const buildGeonamesDetermineHierarchyQuery = (
  geoAdministrativeHierarchy: GeoAdministrativeHierarchy
): GeonamesDetermineHierarchyQuery => {
  // determine geonames.org references and hierarchy
  const query: GeonamesDetermineHierarchyQuery = {
    place: <string>geoAdministrativeHierarchy.place?.name,
    community: <string>geoAdministrativeHierarchy.community?.name,
    municipality: <string>geoAdministrativeHierarchy.municipality?.name,
    county: <string>geoAdministrativeHierarchy.county?.name,
    state:
      <string>geoAdministrativeHierarchy.state?.name ||
      geoAdministrativeHierarchy.state?.ISO3166 ||
      defaultState,
    country:
      <string>geoAdministrativeHierarchy.country?.ISO3166 ||
      geoAdministrativeHierarchy.country?.name ||
      defaultCountry,
    geo: {
      lat: <number>geoAdministrativeHierarchy.place?.geo?.point?.lat,
      lng: <number>geoAdministrativeHierarchy.place?.geo?.point?.lng,
    },
  };

  return query;
};
