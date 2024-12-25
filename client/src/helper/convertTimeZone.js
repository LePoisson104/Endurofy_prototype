export const convertTimeZone = (date) => {
  return new Date(
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
  ).toDateString();
};
