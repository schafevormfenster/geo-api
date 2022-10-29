import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import { Place } from "@googlemaps/google-maps-services-js";
import { googleMapsPlaceDetails } from "./googleMapsPlaceDetails";
import slugify from "slugify";

const googleMapsPlaceDetailsCacheTTL: number = 7776000; // 90 days

/**
 * Use a two layer cache.
 * @param location
 * @returns
 */
const memoryCached = async (placeId: string): Promise<Place | null> => {
  try {
    const cacheKeyIdentifier = slugify(placeId, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "googlemaps_placedetail_" + cacheKeyIdentifier;
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
              return googleMapsPlaceDetails(placeId);
            },
            { ttl: googleMapsPlaceDetailsCacheTTL }
          );
        } catch (error) {
          console.error((error as Error).message);
          throw error;
        }
      },
      { ttl: googleMapsPlaceDetailsCacheTTL }
    );
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const googleMapsPlaceDetailsCached = async (
  placeId: string
): Promise<Place | null> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return googleMapsPlaceDetails(placeId);
  return memoryCached(placeId);
};
