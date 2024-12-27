export const toKcal = (value) => {
  const KILOCALORIES = 0.239006;
  return Math.round(value * KILOCALORIES);
};
