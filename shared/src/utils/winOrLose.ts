export function winOrLose(amount: number) {
  if (amount < 0) return 'text-text-error';
  else if (amount > 0) return 'text-text-success';
  else return '';
}
