export const mockGooglePlaceGeoPosition: any = {
  geometry: {
    location: {
      lat: 53.5,
      lng: 13.5,
    },
    viewport: {
      northeast: {
        lat: 53.7,
        lng: 13.7,
      },
      southwest: {
        lat: 53.3,
        lng: 13.3,
      },
    },
    bounds: {
      northeast: {
        lat: 53.6,
        lng: 13.4,
      },
      southwest: {
        lat: 53.6,
        lng: 13.4,
      },
    },
  },
};

export const mockGooglePlaceGeoPositionWithoutBounds: any = {
  geometry: {
    location: {
      lat: 53.5,
      lng: 13.5,
    },
    viewport: {
      northeast: {
        lat: 53.7,
        lng: 13.7,
      },
      southwest: {
        lat: 53.3,
        lng: 13.3,
      },
    },
  },
};
