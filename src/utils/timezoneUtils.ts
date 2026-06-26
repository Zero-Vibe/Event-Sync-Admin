export const transformToUTC = (dateTime: string) => {
  if (!dateTime) return "";
  if (!Date.parse(dateTime)) return dateTime;

  if (!dateTime.endsWith("Z")) {
    return new Date(`${dateTime}Z`).toISOString();
  }
  return new Date(dateTime).toISOString();
};

export const formatFromUTC = (datetime: string) => {
  if (!datetime) return "";

  if (isNaN(Date.parse(datetime))) return "";

  if (datetime.includes("Z")) {
    return datetime.slice(0, datetime.lastIndexOf("Z"));
  }
  return datetime;
};
