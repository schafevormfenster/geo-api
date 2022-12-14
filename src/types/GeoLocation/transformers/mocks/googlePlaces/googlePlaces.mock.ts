import { PlaceData } from "@googlemaps/google-maps-services-js";
import { mockGooglePlaceByAddress } from "./address.mock";
import { mockGooglePlaceByCommunity } from "./community.mock";
import {
  mockGooglePlaceGeoPosition,
  mockGooglePlaceGeoPositionWithoutBounds,
} from "./geopositions.mock";
import {
  mockGooglePlaceByPlace,
  mockGooglePlaceByPlaceWithCommunityEqualsMunicipality,
} from "./place.mock";

export type mockGooglePlacesType = {
  address: PlaceData;
  place: PlaceData;
  placeWithLessData: PlaceData;
  community: PlaceData;
  geoposition: any;
  geopositionNoBounds: any;
};

export const mockGooglePlaces: mockGooglePlacesType = {
  address: mockGooglePlaceByAddress as PlaceData,
  place: mockGooglePlaceByPlace as PlaceData,
  placeWithLessData:
    mockGooglePlaceByPlaceWithCommunityEqualsMunicipality as PlaceData,
  community: mockGooglePlaceByCommunity as PlaceData,
  geoposition: mockGooglePlaceGeoPosition,
  geopositionNoBounds: mockGooglePlaceGeoPositionWithoutBounds,
};
