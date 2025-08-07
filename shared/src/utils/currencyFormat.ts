export function CurrencyFormat(input: number | string = 0): string {
  let num;

  if (typeof input === 'string') {
    // Try to parse the string to an integer
    const parsed = parseInt(input, 10);
    num = isNaN(parsed) ? 0 : parsed; // Default to 0 if parsing fails
  } else {
    num = input;
  }

  if (!isNumber(num)) {
    return '_';
  }

  const formattedNumber = num.toFixed(2);
  return (
    formattedNumber.endsWith('.00')
      ? formattedNumber.slice(0, -3)
      : formattedNumber
  ).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function isNumber(num: any): boolean {
  return typeof num === 'number' && !isNaN(num);
}
