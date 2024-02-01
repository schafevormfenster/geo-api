import { values, toString } from "lodash";
import slugify from "slugify";
import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import { GeonamesSearchResult } from "./geonamesSearch";
import { GeonamesGeoSearchQuery, geonamesGeoSearch } from "./geonamesGeoSearch";
import packageJson from "../../../package.json" assert { type: "json" };

/**
 * Use a two layer cache.
 * @param query: GeonamesGeoSearchQuery
 * @returns
 */
const memoryCached = async (
  query: GeonamesGeoSearchQuery
): Promise<GeonamesSearchResult> => {
  try {
    const queryAsString = toString(values(query));
    const cacheKeyIdentifier = slugify(queryAsString, {
      lower: true,
      strict: true,
      trim: true,
    });
    const version = slugify(packageJson.version, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "geonames_geosearch_" + version + "_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonamesGeoSearch(query);
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

export const geonamesGeoSearchCached = async (
  query: GeonamesGeoSearchQuery
): Promise<GeonamesSearchResult> => {
  if (process.env.DEACTIVATE_CACHE === "true") return geonamesGeoSearch(query);
  return memoryCached(query);
};
