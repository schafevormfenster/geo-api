import { GeonameExtended } from "../../../apiclients/geonames/geonamesSearch";

export const getWikidataId = (geonamesRecord: GeonameExtended): string => {
  const wikiDataId: any = geonamesRecord.alternateNames?.find(
    (item) => item.lang === "wkdt"
  );

  return wikiDataId?.name || null;
};
