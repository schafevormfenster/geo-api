import {
  Client,
  PlaceInputType,
  ApiKeyParams,
  Place,
  FindPlaceFromTextRequest,
  FindPlaceFromTextResponse,
  FindPlaceFromTextResponseData,
} from "@googlemaps/google-maps-services-js";
import { head } from "lodash";

/**
 * Finds structured geo data by a location string in googlemaps.
 * @param location
 * @returns google.maps.Place
 */
export const googleMapsFindPlaceFromText = async (
  location: string
): Promise<Place | null> => {
  console.debug(`Execute googlemaps.findPlaceFromText(${location})`);

  const client = new Client({});
  const apiKey: ApiKeyParams = {
    key: <string>process.env.GOOGLE_MAPS_API_KEY,
  };

  const query: FindPlaceFromTextRequest = {
    params: {
      input: location,
      inputtype: PlaceInputType.textQuery,
      fields: ["place_id", "name", "formatted_address"],
      ...apiKey,
    },
    timeout: parseInt(<string>process.env.GOOGLE_MAPS_API_TIMEOUT) | 2000, // milliseconds
  };

  try {
    const googlePlaceCandidates: Place | null = await client
      .findPlaceFromText(query)
      .then((response: FindPlaceFromTextResponse) => {
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
        const data: FindPlaceFromTextResponseData = response.data;
        if (data.candidates.length <= 0)
          console.debug(
            `Found ${data.candidates.length} place/s with first one '${data.candidates[0].place_id}' for address '${location}'`
          );
        return head(data.candidates) || null;
      });
    return googlePlaceCandidates;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
