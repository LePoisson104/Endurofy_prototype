import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRefreshMutation } from "../../features/auth/authApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import usePersist from "../../hooks/usePersist";
import { Box } from "@mui/material";
import DotPulse from "../../components/DotPulse";

const PersistLogin = () => {
  const [persist] = usePersist(); // Determines if the user wants to stay logged in
  const token = useSelector(selectCurrentToken); // Get the current token from Redux
  const effectRan = useRef(false); // Handles React Strict Mode
  const navigate = useNavigate(); // For redirecting to login if refresh fails
  const [trueSuccess, setTrueSuccess] = useState(false); // Tracks refresh success

  // Hook for refreshing tokens
  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        console.log("Verifying refresh token...");
        await refresh().unwrap(); // Get the new token
        setTrueSuccess(true); // Mark successful refresh
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    };

    if (
      effectRan.current === true ||
      import.meta.env.VITE_NODE_ENV !== "development"
    ) {
      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true; // Prevent re-runs in React Strict Mode
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, persist, refresh]);

  // Define the rendered content based on state
  let content;
  if (!persist) {
    // If persistence is disabled
    // console.log("Persist disabled, rendering children...");
    content = <Outlet />;
  } else if (isLoading) {
    // If refresh is in progress
    // console.log("Loading, refreshing token...");
    content = (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "white",
        }}
      >
        <DotPulse />
      </Box>
    );
  } else if (isError) {
    // If refresh fails
    // console.log("Refresh token error, redirecting to login...");
    navigate("/login"); // Redirect to login page
  } else if (isSuccess && trueSuccess) {
    // If refresh is successful
    // console.log("Refresh success, rendering children...");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // If token is already present without needing refresh
    // console.log("Token exists and uninitialized, rendering children...");
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
