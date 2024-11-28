import React from "react";
import InputBase from "@mui/material/InputBase";
import { Box, Typography, Button, Checkbox, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: "40px",
        backgroundColor: "#6d76fa",
        color: "white",
        boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
        position: "relative",
        width: "100%",
        mt: "auto",
        // Define a default height and handle responsiveness
        minHeight: { xs: "auto", md: "30vh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start", // Align items to the top
          flexDirection: { xs: "column", md: "row" }, // Column on small screens
          width: "100%",
          flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens
        }}
      >
        {/* FitTracker Branding and Links Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "70%" }, // Full width on mobile
            mb: { xs: 4, md: 0 }, // Margin bottom on mobile
          }}
        >
          {/* Brand Logo */}
          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Endurofy
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack on extra small screens
              justifyContent: { xs: "center", md: "space-between" }, // Center align on extra small screens
              alignItems: "center",
              width: { xs: "100%", sm: "auto", lg: "60%", xl: "40%" }, // Full width on small screens
              gap: { xs: 2, sm: 0 }, // Spacing on small screens
              mb: 3,
            }}
          >
            {/* Column Links */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                About Us
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                Our Services
              </Link>
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Privacy Policy
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                FAQ
              </Link>
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                News
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                Our Teams
              </Link>
              <Link
                component={RouterLink}
                to="#"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Careers
              </Link>
            </Box>
          </Box>

          {/* Social Media Icons */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center", // Center icons on small screens
              gap: 3,
              width: { xl: "19%", lg: "25%" },
            }}
          >
            <Link
              style={{ color: "white" }}
              href="https://www.facebook.com"
              target="_blank"
            >
              <FacebookOutlinedIcon
                fontSize="large"
                sx={{ "&:hover": { color: "#3b5998" } }}
              />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://www.instagram.com"
              target="_blank"
            >
              <InstagramIcon
                fontSize="large"
                sx={{ "&:hover": { color: "#E1306C" } }}
              />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://x.com"
              target="_blank"
            >
              {" "}
              <TwitterIcon
                fontSize="large"
                sx={{ "&:hover": { color: "#1DA1F2" } }}
              />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://pinterest.com"
              target="_blank"
            >
              {" "}
              <PinterestIcon
                fontSize="large"
                sx={{ "&:hover": { color: "#E60023" } }}
              />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://youtube.com"
              target="_blank"
            >
              {" "}
              <YouTubeIcon
                fontSize="large"
                sx={{ "&:hover": { color: "#FF0000" } }}
              />
            </Link>
          </Box>
        </Box>

        {/* Subscription and Agreement Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: { xs: "100%", md: "30%" }, // Full width on mobile
            padding: "30px",
            boxSizing: "border-box", // Include padding in width calculations
            backgroundColor: {
              xs: "rgba(255, 255, 255, 0.1)",
              md: "transparent",
            }, // Subtle background for mobile
            borderRadius: { xs: "8px", md: "0" }, // Rounded corners for mobile
          }}
        >
          <Typography sx={{ mb: 2 }}>Become a member today!</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{
                paddingLeft: "5px",
                background: "transparent",
                width: { xs: "100%", sm: "70%" },
                mb: { xs: 2, sm: 0 },
                border: "1px solid white",
                color: "white",
                "&::placeholder": {
                  color: "white",
                  opacity: 1,
                },
              }}
              placeholder="Email"
            />
            <Button
              variant="subscribe"
              type="button"
              sx={{
                color: "white",
                border: "1px solid white",
                borderRadius: "0px",
                padding: "5px 15px",
                fontSize: "14px",
                ml: { xs: 0, sm: 2 }, // Margin-left only on small screens
                mt: { xs: 1, sm: 0 }, // Margin-top on extra small screens
                width: { xs: "100%", sm: "auto" }, // Full width on mobile
                boxSizing: "border-box",
              }}
            >
              Subscribe
            </Button>
          </Box>

          {/* Agreement Checkbox */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Checkbox
              sx={{
                color: "white",
                paddingLeft: 0,
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "12px" }}
            >
              By checking this box, you agree that you are at least 18 years of
              age.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom Section */}
      <Box
        sx={{
          mt: { xs: 3, md: 5 }, // Adjust margin top based on screen size
          borderTop: "1px solid rgba(255,255,255,0.2)", // Subtle top border for separation
          paddingTop: "20px", // Spacing between the border and content
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
          © 2024 Endurofy. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
