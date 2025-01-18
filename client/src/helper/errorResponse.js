export const errorResponse = (err, setErrMsg) => {
  if (!err.status) {
    setErrMsg("No Server Response");
  } else if (err.status === 400) {
    setErrMsg(err.data?.message);
  } else if (err.status === 401) {
    setErrMsg(err.data?.message);
  } else if (err.status === 404) {
    setErrMsg(err.data?.message);
  } else if (err.status === 409) {
    setErrMsg(err.data?.message);
  } else {
    setErrMsg(err.data?.message);
  }
};
