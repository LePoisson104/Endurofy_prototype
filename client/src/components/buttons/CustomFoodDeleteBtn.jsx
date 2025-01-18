import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteCustomFoodMutation } from "../../features/food/foodApiSlice";
import ErrorAlert from "../alerts/ErrorAlert";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { errorResponse } from "../../helper/errorResponse";

const CustomFoodDeleteBtn = ({ customFoodId, closeModal }) => {
  const { userId } = useAuth();

  const [deleteCustomFood] = useDeleteCustomFoodMutation();
  const [errMsg, setErrMsg] = useState("");

  const handleDeleteCustomFood = async () => {
    try {
      await deleteCustomFood({ userId, customFoodId }).unwrap();
      closeModal(true);
    } catch (err) {
      errorResponse(err, setErrMsg);
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
