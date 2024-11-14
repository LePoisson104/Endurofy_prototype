import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";
import FitBitLogo from "../images/FitBitLogo.png";
import SamsungGeatFitLogo from "../images/SamsungGearFitLogo.png";
import FitTrack from "../images/FitTrack.png";
import StravaLogo from "../images/StravaLogo.png";
import AppleFitnessLogo from "../images/AppleFitnessLogo.png";

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
          width: "1200px", // Adjust width for the fade effect
          overflow: "hidden",
        }}
      >
        <Marquee speed={50} style={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Box
              component="img"
              src={AppleFitnessLogo}
              sx={{
                width: "170px", // Change to your desired width
                height: "170px", // Change to your desired height
                objectFit: "contain", // Ensures the image scales without distortion
                //   bgcolor: "lightBlue",
              }}
            />
            <Box
              component="img"
              src={SamsungGeatFitLogo}
              sx={{
                width: "200px", // Change to your desired width
                height: "200px", // Change to your desired height
                objectFit: "contain", // Ensures the image scales without distortion
                //   bgcolor: "green",
              }}
            />
            <Box
              component="img"
              src={StravaLogo}
              sx={{
                width: "150px", // Change to your desired width
                height: "150px", // Change to your desired height
                objectFit: "contain", // Ensures the image scales without distortion
                p: 2,
                //   bgcolor: "blue",
              }}
            />
            <Box
              component="img"
              src={FitBitLogo}
              sx={{
                width: "160px", // Change to your desired width
                height: "160px", // Change to your desired height
                objectFit: "contain", // Ensures the image scales without distortion
                //   bgcolor: "blue",
              }}
            />
            <Box
              component="img"
              src={FitTrack}
              sx={{
                width: "200px", // Change to your desired width
                height: "200px", // Change to your desired height
                objectFit: "contain", // Ensures the image scales without distortion
                p: 4,
                //   bgcolor: "lightGreen",
              }}
            />
          </Box>
        </Marquee>
      </Box>
    </Box>
  );
};

export default LogosCarousel;
