import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../components/global/Header";
import MonthSelect from "../../components/selects/MonthSelect";
import RowRadioButtonsGroup from "../../components/RowRadioButtonGroup";
import FeetSelect from "../../components/selects/FeetSelect";
import InchesSelect from "../../components/selects/InchesSelect";
import { textFieldStyles } from "./TextFieldStyles";

const Profile = () => {
  return (
    <Box m="20px">
      <Header title="Profile and Targets" />
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Profile
        </Typography>
        <Typography fontWeight="light">Last updated on Jul 22, 2024</Typography>
        <Box component="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
              mt: 2,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Gender</Typography>
              <Typography fontWeight="light">
                Nutrient targets can vary based on sex. Update your profile
              </Typography>{" "}
              <Typography fontWeight="light">
                when pregnant or breastfeeding to reconfigure your
              </Typography>
              <Typography fontWeight="light">
                default nutrient targets.
              </Typography>
            </Box>
            <RowRadioButtonsGroup />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Birthday</Typography>
              <Typography fontWeight="light">Age: 21</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MonthSelect />
              <TextField
                label="Day"
                sx={{ ...textFieldStyles, width: "90px" }}
              />

              <TextField label="year" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Height</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FeetSelect />
              <InchesSelect />
              <Typography>or</Typography>
              <TextField
                label="cm"
                sx={{ ...textFieldStyles, width: "90px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Current Weight</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField label="lbs" sx={textFieldStyles} />
              <Typography>or</Typography>
              <TextField label="kg" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">BMI</Typography>
              <Typography fontWeight="light">
                Your BMI can't be edited as it is a
              </Typography>
              <Typography fontWeight="light">
                function of your weight & height
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>27.1</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#6d76fa",
                color: "white",
                "&:hover ": {
                  backgroundColor: "#9a9ff1",
                },
              }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
        <Typography variant="h4" fontWeight="bold">
          Energy Target
        </Typography>
        <Box component="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Custom Energy Target</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField label="kcal" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Weight Goal</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField label="lbs" sx={textFieldStyles} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#6d76fa",
                color: "white",
                "&:hover ": {
                  backgroundColor: "#9a9ff1",
                },
              }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", borderTop: "1px solid #888", mb: 3 }}></Box>
      <Typography variant="h4" fontWeight="bold">
        Macro Targets
      </Typography>
      <Typography>Macro Ratios</Typography>
      <Typography fontWeight="light">
        Macro Ratios divides energy into protein, carbs, and fat. As your weight
      </Typography>
      <Typography fontWeight="light">
        changes, so do your targets to keep your ratios steady.
      </Typography>
      <Box component="form">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#68afac",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Protein
              <Typography variant="h5" sx={{ ml: 3 }}>
                25%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>468 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#66b7cd",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Net Carbs
              <Typography variant="h5" sx={{ ml: 3 }}>
                45%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>842 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#FFCC8A",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              Fat
              <Typography variant="h5" sx={{ ml: 3 }}>
                30%
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 2 }}>562 kcal</Typography>
            <TextField label="%" sx={textFieldStyles} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5">Energy Target</Typography>
            <Typography fontWeight="light">
              Calculated from your Custom Energy Target.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h5">1872 kcal</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", mb: 3, mr: 6 }}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#6d76fa",
              color: "white",
              mb: 5,
              "&:hover ": {
                backgroundColor: "#9a9ff1",
              },
            }}
            type="submit"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
