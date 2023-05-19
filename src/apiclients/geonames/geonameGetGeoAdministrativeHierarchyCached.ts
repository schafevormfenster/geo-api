import { values, toString } from "lodash";
import slugify from "slugify";
import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import {
  GeonameGetGeoAdministrativeHierarchyQuery,
  GeonameGetGeoAdministrativeHierarchyResult,
  geonameGetGeoAdministrativeHierarchy,
} from "./geonameGetGeoAdministrativeHierarchy";

/**
 * Use a two layer cache.
 * @param query: GeonamesDetermineHierarchyQuery
 * @returns hierarchy: GeonamesDetermineHierarchyResult
 */
const memoryCached = async (
  query: GeonameGetGeoAdministrativeHierarchyQuery
): Promise<GeonameGetGeoAdministrativeHierarchyResult> => {
  try {
    const queryAsString = toString(values(query));
    const cacheKeyIdentifier = slugify(queryAsString, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "geonames_gethierarchy_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonameGetGeoAdministrativeHierarchy(query);
        });
      } catch (error) {
        console.error((error as Error).message);
        throw error;
      }
    });
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const geonameGetGeoAdministrativeHierarchyCached = async (
  query: GeonameGetGeoAdministrativeHierarchyQuery
): Promise<GeonameGetGeoAdministrativeHierarchyResult> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return geonameGetGeoAdministrativeHierarchy(query);
  return memoryCached(query);
};
