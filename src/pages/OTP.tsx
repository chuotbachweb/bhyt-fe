import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import otp from "../assets/images/otp.png";
import { requestResetPassword, resetPassword } from "../services/forgotServices";
import { useNavigate } from "react-router-dom";

export default function OTP(): JSX.Element {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [codeOtp, setCodeOtp] = useState("");
  const [error, setError] = useState({});
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const fetch = () => {
    requestResetPassword(email)
      .then((res: any) => {
        setUserId(res.data.toString());
        setError("");
        setOtpSent(true);
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.request.status === 404) {
          alert("Invalid email address.");
          setError("Không có email");
          setEmail("");
        }
      });
  };

  const handleResetPassword = () => {
    const data = {
      userId: userId,
      resetCode: codeOtp,
      newPassword: password,
    };
    resetPassword(data)
      .then((res: any) => {
        if (res) {
          alert("Password reset")
          navigate('/login')
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message)
        }
      })
  }

  const handleCheckOTP = () => {
    const newErrors = {};

    if (codeOtp.trim() === '') {
      newErrors.codeOtp = 'OTP is required';
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 8 || !/[A-Z]/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters with at least one uppercase letter';
    }

    if (rePassword.trim() === '') {
      newErrors.rePassword = 'Please re-enter your password';
    } else if (password !== rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleResetPassword()
    }
  }

  const isEmailValid = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmail = () => {
    if (email.trim() === "") {
      setError({ email: "Email is required" })
    } else if (!isEmailValid(email)) {
      setError({ email: "Incorrect format" })
    } else {
      fetch()
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
      }}
    >
      <img src={otp} alt="otp-image" />
      <Box width={450} sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          Xác thực OTP
        </Typography>
        {otpSent ? (
          <>
            <Typography sx={{ my: 2, fontSize: "1rem" }}>Nhập mã xác nhận đã được gửi đến email của bạn</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="OTP"
                type="password"
                value={codeOtp || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : "", // Set border color to red if there's an error
                }}
                name="otp"
                onChange={(e) => setCodeOtp(e.target.value)}
                error={Boolean(error.codeOtp)}
                helperText={error.codeOtp} />

              <TextField
                id="outlined-basic"
                label="Mật khẩu"
                type="password"
                value={password || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : "", // Set border color to red if there's an error
                }}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(error.password)}
                helperText={error.password}
              />
              <TextField
                id="outlined-basic"
                label="Nhập lại mật khẩu"
                type="password"
                value={rePassword || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : "", // Set border color to red if there's an error
                }}
                name="rePassword"
                onChange={(e) => setRePassword(e.target.value)}
                error={Boolean(error.rePassword)}
                helperText={error.rePassword}
              />
              <Button
                sx={{
                  backgroundColor: "#FFCF63",
                }}
                onClick={handleCheckOTP}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ my: 2, fontSize: "1rem" }}>
              Chúng tôi sẽ gửi mã xác nhận đến địa chỉ email của bạn
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                value={email || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : ""
                }}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error.email)}
                helperText={error.email} />
              <Button
                sx={{
                  backgroundColor: "#FFCF63",
                }}
                onClick={handleEmail}
              >
                Lấy OTP
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
