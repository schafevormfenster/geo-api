import { toString, values } from "lodash";
import slugify from "slugify";
import { localCache, remoteDatabaseCache } from "../../cache/cachemanager";
import {
  geonamesGetUniqueCommunitySlug,
  GeonamesGetUniqueCommunitySlugProps,
} from "./geonamesGetUniqueCommunitySlug";

/**
 * Use a two layer cache.
 * @param geonameId
 * @returns
 */
const memoryCached = async (
  query: GeonamesGetUniqueCommunitySlugProps
): Promise<string | null> => {
  try {
    const queryAsString = toString(values(query));
    const cacheKeyIdentifier = slugify(queryAsString, {
      lower: true,
      strict: true,
      trim: true,
    });
    const cacheKey = "geonames_getuniquecommunityslug_" + cacheKeyIdentifier;
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
        return remoteDatabaseCache.wrap(cacheKey, function () {
          console.info(`[Cache] Fetch original data for ${cacheKey}.`);
          return geonamesGetUniqueCommunitySlug(query);
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

export const geonamesGetUniqueCommunitySlugCached = async (
  query: GeonamesGetUniqueCommunitySlugProps
): Promise<string | null> => {
  if (process.env.DEACTIVATE_CACHE === "true")
    return geonamesGetUniqueCommunitySlug(query);
  return memoryCached(query);
};
