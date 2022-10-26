import { values, toString, sortBy, sortedUniqBy, filter } from "lodash";
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

export type GeonamesFeatureClass =
  | "A"
  | "H"
  | "L"
  | "P"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V";

export type GeonamesSearchQueryMatch = "EXACT" | "NAME" | "LOOSE";

export type GeonamesSearchQueryStyle = "SHORT" | "MEDIUM" | "LONG" | "FULL";

export interface GeonamesSearchQuery {
  q?: string;
  match: GeonamesSearchQueryMatch;
  adminCode4?: string;
  adminCode3?: string;
  adminCode1?: string;
  country: string;
  featureClass?: GeonamesFeatureClass;
  featureCode?: string;
  style: GeonamesSearchQueryStyle;
}

export type GeonamesSearchResult = GeonameExtended[] | null;

export interface GeonamesSearchPageResult {
  startRow: number;
  maxRows: number;
  totalResultsCount: number;
  data: GeonameExtended[];
}

/**
 * Creates a simple array of page numbers to easier map through pages.
 * @param totalResultsCount
 * @param pageSize
 * @returns
 */
export const pageArray = (
  totalResultsCount: number,
  pageSize: number
): number[] => {
  const totalPages: number = Math.ceil(totalResultsCount / pageSize);
  let pages = [];
  for (let index = 2; index <= totalPages; index++) {
    pages.push(index);
  }
  return pages;
};

/**
 * Exectes a geoname search request for a specific results page.
 * @param query
 * @param startRow
 * @param maxRows
 * @returns
 */
export const geonamesSearchPage = async (
  query: GeonamesSearchQuery,
  startRow: number,
  maxRows: number
): Promise<GeonamesSearchPageResult | null> => {
  try {
    console.debug(
      `Execute geonames.searchPage(${toString(
        values(query)
      )}, ${startRow}, ${maxRows})`
    );
    const response: any = await geonames.search({
      ...query,
      startRow,
      maxRows,
    });
    if (response?.status?.message) throw new Error(response.status.message);
    if (!response?.geonames || !response?.totalResultsCount)
      throw new Error("No data.");

    if (response.geonames.length <= 0 || response.totalResultsCount <= 0)
      return null;

    return {
      startRow,
      maxRows,
      totalResultsCount: response.totalResultsCount,
      data: response.geonames,
    };
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

/**
 * Searches an item from geonames.org.
 * @param geonameId
 * @returns
 */
export const geonamesSearch = async (
  query: GeonamesSearchQuery
): Promise<GeonamesSearchResult> => {
  try {
    console.debug(`Execute geonames.search(${toString(values(query))})`);
    const requestQuery: any = {
      q: query.match === "LOOSE" ? query.q : undefined,
      name: query.match === "NAME" ? query.q : undefined,
      name_equals: query.match === "EXACT" ? query.q : undefined,
      adminCode4: query.adminCode4,
      adminCode3: query.adminCode3,
      adminCode1: query.adminCode1,
      country: query.country,
      featureClass: query.featureClass,
      featureCode: query.featureCode,
      style: query.style || "SHORT",
      lang: "de",
    };

    const pageSize: number = 1000; // see http://www.geonames.org/export/geonames-search.html
    let resultData: GeonamesSearchPageResult = <GeonamesSearchPageResult>(
      await geonamesSearchPage(requestQuery, 0, pageSize)
    );

    if (resultData.totalResultsCount > resultData.data.length) {
      /**
       * split up totalResultsCount by pageSize into a list with offset/maxRows
       * then do a promise all for all pages
       * afterwars combine all results into one big array
       */
      await Promise.all(
        pageArray(resultData.totalResultsCount, pageSize).map(async (page) => {
          const start = page * pageSize - pageSize;
          const pageResult: GeonamesSearchPageResult = <
            GeonamesSearchPageResult
          >await geonamesSearchPage(requestQuery, start, pageSize);
          resultData.data = resultData.data.concat(pageResult.data);
          return Promise.resolve();
        })
      );
    }

    // sort by name
    let sortedResultData = sortBy(resultData.data, ["name", "geonameId"]);

    // ensure exact matches, while geonames is quite loose here

    if (query.match === "EXACT") {
      sortedResultData = filter(sortedResultData, { name: query.q });
    }

    return sortedResultData;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
