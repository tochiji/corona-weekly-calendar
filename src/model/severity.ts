export const severity = (count: number) => {
  const c = Math.floor(count / 100);
  if (c == 0) return 0;
  if (c <= 2) return 1;
  if (c <= 4) return 2;
  if (c <= 9) return 3;
  return 4;
};
