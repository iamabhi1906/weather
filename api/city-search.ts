import { CitySearch } from "@/types/city-result";
import axios from "axios";

export async function getCity(query: string): Promise<CitySearch[]> {
  if (!query) {
    return [];
  }
  const endpoint = process.env.NEXT_PUBLIC_CITY_SEARCH_ENDPOINT;
  if (!endpoint) throw new Error("Api endpoint is not configured");
  try {
    const response = await axios.get(endpoint, {
      params: {
        name: query,
        count: 10,
        language: "en",
        format: "json",
      },
    });
    const cityRawData = response.data;
    const cities = (cityRawData.results || []).map((city: CitySearch) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      admin1: city.admin1 || "",
      admin2: city.admin2 || "",
      latitude: city.latitude,
      longitude: city.longitude,
    }));

    return cities;
  } catch (error) {
    console.error("City API error:", error);
    throw new Error("Error fetching the cities");
  }
}
