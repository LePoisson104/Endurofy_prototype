import { Box } from "@mui/material";
import NavBar from "../components/global/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/global/Footer";

const HomePageLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box>
      <NavBar />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePageLayout;
