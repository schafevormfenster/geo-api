import { values, toString } from "lodash";
import slugify from "slugify";
import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import {
  geonamesSearch,
  GeonamesSearchQuery,
  GeonamesSearchResult,
} from "./geonamesSearch";

/**
 * Use a two layer cache.
 * @param query: GeonamesSearchQuery
 * @returns
 */
const memoryCached = async (
  query: GeonamesSearchQuery
): Promise<GeonamesSearchResult> => {
  try {
    const queryAsString = toString(values(query));
    const cacheKeyIdentifier = slugify(queryAsString, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "geonames_search_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonamesSearch(query);
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

export const geonamesSearchCached = async (
  query: GeonamesSearchQuery
): Promise<GeonamesSearchResult> => {
  if (process.env.DEACTIVATE_CACHE === "true") return geonamesSearch(query);
  return memoryCached(query);
};
