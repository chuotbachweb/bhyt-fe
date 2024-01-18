import { Box, FormGroup, TextField, Typography, Button, Divider, Container } from "@mui/material";
//import { Link } from "react-router-dom";
import Title from "../components/Title";
import LoginImage from "../assets/images/login.png";
import { Link } from "react-router-dom";
//import GoogleIcon from "@mui/icons-material/Google";
function ForgotPassword(): JSX.Element {
  return (
    <Box sx={{ width: "100%" }}>
      <Title title="Quên mật khẩu" path="Trang chủ / Quên mật khẩu"></Title>
      <Box sx={{ display: "flex", mt: 5, px: 5 }}>
        <Container>
          <img src={LoginImage} className="App-logo" alt="logo" />
        </Container>
        <Container className="InputField" sx={{ display: "flex", flexDirection: "column", minWidth: "200px" }}>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              textAlign: "center",
              padding: "20px",
            }}
          >
            Quên mật khẩu
          </Typography>
          <FormGroup>
            <TextField
              id="outlined-basic"
              label="Tên đăng nhập"
              variant="outlined"
              sx={{
                textAlign: "center",
                height: "60px",
                borderRadius: "15px",
                my: 1,
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email xác thực"
              //type="password"
              variant="outlined"
              sx={{
                textAlign: "center",
                height: "60px",
                borderRadius: "15px",
                my: 1,
              }}
            />
            <Button
              component={Link}
              //to="/forgot-password/otp"
              to="/change-password"
              variant="outlined"
              sx={{
                backgroundColor: "#FFCF63",
                borderRadius: "10px",
                my: 1,
                height: "2.75em",
                fontSize: "1em",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Xác nhận
            </Button>
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <Divider
                sx={{
                  width: "70%",
                }}
              />
            </Box>
          </FormGroup>
        </Container>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
