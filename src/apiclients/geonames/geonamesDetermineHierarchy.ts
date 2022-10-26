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
          name: geonamesCounty.name,
        };
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
      if (geonamesMunicipality) {
        municipalityAdminCode = parseInt(
          <string>geonamesMunicipality?.adminCode4
        );
        municipality = {
          geonameId: geonamesMunicipality.geonameId,
          name: geonamesMunicipality.name,
          zip: null, // TODO: fetch zip later or here or get from google place?
        };
      }
    }

    let community: GeoAdministrativeCommunity | undefined;
    if (query.community) {
      const geonamesCommunity: GeonameExtended | undefined = head(
        await geonamesSearchCached({
          q: query.community,
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
          name: geonamesCommunity.name,
        };
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
      console.debug(geonamesPlace);
      if (geonamesPlace) {
        place = {
          geonameId: geonamesPlace.geonameId,
          name: geonamesPlace.name,
          code: geonamesPlace.fcode,
          class: geonamesPlace.fcl,
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
