export const formatNumber = (input: string | number | undefined) => {
  if (input === undefined || input === null) {
    return '0';
  }

  // Convert input to a number if it's a string
  const numberValue = typeof input === 'string' ? parseFloat(input) : input;

  // Check if the input is a valid number
  if (isNaN(numberValue)) {
    console.error(
      'Invalid input. Please provide a valid number or numeric string.'
    );
    return input;
  }

  // Use Intl.NumberFormat to format the number with commas
  const formattedNumber = new Intl.NumberFormat().format(numberValue);

  return formattedNumber;
};

export const maskString = (text: string) => {
  return '*****' + text.slice(4);
};
