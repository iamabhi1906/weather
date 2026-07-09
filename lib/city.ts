import { CitySearch, CitySearchResult } from "@/types/city-result";

export function cityFallback(city: CitySearch): CitySearchResult {
  return {
    continent: "",
    countryName: city.country,
    countryCode: "",
    principalSubdivision: city.admin1 || "",
    locality: city.name,
    city: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
  };
}
