import { GeonameExtended } from "../../../apiclients/geonames/geonamesSearch";

export const getName = (geonamesRecord: GeonameExtended): string => {
  const preferredName: any = geonamesRecord.alternateNames?.find(
    (item) => item.isPreferredName === true && item.lang === "de"
  );

  return (
    preferredName?.name ||
    geonamesRecord?.name ||
    geonamesRecord?.asciiName ||
    null
  );
};
