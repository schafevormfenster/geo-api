import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import { Place } from "@googlemaps/google-maps-services-js";
import { googleMapsFindPlaceFromText } from "./googleMapsFindPlaceFromText";
import slugify from "slugify";

const googleMapsFindPlaceFromTextCacheTTL: number = 7776000; // 90 days

/**
 * Use a two layer cache.
 * @param location
 * @returns
 */
const memoryCached = async (location: string): Promise<Place | null> => {
  try {
    const cacheKeyIdentifier = slugify(location, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "googlemaps_findplacefromtext_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(
      cacheKey,
      function () {
        try {
          console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
          return remoteDatabaseCache.wrap(
            cacheKey,
            function () {
              console.info(`[Cache] Fetch original data for ${cacheKey}.`);
              return googleMapsFindPlaceFromText(location);
            },
            { ttl: googleMapsFindPlaceFromTextCacheTTL }
          );
        } catch (error) {
          console.error((error as Error).message);
          throw error;
        }
      },
      { ttl: googleMapsFindPlaceFromTextCacheTTL }
    );
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const googleMapsFindPlaceFromTextCached = async (
  location: string
): Promise<Place | null> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return googleMapsFindPlaceFromText(location);
  return memoryCached(location);
};
