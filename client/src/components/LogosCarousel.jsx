import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";
import FitBitLogo from "../images/FitBitLogo.png";
import StravaLogo from "../images/StravaLogo.png";
import AppleHealthLogo from "../images/AppleHealth.png";
import SamsungHealthLogo from "../images/SamsungHealthLogo.png";
import GoogleFit from "../images/GoogleFit.png";
import MyFitnessPalLogo from "../images/MyFitnessPalLogo.png";

const LogosCarousel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "1130px", // Adjust width for the fade effect
          // overflow: "hidden",
        }}
      >
        <Marquee speed={50} style={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 12, // Equal gap between logos
            }}
          >
            <Box
              component="img"
              src={AppleHealthLogo}
              sx={{
                width: "70px", // Adjust width
                height: "70px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
              }}
            />
            <Box
              component="img"
              src={SamsungHealthLogo}
              sx={{
                width: "70px", // Adjust width
                height: "70px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
              }}
            />
            <Box
              component="img"
              src={GoogleFit}
              sx={{
                width: "60px", // Adjust width
                height: "60px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
              }}
            />
            <Box
              component="img"
              src={StravaLogo}
              sx={{
                width: "140px", // Adjust width
                height: "140px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
              }}
            />
            <Box
              component="img"
              src={FitBitLogo}
              sx={{
                width: "140px", // Adjust width
                height: "140px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
              }}
            />
            <Box
              component="img"
              src={MyFitnessPalLogo}
              sx={{
                width: "60px", // Adjust width
                height: "60px", // Adjust height
                objectFit: "contain", // Ensures the image scales without distortion
                borderRadius: 2,
              }}
            />
          </Box>
        </Marquee>
      </Box>
    </Box>
  );
};

export default LogosCarousel;
