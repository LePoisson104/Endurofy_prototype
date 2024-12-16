import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Privacy = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container maxWidth="md" sx={{ py: 7 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 5,
            fontSize: { sm: "4rem", xs: "3rem" },
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontWeight: 300,
              fontSize: { md: "2rem", xs: "1.5rem" },
            }}
          >
            Privacy Policy
          </Typography>
        </Box>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Effective Date: January 24, 2025
        </Typography>

        <Typography variant="body1" paragraph>
          Your privacy is important to us at Endurofy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you use our services. By using our app, you agree to the
          practices described in this policy.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          - **Personal Information:** We may collect your name, email address,
          phone number, and other identifiable details when you sign up or use
          our services.
        </Typography>
        <Typography variant="body1" paragraph>
          - **Usage Data:** We collect information about your interactions with
          the app, including log data, device information, and location data.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          - To provide, maintain, and improve our services.
        </Typography>
        <Typography variant="body1" paragraph>
          - To communicate with you, including responding to inquiries and
          sending updates or promotional content.
        </Typography>
        <Typography variant="body1" paragraph>
          - To ensure security, prevent fraud, and comply with legal
          obligations.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          - We do not sell your personal information. However, we may share your
          data with trusted third-party services to provide and improve our
          offerings.
        </Typography>
        <Typography variant="body1" paragraph>
          - Information may also be shared when required by law or to protect
          our rights and property.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          - We implement reasonable measures to safeguard your data. However, no
          method of transmission or storage is completely secure, and we cannot
          guarantee absolute security.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Third-Party Links
        </Typography>
        <Typography variant="body1" paragraph>
          - Our app may contain links to third-party websites. We are not
          responsible for the privacy practices of these sites, and we encourage
          you to review their policies.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Children’s Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          - Our services are not intended for children under 13. We do not
          knowingly collect personal information from children under 13.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          - We may update this Privacy Policy from time to time. Changes will be
          posted in the app, and the “Effective Date” will be updated.
        </Typography>
        <Typography variant="body1" paragraph>
          - Continued use of the service after changes take effect constitutes
          your acceptance of the updated policy.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email:{" "}
          <Link
            to="mailto:support@endurofy.com"
            style={{ textDecoration: "none", color: colors.purpleAccent[400] }}
          >
            support@endurofy.com
          </Link>
          <br />
          Address: [Insert Company Address]
        </Typography>

        <Typography variant="body1" paragraph>
          By using Endurofy, you acknowledge and agree to this Privacy Policy.
          Thank you for trusting us with your information.
        </Typography>
      </Box>
    </Container>
  );
};

export default Privacy;
