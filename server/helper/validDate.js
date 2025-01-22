const validDate = (date) => {
  const validDate = new Date(date);

  return (
    !isNaN(validDate.getTime()) && validDate.toISOString().slice(0, 10) === date
  );
};

module.exports = { validDate };
