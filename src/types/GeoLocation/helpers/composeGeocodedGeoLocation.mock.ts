import { GeoAdministrativeHierarchy } from "../GeoLocation";

export const mockGeonamesHierarchy: GeoAdministrativeHierarchy = {
  place: {
    geonameId: 10000,
    name: "Geonames Building",
    code: "FRM",
    class: "P",
    wikidataId: "Q10000",
  },
  community: {
    geonameId: 20000,
    name: "Geonames Village",
    wikidataId: "Q20000",
  },
  municipality: {
    geonameId: 30000,
    name: "Geonames Municipality",
    zip: "12345",
    wikidataId: "Q30000",
  },
  county: { geonameId: 40000, name: "Geonames County" },
  state: { geonameId: 50000, name: "Geonames State", ISO3166: "MV" },
  country: { geonameId: 60000, name: "Geonames Country", ISO3166: "DE" },
};

export const mockGooglePlaceHierarchy: GeoAdministrativeHierarchy = {
  place: {
    geonameId: null,
    name: "Google Building",
    code: null,
    class: null,
    wikidataId: "Q1000",
  },
  community: { geonameId: null, name: "Google Village", wikidataId: "Q20000" },
  municipality: {
    geonameId: null,
    name: "My Municipality",
    zip: "12345",
    wikidataId: "Q30000",
  },
  county: { geonameId: null, name: "Google County" },
  state: { geonameId: null, name: "Google State", ISO3166: "MV" },
  country: { geonameId: null, name: "Google Country", ISO3166: "DE" },
};

export const mockGooglePlace: any = {
  address_components: [
    {
      long_name: "22",
      short_name: "22",
      types: ["street_number"],
    },
    {
      long_name: "Groß Bünzow",
      short_name: "Groß Bünzow",
      types: ["route"],
    },
    {
      long_name: "Groß Bünzow",
      short_name: "Groß Bünzow",
      types: ["sublocality_level_1", "sublocality", "political"],
    },
    {
      long_name: "Klein Bünzow",
      short_name: "Klein Bünzow",
      types: ["locality", "political"],
    },
    {
      long_name: "Landkreis Vorpommern-Greifswald",
      short_name: "Landkreis Vorpommern-Greifswald",
      types: ["administrative_area_level_3", "political"],
    },
    {
      long_name: "Mecklenburg-Vorpommern",
      short_name: "MV",
      types: ["administrative_area_level_1", "political"],
    },
    {
      long_name: "Deutschland",
      short_name: "DE",
      types: ["country", "political"],
    },
    {
      long_name: "17390",
      short_name: "17390",
      types: ["postal_code"],
    },
  ],
  adr_address:
    '<span class="street-address">Groß Bünzow 22</span>, <span class="postal-code">17390</span> <span class="locality">Klein Bünzow</span>, <span class="country-name">Deutschland</span>',
  business_status: "OPERATIONAL",
  formatted_address: "Groß Bünzow 22, 17390 Klein Bünzow, Deutschland",
  formatted_phone_number: "039724 22493",
  geometry: {
    location: {
      lat: 53.9338705,
      lng: 13.659294,
    },
    viewport: {
      northeast: {
        lat: 53.9350579802915,
        lng: 13.6607429302915,
      },
      southwest: {
        lat: 53.9323600197085,
        lng: 13.6580449697085,
      },
    },
  },
  icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/worship_general-71.png",
  icon_background_color: "#7B9EB0",
  icon_mask_base_uri:
    "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
  international_phone_number: "+49 39724 22493",
  name: "Kirche Groß Bünzow",
  photos: [
    {
      height: 900,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/114712674300708522453">Joern Kraft</a>',
      ],
      photo_reference:
        "AeJbb3dvLcBOpURc-om82kFVIYjyA_A1yP2jhTe43FrEEXV8_oKnWe16Hq732VGlK9cD0H1ntF1k8HmHroQAEPcWkRHNH1IUCYi_BlI5HehaU8VxOGOLGoLAefydyq7rMocv5UgPbokOIxKBZKcT8EAM25fWS13APJejedHi5k9yMZNNKz1r",
      width: 1600,
    },
    {
      height: 900,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/114712674300708522453">Joern Kraft</a>',
      ],
      photo_reference:
        "AeJbb3e5f5cG57rA05dIjhhYyTfubsDK3qmOhbHE94pvcYcKe2pO4MztmwMtRBHSs4nD81jq1PZ0gZ0dOYONi6iZ__fP6ErzIOFWEk9ITx-xKfKW4Nw1-HrEd3hFUsyAy72a1INVBNlO6Vg037yq-IQLmeByTwL7yHKJw_Whfz-BRbCuEpz3",
      width: 1600,
    },
    {
      height: 644,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/114712674300708522453">Joern Kraft</a>',
      ],
      photo_reference:
        "AeJbb3fjGPX33whXPZFc2-vOmCwSJKNiuzht7ALI2oqBmz-Yq61EwRoxSgQ1D02ov5d69qLgSIMQC-Tbk0uEHLn9o_wh49a-zz32QSNVHRFTHEc70Z8NVlDT04qzWJo3xbauueWgdAHxaz2ifXDGTmQJXpLNme05Roxq5r5E_adqz3xsK0ya",
      width: 1376,
    },
  ],
  place_id: "ChIJDZyVbduoq0cRTG58egpV2l0",
  plus_code: {
    compound_code: "WMM5+GP Klein Bünzow, Deutschland",
    global_code: "9F5MWMM5+GP",
  },
  rating: 5,
  reference: "ChIJDZyVbduoq0cRTG58egpV2l0",
  reviews: [
    {
      author_name: "Madlen Schätzchen",
      author_url:
        "https://www.google.com/maps/contrib/101879252549096076332/reviews",
      profile_photo_url:
        "https://lh3.googleusercontent.com/a/AItbvmmzXxECAQ2aL9V8qpQ2PFnZloX0JDvs7S7oPI8R=s128-c0x00000000-cc-rp-mo",
      rating: 5,
      relative_time_description: "vor 3 Jahren",
      text: "",
      time: 1567239965,
      translated: false,
    },
  ],
  types: ["church", "place_of_worship", "point_of_interest", "establishment"],
  url: "https://maps.google.com/?cid=6762811293943230028",
  user_ratings_total: 1,
  utc_offset: 120,
  vicinity: "Groß Bünzow 22, Klein Bünzow",
};
