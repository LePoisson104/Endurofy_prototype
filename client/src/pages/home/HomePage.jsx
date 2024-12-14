import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import MuiSwitch from "../../components/switches/MuiSwitch";
import LogosCarousel from "../../components/LogosCarousel";
import GetStartedBtn from "../../components/buttons/GetStartedBtn";
import FAQAccordion from "../../components/accordion/FAQAccordion";
import DashboardDark from "../../images/DashboardDark.png";
import DashboardLight from "../../images/DashboardLight.png";
import { useState } from "react";

const HomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [checked, setChecked] = useState(false);
  console.log(checked);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 20px",
          gap: 1,
          overflow: "hidden",
          animation: "fadeIn 1s ease-out", // Add animation here
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { sm: "3.5rem", xs: "2.5rem" },
            whiteSpace: "pre-line",
            p: 0,
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
          }}
        >
          Strengthen Your Endurance, {"\n"}Enhance Your Life
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            mb: 4,
            maxWidth: "600px",
            fontFamily: "Host Grotesk, sans-serif",
          }}
          paragraph
        >
          Your all-in-one fitness app to log your food, workouts, and weight,
          designed to help you stay on track with your health and fitness goals.
        </Typography>
        <GetStartedBtn />
        <MuiSwitch checked={checked} onChange={handleSwitchChange} />

        {checked ? (
          <Box
            component="img"
            src={DashboardDark}
            sx={{
              width: "100%", // Make the width responsive
              maxWidth: "1000px", // Max width to prevent it from becoming too large
              mt: 3,
              borderRadius: 3,
              border: `1px solid ${colors.grey[900]}`,
            }}
          />
        ) : (
          <Box
            component="img"
            src={DashboardLight}
            sx={{
              width: "100%", // Make the width responsive
              maxWidth: "1000px", // Max width to prevent it from becoming too large
              mt: 3,
              borderRadius: 3,
              border: `1px solid ${colors.grey[900]}`,
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            width: { sm: "100%", xs: "300px" },
            textAlign: "center",
          }}
        >
          <Typography
            color="#696969"
            fontWeight={500}
            variant="h6"
            sx={{
              m: 0,
              p: 0,
              flexShrink: 0,
              display: "inline",
            }}
          >
            Endurofy is compatible with leading{" "}
          </Typography>
          <Typography
            color="#696969"
            fontWeight={500}
            variant="h6"
            sx={{
              m: 0,
              p: 0,
              flexShrink: 0,
              ml: { sm: 0.5 },
              display: "inline",
            }}
          >
            fitness platforms.
          </Typography>
        </Box>
        <LogosCarousel />
      </Box>
      {/*  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "white",
          p: { md: 10, xs: 4 },
        }}
      ></Box>
      {/* FAQ */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: { md: 10, xs: 4 },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors.purpleAccent[400] }}
        >
          FAQs
        </Typography>
        <Typography
          sx={{
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
            fontWeight: "bold",
            fontSize: { md: "2rem", xs: "1.5rem" },
            mb: 3,
          }}
        >
          Your questions, answered
        </Typography>
        <Stack spacing={1}>
          <FAQAccordion
            question={"What is Endurofy?"}
            answer={`Endurofy is a comprehensive fitness app designed to help you track your food intake, weight, and workouts.
            Making it easier to stay on top of your health and fitness goals.`}
          />
          <FAQAccordion
            question={"How do I get started with Endurofy?"}
            answer={`Simply create an account using your valid email address. Endurofy will send you a verification code to verify your email. 
              Once you log in to your account, you can set up your profile by entering details like your fitness goals, weight, and preferred workout
              routines. Start logging your workouts and meals to track your progress!`}
          />
          <FAQAccordion
            question={
              "Can I connect my Endurofy account with other fitness apps?"
            }
            answer={`Yes! Endurofy is compatible with popular fitness platforms such as Fitbit and Apple Health, 
            allowing you to sync your data and track your progress seamlessly.`}
          />
          <FAQAccordion
            question={"Is Endurofy free?"}
            answer={`Absolutely! Endurofy is 100% free to use, so you can start tracking your fitness journey without any costs. We believe everyone should 
              have access to the tools they need to stay healthy and achieve their goals!`}
          />
          <FAQAccordion
            question={
              "How can I contact support if I have issues with the app?"
            }
            answer={`If you encounter any issues, you can contact our support team through the app's help section or email us directly at 
              <a href="mailto:support@endurofy.com">support@endurofy.com</a>. We're happy to assist you!`}
          />
        </Stack>
      </Box>
      {/* Try for free */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "white",
          p: { md: 10, xs: 4 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
            fontWeight: "bold",
            fontSize: { md: "2rem", xs: "1.5rem" },
          }}
          gutterBottom
        >
          Try Endurofy for free today
        </Typography>
        <Typography
          color="#696969"
          fontWeight={500}
          variant="h6"
          sx={{
            m: 0,
            p: 0,
            flexShrink: 0,
            display: "inline",
          }}
        >
          Start your fitness journey with Endurofy and take{" "}
        </Typography>
        <Typography
          color="#696969"
          fontWeight={500}
          variant="h6"
          sx={{
            m: 0,
            p: 0,
            flexShrink: 0,
            ml: { sm: 0.5 },
            display: "inline",
            mb: 3,
          }}
        >
          the first step toward a stronger, healthier you!
        </Typography>
        <GetStartedBtn />
      </Box>
    </Box>
  );
};

export default HomePage;
