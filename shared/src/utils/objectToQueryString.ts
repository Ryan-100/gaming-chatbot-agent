export function objectToQueryString(obj: Record<string, any>): string {
  const queryString = Object.keys(obj)
    .map((key: string) => {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        // Check if the value is a string representation of a date
        if (typeof obj[key] === 'string' && !isNaN(Date.parse(obj[key]))) {
          return `${encodeURIComponent(key)}=${obj[key]}`;
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
        }
      } else {
        return ''; // Skip undefined or null values
      }
    })
    .filter(Boolean) // Filter out empty strings
    .join('&');

  return queryString;
}
