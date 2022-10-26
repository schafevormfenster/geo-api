import {
  Client,
  ApiKeyParams,
  Place,
  PlaceDetailsRequest,
  PlaceDetailsResponse,
  Language,
} from "@googlemaps/google-maps-services-js";

/**
 * Finds structured geo data by a location string in googlemaps.
 * @param location
 * @returns google.maps.Place
 */
export const googleMapsPlaceDetails = async (
  placeId: string
): Promise<Place | null> => {
  console.debug(`Execute googlemaps.placeDetails(${placeId})`);

  const client = new Client({});
  const apiKey: ApiKeyParams = {
    key: <string>process.env.GOOGLE_MAPS_API_KEY,
  };

  console.debug(process.env.GOOGLE_MAPS_API_KEY);
  const query: PlaceDetailsRequest = {
    params: {
      place_id: placeId,
      language: Language.de,
      fields: [],
      ...apiKey,
    },
    timeout: parseInt(<string>process.env.GOOGLE_MAPS_API_TIMEOUT) | 2000, // milliseconds
  };

  try {
    const googlePlaceCandidates: Place | null = await client
      .placeDetails(query)
      .then((response: PlaceDetailsResponse) => {
        if (response.data.status !== "OK") {
          if (response.data.status === "ZERO_RESULTS") {
            throw new Error(
              `No place candidate found for address '${location}' at google places api.`
            );
          } else {
            throw new Error(
              "googlemaps.findPlaceFromText api response != 200: " +
                response.data.status
            );
          }
        }
        const googlePlace: Place | null = response.data.result || null;
        if (googlePlace)
          console.debug(
            `Found details for google place '${googlePlace.place_id}'`
          );
        return googlePlace || null;
      });
    return googlePlaceCandidates;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
