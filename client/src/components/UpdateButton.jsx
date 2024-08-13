import { Button } from "@mui/material";

const UpdateButton = () => {
  return (
    <Button
      sx={{
        textTransform: "none",
        backgroundColor: "#6d76fa",
        color: "white",
        height: "2.5rem",
        width: "5rem",
        "&:hover": {
          backgroundColor: "#868dfb",
        },
      }}
    >
      Update
    </Button>
  );
};

export default UpdateButton;
