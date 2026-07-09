import { Coordinates } from "@/types/coordinate";
import axios from "axios";

export const getCoordinates = (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      async () => {
        try {
          const res = await axios.get("https://ipinfo.io/json");
          const [latitude, longitude] = res.data.loc.split(",").map(Number);
          resolve({ latitude: latitude, longitude: longitude });
        } catch (error) {
          if (process.env.NODE_ENV === "development")
            console.error("Failed to fetch coordinates from IP.", error);
          reject(new Error("Unable to fetch coordinates from IP."));
        }
      },
      { timeout: 10000 },
    );
  });
