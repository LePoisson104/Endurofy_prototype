import { Box } from "@mui/material";
import Marquee from "react-fast-marquee";
import FitBitLogo from "../images/FitBitLogo.png";
import SamsungGeatFitLogo from "../images/SamsungGearFitLogo.png";
import AppleHealth from "../images/AppleHealth.png";
const LogosCarousel = () => {
  return (
    <Box>
      <Marquee>
        <Box
          component="img"
          src={FitBitLogo}
          sx={{
            width: "200px", // Change to your desired width
            height: "200px", // Change to your desired height
            objectFit: "contain", // Ensures the image scales without distortion
          }}
        />
        <Box
          component="img"
          src={SamsungGeatFitLogo}
          sx={{
            width: "200px", // Change to your desired width
            height: "200px", // Change to your desired height
            objectFit: "contain", // Ensures the image scales without distortion
          }}
        />
        <Box
          component="img"
          src={AppleHealth}
          sx={{
            width: "70px", // Change to your desired width
            height: "70px", // Change to your desired height
            objectFit: "contain", // Ensures the image scales without distortion
          }}
        />
      </Marquee>
    </Box>
  );
};

export default LogosCarousel;
