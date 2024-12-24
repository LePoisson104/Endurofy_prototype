export const countStreaks = (dates) => {
  if (!dates) return;

  // Ensure dates are unique and sorted in ascending order
  const sortedDates = [
    ...new Set(
      dates.map(
        (date) => new Date(date?.logged_date).toISOString().split("T")[0]
      )
    ),
  ].sort();

  if (sortedDates.length === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  let streak = 0;
  let currentDate = today;
  let dateIndex = sortedDates.length - 1;

  // Start from today and work backwards
  while (dateIndex >= 0) {
    const loggedDate = sortedDates[dateIndex];

    // If current date matches logged date
    if (currentDate === loggedDate) {
      streak++;
      dateIndex--;
    }

    // Move to previous day
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    currentDate = prevDate.toISOString().split("T")[0];

    // Break if we find a gap
    if (
      currentDate !== loggedDate &&
      dateIndex >= 0 &&
      sortedDates[dateIndex] > currentDate
    ) {
      break;
    }
  }

  return streak;
};
