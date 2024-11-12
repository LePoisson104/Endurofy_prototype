import { Button } from "@mui/material";

const UpdateBtn = ({ mb, isLoading }) => {
  return (
    <Button
      disabled={isLoading}
      sx={{
        textTransform: "none",
        backgroundColor: "#6d76fa",
        color: "white",
        mb: mb,
        "&:hover ": {
          backgroundColor: "#9a9ff1",
        },
      }}
      type="submit"
    >
      Update
    </Button>
  );
};

export default UpdateBtn;
