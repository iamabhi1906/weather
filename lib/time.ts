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
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}
