import slugify from "slugify";
import { GeonamesSearchResult } from "./geonamesSearch";
import { geonamesSearchCached } from "./geonamesSearchCached";

export interface GeonamesGetUniqueCommunitySlugProps {
  communityName: string;
  municipalityName: string;
  countryScope?: string;
}

/**
 * Creates a community slug and ensures the uniqeness within the country.
 * @param geonamesId
 */
export const geonamesGetUniqueCommunitySlug = async (
  query: GeonamesGetUniqueCommunitySlugProps
): Promise<string> => {
  const locationsWithSameName: GeonamesSearchResult =
    await geonamesSearchCached({
      q: <string>query.communityName,
      match: "EXACT",
      country: <string>query.countryScope,
      featureCode: "PPL",
      style: "FULL",
    });

  if (<number>locationsWithSameName?.length > 1) {
    const slugBase: string = query.communityName + "-" + query.municipalityName;
    return slugify(slugBase, {
      lower: true,
      strict: true,
      locale: "de",
    });
  }

  // TODO: Currently we hope, that the commnity and municipality name combines are unique. Better would be to do a double check, by creating extended slugs for all results and check for duplicates. And if we have duplicates, to add another attribute.

  return slugify(query.communityName as string, {
    lower: true,
    strict: true,
    locale: "de",
  });
};
