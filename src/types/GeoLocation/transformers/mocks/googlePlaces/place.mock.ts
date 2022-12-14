export const mockGooglePlaceByPlace: any = {
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

export const mockGooglePlaceByPlaceWithCommunityEqualsMunicipality: any = {
  address_components: [
    {
      long_name: "6",
      short_name: "6",
      types: ["street_number"],
    },
    {
      long_name: "Hauptstraße",
      short_name: "Hauptstraße",
      types: ["route"],
    },
    {
      long_name: "Zirchow",
      short_name: "Zirchow",
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
      long_name: "17419",
      short_name: "17419",
      types: ["postal_code"],
    },
  ],
  adr_address:
    '<span class="street-address">Hauptstraße 6</span>, <span class="postal-code">17419</span> <span class="locality">Zirchow</span>, <span class="country-name">Deutschland</span>',
  business_status: "OPERATIONAL",
  current_opening_hours: {},
  formatted_address: "Hauptstraße 6, 17419 Zirchow, Deutschland",
  formatted_phone_number: "038378 28162",
  geometry: {
    location: {
      lat: 53.88987899999999,
      lng: 14.1385964,
    },
    viewport: {
      northeast: {
        lat: 53.89119598029149,
        lng: 14.1400431302915,
      },
      southwest: {
        lat: 53.88849801970849,
        lng: 14.1373451697085,
      },
    },
  },
  icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/worship_general-71.png",
  icon_background_color: "#7B9EB0",
  icon_mask_base_uri:
    "https://maps.gstatic.com/mapfiles/place_api/icons/v2/worship_christian_pinlet",
  international_phone_number: "+49 38378 28162",
  name: "St. Jakobus-Kirche Zirchow",
  opening_hours: {},
  photos: [],
  place_id: "ChIJgwfcrrhZqkcR51MA48UNaYg",
  plus_code: {
    compound_code: "V4QQ+XC Zirchow, Deutschland",
    global_code: "9F5PV4QQ+XC",
  },
  rating: 4.1,
  reference: "ChIJgwfcrrhZqkcR51MA48UNaYg",
  reviews: [],
  types: ["church", "place_of_worship", "point_of_interest", "establishment"],
  url: "https://maps.google.com/?cid=9829402805280986087",
  user_ratings_total: 9,
  utc_offset: 120,
  vicinity: "Hauptstraße 6, Zirchow",
  website: "http://pfarramt-ahlbeck-zirchow.de/",
};
