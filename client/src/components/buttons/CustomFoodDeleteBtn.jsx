import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteCustomFoodMutation } from "../../features/food/foodApiSlice";
import ErrorAlert from "../alerts/ErrorAlert";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const CustomFoodDeleteBtn = ({ customFoodId, closeModal }) => {
  const { userId } = useAuth();

  const [deleteCustomFood] = useDeleteCustomFoodMutation();
  const [errMsg, setErrMsg] = useState("");

  const handleDeleteCustomFood = async () => {
    try {
      await deleteCustomFood({ userId, customFoodId }).unwrap();
      closeModal(true);
    } catch (err) {
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
    }
  };

  return (
    <>
      {errMsg && (
        <ErrorAlert message={errMsg} duration={4000} setErrMsg={setErrMsg} />
      )}
      <IconButton onClick={handleDeleteCustomFood}>
        <DeleteOutlineIcon sx={{ color: "#F56565" }} />
      </IconButton>
    </>
  );
};

export default CustomFoodDeleteBtn;
