export const getFirstDayOfPreviousMonth = (currentMonth) => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
};

export const getLastDayOfNextMonth = (currentMonth) => {
  return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);
};

export const dateConvert = (date) => {
  return date.toISOString().split("T")[0];
};
