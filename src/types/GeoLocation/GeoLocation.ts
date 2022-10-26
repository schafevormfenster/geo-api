export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GeoBox {
  north: number;
  east: number;
  south: number;
  west: number;
  accuracyLevel?: number;
}

export interface GeoPosition {
  point: GeoPoint;
  box?: GeoBox;
}

export interface GeoIdentifiers {
  geonamesId: number | null;
  googlePlaceId: string | null;
  wikidataId: string | null;
  googleMyBusinessId: string | null;
  slug: string | null;
}

type GeoAddress = string;

export interface GeoAdministrativeHierarchyItem {
  geonameId: number | null;
  name: string;
  ISO3166: string;
  zip: string | null;
  code: string | null;
  class: string | null;
}

export type GeoAdministrativeCountry = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name" | "ISO3166"
>;
export type GeoAdministrativeState = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name" | "ISO3166"
>;
export type GeoAdministrativeCounty = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name"
>;
export type GeoAdministrativeMunicipality = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name" | "zip"
>;
export type GeoAdministrativeCommunity = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name"
>;

export type GeoAdministrativePlace = Pick<
  GeoAdministrativeHierarchyItem,
  "geonameId" | "name" | "code" | "class"
>;

export interface GeoAdministrativeHierarchy {
  country?: GeoAdministrativeCountry;
  state?: GeoAdministrativeState; // state = admin1@geonames
  county?: GeoAdministrativeCounty; // county = admin3@geonames
  municipality?: GeoAdministrativeMunicipality; // municipality = admin4@geonames
  community?: GeoAdministrativeCommunity;
  place?: GeoAdministrativePlace;
}

export interface GeoDemography {
  population: number | null;
}

/**
 * Geo location.
 */
export interface GeoLocation extends GeoIdentifiers {
  name: string;
  localName?: string;
  asciiName?: string;
  geo?: GeoPosition;
  location?: string;
  address?: GeoAddress;
  hierarchy?: GeoAdministrativeHierarchy;
  demography?: GeoDemography;
  timezone?: string;
}
