import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./css/welcome.css";

const Welcome = () => {
  return (
    <Container className="main-container" maxWidth="lg">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={8} sm={12}>
          <div className="left-content">
            <h2>Welcome To</h2>
            <h1>Vehicle Guardian</h1>
            <p>
              This app is a comprehensive solution bridging the gap
              <div>between vehicle owners and repair centers,</div>
              streamlining the entire repair and maintenance process
            </p>
          </div>
        </Grid>
        <Grid item lg={4} sm={12}>
          <Card class="new-card">
            <div className="right-content">
              <CardContent className="second-column-cardcontents">
                <h2>Login Options</h2>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  style={{ marginBottom: "10px" }}
                  endIcon={<i className="fab fa-google"></i>}
                >
                  Sign Up using Google
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  style={{ marginBottom: "10px" }}
                  endIcon={<i className="fab fa-facebook"></i>}
                >
                  Sign Up using Facebook
                </Button>
                <h3 class="text-center">OR</h3>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  id="login-options-buttons"
                >
                  Create an Account
                </Button>
                <p>
                  By signing up, you will agree to the
                  <Link href="#" variant="body2">
                    Terms of Services{" "}
                  </Link>
                  and
                  <Link href="#" variant="body2">
                    {" "}
                    Privacy Policy
                  </Link>
                </p>
                <div style={{ marginTop: "20px" }}>
                  Already have an account ?&nbsp;
                  <Link href="#" variant="body2">
                    Login Here
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
