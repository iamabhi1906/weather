export function formatLocalTime(timestamp: number, timezoneOffset: number) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date((timestamp + timezoneOffset) * 1000));
}

export function getGreeting(timestamp: number, timezoneOffset: number) {
  const hour = new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
  if (hour >= 0 && hour < 4) return "Good Night";
  if (hour >= 4 && hour < 6) return "Early Morning";
  if (hour >= 6 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
}
