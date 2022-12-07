import { values, toString } from "lodash";
import slugify from "slugify";
import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import {
  geonamesDetermineHierarchy,
  GeonamesDetermineHierarchyQuery,
  GeonamesDetermineHierarchyResult,
} from "./geonamesDetermineHierarchy";

/**
 * Use a two layer cache.
 * @param query: GeonamesDetermineHierarchyQuery
 * @returns hierarchy: GeonamesDetermineHierarchyResult
 */
const memoryCached = async (
  query: GeonamesDetermineHierarchyQuery
): Promise<GeonamesDetermineHierarchyResult> => {
  try {
    const queryAsString = toString(values(query));
    const cacheKeyIdentifier = slugify(queryAsString, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "geonames_determinehierarchy_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonamesDetermineHierarchy(query);
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

export const geonamesDetermineHierarchyCached = async (
  query: GeonamesDetermineHierarchyQuery
): Promise<GeonamesDetermineHierarchyResult> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return geonamesDetermineHierarchy(query);
  return memoryCached(query);
};
