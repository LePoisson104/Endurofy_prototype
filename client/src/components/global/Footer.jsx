import React from "react";
import InputBase from "@mui/material/InputBase";
import { Box, Typography, Button, Checkbox, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import XIcon from "@mui/icons-material/X";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const FooterLink = ({ title, route }) => {
  return (
    <Link
      component={RouterLink}
      className="footer-link"
      sx={{
        textDecoration: "none",
        color: "white",
      }}
      to={route}
    >
      {title}
    </Link>
  );
};

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        px: { md: "30px", xs: "20px" },
        pt: { md: "50px", xs: "20px" },
        pb: "20px",
        backgroundColor: "#6d76fa",
        color: "white",
        boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start", // Align items to the top
          flexDirection: { lg: "row", md: "column" }, // Column on small screens
          width: "100%",
          flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens
          gap: 3,
          // bgcolor: "yellow",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // width: { xs: "100%", md: "70%" }, // Full width on mobile
            width: "100%",
            // mb: { xs: 4, md: 0 }, // Margin bottom on mobile
            maxWidth: "250px",
          }}
        >
          {/* Brand Logo */}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", md: "2rem" },
              }}
            >
              Endurofy
            </Typography>
          </Box>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            Made with <FavoriteIcon fontSize="small" /> by @LePoisson104
          </Typography>
          {/* Social Media Icons */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
            }}
          >
            <Link
              style={{ color: "white" }}
              href="https://www.instagram.com"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://www.x.com"
              target="_blank"
            >
              <XIcon />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://www.linkedin.com/in/viet-pham-112087214/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>
            <Link
              style={{ color: "white" }}
              href="https://github.com/LePoisson104?tab=overview&from=2024-12-01&to=2024-12-15"
              target="_blank"
            >
              <GitHubIcon />
            </Link>
          </Box>
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            sx={{
              color: "white",
              bgcolor: colors.purpleAccent[300],
              "&:hover": { backgroundColor: colors.purpleAccent[200] },
              fontSize: 18,
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              mb: 3,
              mt: 2,
              width: "200px",
            }}
          >
            Launch Endurofy
          </Button>
        </Box>

        {/* Links */}
        <Box
          sx={{
            // bgcolor: "lightBlue",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: {
              xl: "space-between",
              lg: "space-evenly",
              md: "space-between",
            },
            gap: { md: 0, xs: 3 },
            mr: 3,
          }}
        >
          {/* Company */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontWeight={"bold"} sx={{ fontSize: "15px", mb: 1 }}>
              COMPANY
            </Typography>
            <FooterLink title={"About"} route={"/about"} />
            <FooterLink title={"Our Services"} route={"/features"} />
            <FooterLink title={"Blog"} route={"/blog"} />
            <FooterLink title={"Community"} route={"/community"} />
            <FooterLink title={"Terms of Use"} route={"/terms"} />
            <FooterLink title={"Privacy Policy"} route={"/privacy"} />
          </Box>
          {/* Customer service */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontWeight={"bold"} sx={{ fontSize: "15px", mb: 1 }}>
              CUSTOMER SERVICE
            </Typography>
            <FooterLink title={"My Account"} route={"/account"} />
            <FooterLink title={"Help Center"} route={"/help-center"} />
            <FooterLink title={"FAQs"} route={"/faqs"} />
          </Box>
          {/* More to explore */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontWeight={"bold"} sx={{ fontSize: "15px", mb: 1 }}>
              MORE TO EXPLORE
            </Typography>
            <FooterLink title={"Porfolio"} route={"/porfolio"} />
            <FooterLink title={"Contact Me"} route={"/contact-me"} />
          </Box>
        </Box>
        {/* Subscription and Agreement Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "500px",
            boxSizing: "border-box", // Include padding in width calculations
            backgroundColor: {
              xs: "rgba(255, 255, 255, 0.1)",
              md: "transparent",
            }, // Subtle background for mobile
            borderRadius: { xs: "8px", md: "0" }, // Rounded corners for mobile
            p: { md: 0, xs: "30px" },
          }}
        >
          <Typography sx={{ mb: 2 }}>Subscribe for newsletters</Typography>
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
                pl: 1,
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
              By checking this box, you agree to the terms of service of
              Endurofy
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
          Copyright © 2024 Endurofy. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
