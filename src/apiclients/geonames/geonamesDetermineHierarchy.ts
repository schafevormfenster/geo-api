import { values, toString, head } from "lodash";
import { geonamesSearchCached } from "./geonamesSearchCached";
import {
  GeoAdministrativeCommunity,
  GeoAdministrativeCountry,
  GeoAdministrativeCounty,
  GeoAdministrativeHierarchy,
  GeoAdministrativeMunicipality,
  GeoAdministrativePlace,
  GeoAdministrativeState,
} from "../../types/GeoLocation/GeoLocation";
import { GeonameExtended } from "./geonamesGet";
import { getWikidataId } from "../../types/GeoLocation/helpers/getWikidataId";
import { getName } from "../../types/GeoLocation/helpers/getName";

export type GeonamesDetermineHierarchyQuery = {
  place?: string;
  community: string;
  municipality: string;
  county: string;
  state: string;
  country: string;
};

export type GeonamesDetermineHierarchyResult =
  GeoAdministrativeHierarchy | null;

/**
 * Determines the most detailed possible geo hierarchy from geonames.org.
 * @param query: GeonamesDetermineHierarchyQuery
 * @returns geo location hierarchy: GeonamesDetermineHierarchyResult
 */
export const geonamesDetermineHierarchy = async (
  query: GeonamesDetermineHierarchyQuery
): Promise<GeonamesDetermineHierarchyResult> => {
  try {
    console.debug(
      `Execute geonames.determineHierarchy(${toString(values(query))})`
    );

    let country: GeoAdministrativeCountry | undefined;
    if (query.country) {
      const geonamesCountry: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.country,
          match: "NAME",
          style: "LONG",
          country: query.country,
          featureClass: "A",
          featureCode: "PCLI",
        })
      );
      if (geonamesCountry) {
        country = {
          geonameId: geonamesCountry?.geonameId,
          ISO3166: geonamesCountry?.countryCode,
          name: geonamesCountry?.name || geonamesCountry?.countryName,
        };
      } else {
        console.info(`No country found for ${query.country}`);
      }
    }

    let stateAdminCode: number | undefined;
    let state: GeoAdministrativeState | undefined;
    if (query.state) {
      const geonamesState: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.state,
          match: "NAME",
          style: "LONG",
          country: country?.ISO3166 || query.country,
          featureClass: "A",
          featureCode: "ADM1",
        })
      );
      if (geonamesState) {
        stateAdminCode = parseInt(geonamesState?.adminCode1);
        state = {
          geonameId: geonamesState?.geonameId,
          ISO3166: geonamesState?.adminName3,
          name: geonamesState?.name,
        };
      } else {
        console.info(`No state found for ${query.state}`);
      }
    }

    let countyAdminCode: number | undefined;
    let county: GeoAdministrativeCounty | undefined;
    if (query.county) {
      const geonamesCounty: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.county,
          match: "NAME",
          style: "FULL",
          adminCode1: stateAdminCode?.toString(),
          country: country?.ISO3166 || query.country,
          featureClass: "A",
          featureCode: "ADM3",
        })
      );
      if (geonamesCounty) {
        countyAdminCode = parseInt(<string>geonamesCounty?.adminCode3);
        county = {
          geonameId: geonamesCounty.geonameId,
          name: getName(geonamesCounty),
        };
      } else {
        console.info(`No county found for query: ${toString(values(query))}`);
      }
    }

    let municipalityAdminCode: number | undefined;
    let municipality: GeoAdministrativeMunicipality | undefined;
    if (query.municipality) {
      const geonamesMunicipality: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.municipality,
          match: "NAME",
          style: "FULL",
          adminCode3: countyAdminCode?.toString(),
          adminCode1: stateAdminCode?.toString(),
          country: country?.ISO3166 || query.country,
          featureClass: "A",
          featureCode: "ADM4",
        })
      );
      if (geonamesMunicipality?.geonameId) {
        municipalityAdminCode = parseInt(
          <string>geonamesMunicipality?.adminCode4
        );
        municipality = {
          geonameId: geonamesMunicipality.geonameId,
          name: getName(geonamesMunicipality),
          zip: null, // TODO: fetch zip later or here or get from google place?
          wikidataId: getWikidataId(geonamesMunicipality),
        };
      } else {
        console.info(
          `No municipality found for ${query.municipality}, try again with less specific query`
        );
        // try again with a query leaving out the county
        const geonamesMunicipalityLoose: GeonameExtended | undefined = head(
          await geonamesSearchCached({
            q: query.municipality,
            match: "NAME",
            style: "FULL",
            adminCode3: "",
            adminCode1: stateAdminCode?.toString(),
            country: country?.ISO3166 || query.country,
            featureClass: "A",
            featureCode: "ADM4",
          })
        );
        if (geonamesMunicipalityLoose?.geonameId) {
          // if loose municipality is the better match, so overwrite the county code for folloing queries
          countyAdminCode = parseInt(
            <string>geonamesMunicipalityLoose?.adminCode3
          );
          municipalityAdminCode = parseInt(
            <string>geonamesMunicipalityLoose?.adminCode4
          );
          municipality = {
            geonameId: geonamesMunicipalityLoose.geonameId,
            name: getName(geonamesMunicipalityLoose),
            zip: null, // TODO: fetch zip later or here or get from google place?
            wikidataId: getWikidataId(geonamesMunicipalityLoose),
          };
        } else {
          console.info(
            `No municipality found for ${query.municipality} even with less specific query`
          );
        }
      }
    }

    let community: GeoAdministrativeCommunity | undefined;
    if (query.community) {
      const geonamesCommunity: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.community || query.municipality || municipality?.name,
          match: "NAME",
          style: "FULL",
          adminCode4: municipalityAdminCode?.toString(),
          adminCode3: countyAdminCode?.toString(),
          adminCode1: stateAdminCode?.toString(),
          country: country?.ISO3166 || query.country,
          featureClass: "P",
          featureCode: "PPL",
        })
      );
      if (geonamesCommunity) {
        community = {
          geonameId: geonamesCommunity.geonameId,
          name: getName(geonamesCommunity),
          wikidataId: getWikidataId(geonamesCommunity),
        };
      } else {
        console.info(
          `No community found for ${query.community}, try with less specific query`
        );
        const geonamesCommunityLoose: GeonameExtended | undefined = head(
          await geonamesSearchCached({
            q: query.community || query.municipality || municipality?.name,
            match: "NAME",
            style: "FULL",
            adminCode4: municipalityAdminCode?.toString(),
            adminCode3: countyAdminCode?.toString(),
            adminCode1: stateAdminCode?.toString(),
            country: country?.ISO3166 || query.country,
            featureClass: "P",
            featureCode: "",
          })
        );
        if (geonamesCommunityLoose) {
          community = {
            geonameId: geonamesCommunityLoose.geonameId,
            name: getName(geonamesCommunityLoose),
            wikidataId: getWikidataId(geonamesCommunityLoose),
          };
        } else {
          console.info(
            `No community found for ${query.community} even with less specific query`
          );
        }
      }
    }

    let place: GeoAdministrativePlace | undefined;
    if (query.place) {
      const geonamesPlace: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.place,
          match: "NAME",
          style: "FULL",
          adminCode4: municipalityAdminCode?.toString(),
          adminCode3: countyAdminCode?.toString(),
          adminCode1: stateAdminCode?.toString(),
          country: country?.ISO3166 || query.country,
        })
      );
      if (geonamesPlace) {
        place = {
          geonameId: geonamesPlace.geonameId,
          name: getName(geonamesPlace),
          code: geonamesPlace.fcode,
          class: geonamesPlace.fcl,
          wikidataId: getWikidataId(geonamesPlace),
        };
      }
    }

    const geonamesHierarchy: GeoAdministrativeHierarchy = {
      place: place,
      community: community,
      municipality: municipality,
      county: county,
      state: state,
      country: country,
    };

    return geonamesHierarchy;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
