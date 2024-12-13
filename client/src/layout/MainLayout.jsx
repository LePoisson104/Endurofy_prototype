import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../pages/global/TopBar";
import SideBar from "../pages/global/SideBar";
import { Box } from "@mui/material";

const MainLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <SideBar isSidebar={isSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Allow the main content to grow and fill remaining space
          transition: "margin-left 0.3s", // Transition for sidebar toggle
        }}
        className="content"
      >
        <TopBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
