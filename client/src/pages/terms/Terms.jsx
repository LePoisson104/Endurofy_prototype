import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Terms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 5,
            fontWeight: 600,
            fontSize: { sm: "4rem", xs: "3rem" },
            fontFamily: "Host Grotesk, sans-serif",
            color: "#4a4a4a",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 300,
              fontSize: { md: "2rem", xs: "1.5rem" },
            }}
          >
            Terms of Service
          </Typography>
        </Box>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Effective Date: January 24, 2025
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to Endurofy! By using our services, you agree to these Terms
          and Conditions (“Terms”). Please read them carefully. If you do not
          agree with these Terms, you must not use our app or services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using the Endurofy app (“Service”), you acknowledge
          that you have read, understood, and agree to be bound by these Terms.
          These Terms constitute a legal agreement between you and Endurofy.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Eligibility
        </Typography>
        <Typography variant="body1" paragraph>
          - You must be at least 18 years old to use our Service. Minors may
          only use the Service under the supervision of a parent or legal
          guardian who agrees to these Terms.
        </Typography>
        <Typography variant="body1" paragraph>
          - By using the Service, you represent that all information you provide
          is accurate and truthful.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Use of the Service
        </Typography>
        <Typography variant="body1" paragraph>
          - Endurofy grants you a non-exclusive, non-transferable, revocable
          license to access and use the Service for personal, non-commercial
          purposes.
        </Typography>
        <Typography variant="body1" paragraph>
          - You agree not to:
          <ul>
            <li>Use the Service for any unlawful or fraudulent purpose.</li>
            <li>
              Copy, modify, distribute, or reverse-engineer any part of the
              Service.
            </li>
            <li>
              Violate any applicable local, state, national, or international
              laws.
            </li>
          </ul>
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Account and Security
        </Typography>
        <Typography variant="body1" paragraph>
          - You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account.
        </Typography>
        <Typography variant="body1" paragraph>
          - Notify us immediately if you suspect unauthorized access or misuse
          of your account.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Data and Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          - By using the Service, you agree to the collection and use of your
          personal information as described in our{" "}
          <Link
            to="/privacy"
            style={{
              textDecoration: "none",
              color: colors.purpleAccent[400],
            }}
          >
            Privacy Policy
          </Link>
          .
        </Typography>
        <Typography variant="body1" paragraph>
          - Endurofy integrates with third-party fitness platforms. By linking
          your accounts, you consent to data sharing between the platforms as
          outlined in their respective policies.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Subscription and Payments
        </Typography>
        <Typography variant="body1" paragraph>
          - Some features of Endurofy may require a subscription. Payment terms,
          renewal policies, and cancellation procedures will be clearly outlined
          during the subscription process.
        </Typography>
        <Typography variant="body1" paragraph>
          - You are responsible for any applicable taxes or fees.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Disclaimer of Warranties
        </Typography>
        <Typography variant="body1" paragraph>
          - The Service is provided “AS IS” and “AS AVAILABLE” without any
          warranties, express or implied, including but not limited to
          warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </Typography>
        <Typography variant="body1" paragraph>
          - We do not guarantee that the Service will be error-free, secure, or
          uninterrupted.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the maximum extent permitted by law, Endurofy and its affiliates
          are not liable for any indirect, incidental, consequential, or
          punitive damages arising out of your use of the Service.
        </Typography>

        <Typography variant="h5" gutterBottom>
          9. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          - Endurofy reserves the right to suspend or terminate your access to
          the Service at any time, with or without cause, and without prior
          notice.
        </Typography>
        <Typography variant="body1" paragraph>
          - You may terminate your account at any time by contacting support.
        </Typography>

        <Typography variant="h5" gutterBottom>
          10. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          - We may update these Terms from time to time. We will notify you of
          any significant changes by posting the updated Terms on the app and
          updating the “Effective Date.”
        </Typography>
        <Typography variant="body1" paragraph>
          - Continued use of the Service after changes take effect constitutes
          your acceptance of the updated Terms.
        </Typography>

        <Typography variant="h5" gutterBottom>
          11. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction], without regard to its conflict of law
          principles.
        </Typography>

        <Typography variant="h5" gutterBottom>
          12. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at:
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
          By using Endurofy, you agree to these Terms. Thank you for being a
          part of our community!
        </Typography>
      </Box>
    </Container>
  );
};

export default Terms;
