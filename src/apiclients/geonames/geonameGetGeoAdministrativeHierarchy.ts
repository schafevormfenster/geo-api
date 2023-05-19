import { GeoAdministrativeHierarchy } from "../../types/GeoLocation/GeoLocation";
import { getWikidataId } from "../../types/GeoLocation/helpers/getWikidataId";
import { GeonameExtended } from "./geonamesGet";
import { geonamesGetCached } from "./geonamesGetCached";

export type GeonameGetGeoAdministrativeHierarchyQuery = GeonameExtended;

export type GeonameGetGeoAdministrativeHierarchyResult =
  GeoAdministrativeHierarchy | null;

/**
 * Extract the geo administrative hierarchy from a geoname location.
 * @param query: GeonameExtended
 * @returns geo location hierarchy: GeoAdministrativeHierarchy
 */
export const geonameGetGeoAdministrativeHierarchy = async (
  query: GeonameGetGeoAdministrativeHierarchyQuery
): Promise<GeonameGetGeoAdministrativeHierarchyResult> => {
  // fetch municipality for wikidata id
  const municipality: GeonameExtended | null = await geonamesGetCached(
    parseInt(query.adminId4 as string)
  );

  const getGeoAdministrativeHierarchy: GeoAdministrativeHierarchy = {
    community: {
      geonameId: query.geonameId,
      name: query.name,
      wikidataId: getWikidataId(query),
    },
    municipality: {
      geonameId: parseInt(query.adminId4 as string),
      name: (municipality?.name as string) || query.adminName4,
      wikidataId: municipality ? getWikidataId(municipality) : null,
      zip: null,
    },
    county: {
      geonameId: parseInt(query.adminId3 as string),
      name: query.adminName3,
    },
    state: {
      geonameId: parseInt(query.adminId1 as string),
      name: query.adminName1,
      ISO3166: query.adminCodes1.ISO3166_2,
    },
    country: {
      geonameId: parseInt(query.countryId),
      name: query.countryName,
      ISO3166: query.countryCode,
    },
  };

  return getGeoAdministrativeHierarchy;
};
