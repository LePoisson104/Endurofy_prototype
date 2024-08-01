import { Outlet } from "react-router-dom";
import { useState } from "react";
import TopBar from "../scences/global/TopBar";
import SideBar from "../scences/global/SideBar";
import { Box, useTheme } from "@mui/material";

const MainLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme(); // Using MUI theme if needed

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
