export const getTodaysDate = () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return currentDate;
};
