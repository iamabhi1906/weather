export function getWeatherVideo(weatherId: number, icon: string) {
  const isNight = icon.endsWith("n");

  if (weatherId >= 200 && weatherId <= 232) return "thunderstorm.mp4";

  if (weatherId >= 300 && weatherId <= 321) return "drizzle.mp4";

  if (weatherId >= 500 && weatherId <= 504) return "drizzle.mp4";

  if (weatherId === 511) return "snow.mp4";

  if (weatherId >= 520 && weatherId <= 531) return "thunderstorm.mp4";

  if (weatherId >= 600 && weatherId <= 622) return "snow.mp4";

  switch (weatherId) {
    case 701:
      return "cloudy.mp4";

    case 711:
      return "smoke.mp4";

    case 721:
      return "smoke.mp4";

    case 731:
    case 761:
      return "smoke.mp4";

    case 741:
      return "cloudy.mp4";

    case 751:
      return "smoke.mp4";

    case 762:
      return "ash.mp4";

    case 771:
      return "windy.mp4";

    case 781:
      return "tornado.mp4";
  }

  if (weatherId === 800) return isNight ? "clear_night.mp4" : "clear_day.mp4";

  if (weatherId === 801)
    return isNight ? "clear_night.mp4" : "cloudy.mp4";

  if (weatherId === 802) return "cloudy.mp4";

  if (weatherId === 803) return "broken_clouds.mp4";

  if (weatherId === 804) return "cloudy.mp4";

  return isNight ? "clear_night.mp4" : "clear_day.mp4";
}
