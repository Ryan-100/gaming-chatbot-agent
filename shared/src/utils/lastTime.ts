export function getLastTime(updatedAt: string): string {
  const updatedAtDate = new Date(updatedAt);
  const now = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = now.getTime() - updatedAtDate.getTime();
  const differenceInSeconds = Math.floor(differenceInMs / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec`;
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} min`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} hr`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 7) {
    return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''}`;
  }

  const differenceInWeeks = Math.floor(differenceInDays / 7);
  if (differenceInWeeks < 4) {
    return `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''}`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} month${differenceInMonths > 1 ? 's' : ''}`;
  }

  const differenceInYears = Math.floor(differenceInDays / 365);
  return `${differenceInYears} year${differenceInYears > 1 ? 's' : ''}`;
}
