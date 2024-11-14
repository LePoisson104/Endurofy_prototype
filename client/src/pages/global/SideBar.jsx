import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import useAuth from "../../hooks/useAuth";
import { useGetAllUsersInfoQuery } from "../../features/users/usersApiSlice";

// SidebarItem.js
const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tooltip
      title={
        <Typography sx={{ fontSize: "13px", padding: "5px" }}>
          {title}
        </Typography>
      }
      arrow
      disableHoverListener={!isCollapsed}
    >
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem
          active={selected === title}
          style={{
            color: colors.grey[100],
          }}
          onClick={() => setSelected(title)}
          icon={icon}
          rootStyles={{
            [`.${menuClasses.active}`]: {
              color: "#868dfb",
            },
            [`.${menuClasses.button}`]: {
              "&:hover": {
                [`.${menuClasses.icon}`]: {
                  color: "#868dfb",
                },
                [`.${menuClasses.label}`]: {
                  color: "#868dfb",
                },
              },
            },
          }}
        >
          {!isCollapsed && <Typography>{title}</Typography>}
        </MenuItem>
      </Link>
    </Tooltip>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const sidebarWidth = isCollapsed ? "80px" : "250px"; // Adjust these values as needed
  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersInfoQuery(userId);

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor={`${colors.primary[400]}`}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          position: "fixed",
          width: sidebarWidth,
        },
      }}
    >
      <Menu
        iconShape="square"
        rootStyles={{
          [`.${menuClasses.button}`]: {
            "&:hover": {
              backgroundColor: "transparent",
              color: "#868dfb",
            },
          },
        }}
      >
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          rootStyles={{
            margin: "20px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h2" fontWeight="400">
                <span className="purple-style">Endurofy</span>
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && data && !isLoading && (
          <Box mb="25px">
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {data?.first_name} {data?.last_name}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[400]}>
                {data?.email}
              </Typography>
            </Box>
          </Box>
        )}

        <Box mb={"30px"}>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Diary
          </Typography>
          <Item
            title="Food Diary"
            to="/food"
            icon={<RamenDiningOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Item
            title="Weight Tracker"
            to="/weight"
            icon={<MonitorWeightOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Item
            title="Workout Log"
            to="/workout"
            icon={<FitnessCenterIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Pages
          </Typography>
          <Item
            title="Profile"
            to="/profile"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Item
            title="Settings"
            to="/settings"
            icon={<SettingsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Reports
          </Typography>
          <Item
            title="Report Summary"
            to="/bar"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
