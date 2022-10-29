import Geonames from "geonames.js";
import { Geoname } from "geonames-api-typescript/src/models/Geoname";

const geonames = Geonames({
  username: process.env.GEONAMES_USERNAME,
  lan: "de",
  encoding: "JSON",
});

/**
 * Add missing props to Geoname interface.
 */
export interface GeonameExtended extends Geoname {
  adminId2?: string;
  adminId3?: string;
  adminId4?: string;
  adminId5?: string;
  adminCode2?: string;
  adminCode3?: string;
  adminCode4?: string;
  adminCodes1: {
    ISO3166_2: string;
  };
  astergdem?: number;
  srtm3?: number;
}

/**
 * Get an item from geonames.org.
 * @param geonameId
 * @returns
 */
export const geonamesGet = async (
  geonameId: number
): Promise<GeonameExtended | null> => {
  try {
    console.debug(`Execute geonames.get(${geonameId.toString()})`);
    const response: any = await geonames.get({
      geonameId: geonameId.toString(),
      lang: "de",
    });
    if (response?.status?.message) throw new Error(response.status.message);

    // sort the json
    const geonameItem: GeonameExtended = <GeonameExtended>Object.keys(response)
      .sort()
      .reduce((obj: any, key: string) => {
        obj[key] = response[key] || null;
        return obj;
      }, {});

    return geonameItem;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
