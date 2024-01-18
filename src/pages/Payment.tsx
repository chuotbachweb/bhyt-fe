import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { PaymentFormStyles } from "../styles/payment"
import { usePayment } from "../app/store";
import { Box } from "@mui/system";
import { getUserByEmail } from "../services/userServices";
import { createPaymentRequest } from "../services/insurancePaymentServices";

const Payment: React.FC = () => {
  const payment = usePayment();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState({
    CustomerId: "",
    PolicyId: "",
    Amount: 0,
    Status: true,
    Type: "",
    Note: "",
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Nhập họ tên";
    } else if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(fullName.trim())) {
      newErrors.fullName = "Họ tên không hợp lệ";
    }

    if (!address.trim()) {
      newErrors.address = "Nhập địa chỉ";
    } else if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(address.trim())) {
      newErrors.address = "Địa chỉ không hợp lệ";
    }

    if (!dateOfBirth.trim() || new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Ngày sinh không hợp lệ";
    }

    if (!email.trim()) {
      newErrors.email = "Nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Định dạng không hợp lệ";
    }

    if (!gender) {
      newErrors.gender = "Chọn giới tính";
    }

    if (!phone.trim()) {
      newErrors.phone = "Nhập số điện thoại";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Định dạng không hợp lệ";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const res = await getUserByEmail(email);
      if (res.success) {
        const createPayment = await createPaymentRequest(res.data.customerId, {
          PolicyId: res.data.id,
          Amount: res.data.premiumAmount - res.data.deductibleAmount,
          Status: true,
          Type: "Payment",
          Note: "Payment for insurance policy",
        });

        alert(createPayment.message);
      }
    }
  };

  return (
    <>
      {payment.isOpen && <Box sx={{
        position: 'absolute' as 'absolute',
        top: 0, left: 0, right: 0, paddingBottom: 12,
        backgroundColor: "rgba(0,0,0,.3)",
      }}><Box>
          <Container>
            <PaymentFormStyles>
              <Typography variant="h4">Thông tin thanh toán</Typography>
              <form onSubmit={handlePaymentSubmit}>
                <TextField
                  label="Họ tên"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                />
                <TextField
                  label="Địa chỉ"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                />
                <TextField
                  label="Ngày sinh"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth}
                />
                <FormControl component="fieldset" fullWidth margin="normal" error={Boolean(errors.gender)}>
                  <FormLabel component="legend">Giới tính</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    row
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                    <FormControlLabel value="female" control={<Radio />}
                      label="Nữ" />
                  </RadioGroup>
                  {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                </FormControl>


                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
                <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: 3 }}>
                  <Button type="button" variant="contained" color="error" sx={{ width: "40%" }} onClick={() => payment.onClose()}>
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained" sx={{ width: "40%" }} color="primary" >
                    Thanh toán
                  </Button>
                </Box>
              </form>
            </PaymentFormStyles>
          </Container>
        </Box>
      </Box >}
    </>
  );
};

export default Payment;