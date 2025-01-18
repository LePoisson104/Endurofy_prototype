const passwordRegex = (password) => {
  const passwordPattern = /^[A-Za-z\d@$!%*?&]{10,}$/;

  return passwordPattern.test(password);
};

module.exports = { passwordRegex };
