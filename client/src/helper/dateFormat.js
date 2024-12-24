export const dateFormat = (newDate) => {
  const todaysDate = new Date(newDate);
  console.log("todays date", todaysDate);

  const date = todaysDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = todaysDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return { date, time };
};
