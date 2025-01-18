import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { textFieldStyles } from "../../pages/profile/TextFieldStyles";
import { useTheme } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { useAddWaterIntakeMutation } from "../../features/water/waterApiSlice";
import { useUpdateWaterIntakeMutation } from "../../features/water/waterApiSlice";
import ErrorAlert from "../alerts/ErrorAlert";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { errorResponse } from "../../helper/errorResponse";

const AddWaterModal = ({ openModal, setOpenModal, Type, editData }) => {
  const theme = useTheme();
  const { userId } = useAuth();

  const [errMsg, setErrMsg] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const originalValueRef = useRef("");
  const { currentDate, startDate, endDate } = useSelector(
    (state) => state.dateRange
  );
  const [addWaterIntake, { isLoading: isAddWaterLoading }] =
    useAddWaterIntakeMutation();
  const [updateWaterIntake, { isLoading: isEditWaterLoading }] =
    useUpdateWaterIntakeMutation();

  // Update both the state and the ref when editData changes
  useEffect(() => {
    const initialValue = editData?.[0]?.water_amount || "";
    setWaterAmount(initialValue);
    originalValueRef.current = initialValue;
  }, [editData]);

  // Reset to original value when modal is reopened
  useEffect(() => {
    if (openModal && originalValueRef.current) {
      setWaterAmount(originalValueRef.current);
    }
  }, [openModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (waterAmount === "") {
      return setErrMsg("Please enter water amount!");
    }

    let waterPayload;

    waterPayload = {
      waterAmount: waterAmount,
      loggedAt: currentDate,
    };

    try {
      if (Type === "add") {
        await addWaterIntake({
          userId,
          currentDate,
          startDate,
          endDate,
          waterPayload,
        }).unwrap();
      } else if (Type === "edit") {
        await updateWaterIntake({
          userId,
          currentDate,
          startDate,
          endDate,
          waterId: editData?.[0]?.water_id,
          updatePayload: {
            water_amount: Number(waterAmount),
          },
        }).unwrap();
      }

      setOpenModal(false);
    } catch (err) {
      errorResponse(err, setErrMsg);
    }
  };

  return (
    <>
      {errMsg && (
        <ErrorAlert message={errMsg} duration={4000} setErrMsg={setErrMsg} />
      )}
      <Dialog
        component="form"
        onSubmit={handleSubmit} // Bind the form's onSubmit to handleSubmit function
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            width: "350px",
            height: "200px",
            bgcolor: theme.palette.mode === "dark" ? "#101624" : "white",
          },
        }}
      >
        <DialogTitle>
          {Type?.charAt(0).toUpperCase() + Type?.slice(1)} Water
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              value={waterAmount}
              onChange={(e) => {
                const value = e.target.value;
                // Allow 0 and positive numbers
                setWaterAmount(value === "" ? "" : Number(value));
              }}
              required
              label="Fluid Ounce (fl oz)"
              type="number"
              fullWidth
              sx={{ ...textFieldStyles }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{ color: "#6d76fa", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isAddWaterLoading || isEditWaterLoading}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              "&:hover": { backgroundColor: "#868dfb" },
            }}
          >
            {!(isAddWaterLoading || isEditWaterLoading) && Type}
            {(isAddWaterLoading || isEditWaterLoading) && (
              <CircularProgress sx={{ color: "white" }} size={"20px"} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddWaterModal;
