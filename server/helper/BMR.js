const BMR = (gender, birthdate, height, weight) => {
  const weightInKg = Math.round(weight / 2.20462);
  const heightInCM = Math.round(height * 2.54);
  const [year, month, day] = birthdate.split("-");
  const age = new Date().getFullYear() - year;

  if (gender === "Male") {
    return Math.round(10 * weightInKg + 6.25 * heightInCM - 5 * age + 5);
  } else if ((gender = "Female")) {
    return Math.round(10 * weightInKg + 6.25 * heightInCM - 5 * age - 161);
  }
};

module.exports = { BMR };
