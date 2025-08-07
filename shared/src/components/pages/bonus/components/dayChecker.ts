export const isGreaterToday = (dateString: string): boolean => {
  const dateObject = new Date(dateString);
  const currentDate = new Date();

  return dateObject > currentDate ? true : false;
};