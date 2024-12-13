const getWeightLogs = async (req, res) => {
  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.statusCode(statusCode).json({ message: err.message });
  }
};

const addWeightLog = async (req, res) => {
  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.statusCode(statusCode).json({ message: err.message });
  }
};

const updateWeightLog = async (req, res) => {
  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.statusCode(statusCode).json({ message: err.message });
  }
};

const deleteWeightLog = async (req, res) => {
  try {
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.statusCode(statusCode).json({ message: err.message });
  }
};

module.exports = {
  getWeightLogs,
  addWeightLog,
  updateWeightLog,
  deleteWeightLog,
};
