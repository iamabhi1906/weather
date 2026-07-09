import { CitySearchResult } from "@/types/city-result";
import { Coordinates } from "@/types/coordinate";
import axios from "axios";

export const fetchCityInfo = async (
  props: Coordinates,
): Promise<CitySearchResult> => {
  const response = await axios.get(
    "https://api-bdc.io/data/reverse-geocode-client",
    {
      params: {
        latitude: props.latitude,
        longitude: props.longitude,
        localityLanguage: "en",
      },
    },
  );

  const data = response.data;

  return {
    continent: data.continent,
    countryName: data.countryName,
    countryCode: data.countryCode,
    principalSubdivision: data.principalSubdivision,
    locality: data.locality,
    city: data.city || data.locality,
    latitude: data.latitude,
    longitude: data.longitude,
  };
};
