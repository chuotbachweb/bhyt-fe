import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Typography, Button, Box, Toolbar, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../assets/images/logo.png";
import { useStore } from "../app/store";
import AuthService from "../services/authServices";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { setAccount, setToken, account } = useStore((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    setAccount(null);
    setToken(null);
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#C6B09F" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to="/">
            <Button
              TouchRippleProps={{ style: { color: "white" } }}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "whitesmoke",
                },
              }}
            >
              <img src={logo} className="App-logo" alt="logo" height={50} />
            </Button>
          </Link>
          <Typography variant="h6">Bảo Hiểm Y Tế</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button color="inherit">Trang chủ</Button>
          <Button color="inherit">Đăng ký bảo hiểm</Button>
          <Button color="inherit">Thông tin</Button>
          {account ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>{account.username}</MenuItem>
                <MenuItem onClick={() => handleNavigate("/payment-requests")}>Yêu cầu thanh toán</MenuItem>

                <MenuItem onClick={() => handleNavigate("/employee/list-requirement")}>Yêu cầu bảo hiểm</MenuItem>

                <MenuItem onClick={() => handleNavigate("/employee/list-approved-policy")}>
                  Chính sách phát hành
                </MenuItem>

                <MenuItem onClick={() => handleNavigate("/employee/list-payment-request")}>
                  Thanhh toán của khách hàng
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/employee/list-customer")}>Danh sách khách hàng</MenuItem>

                <Divider />
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              TouchRippleProps={{ style: { color: "white" } }}
              sx={{
                background: "gold",
                "&:hover": {
                  backgroundColor: "gold",
                },
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
