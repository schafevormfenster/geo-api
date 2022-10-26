import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import { GeonameExtended, geonamesGet } from "./geonamesGet";

/**
 * Use a two layer cache.
 * @param geonameId
 * @returns
 */
const memoryCached = async (
  geonameId: number
): Promise<GeonameExtended | null> => {
  try {
    const cacheKey = "geonames_get_" + geonameId;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonamesGet(geonameId);
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

export const geonamesGetCached = async (
  geonameId: number
): Promise<GeonameExtended | null> => {
  if (process.env.DEACTIVATE_CACHE === "true") return geonamesGet(geonameId);
  return memoryCached(geonameId);
};
