import React from "react";
import { ListItemText, MenuItem } from "@mui/material";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          "http://localhost:8080/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <MenuItem
      onClick={handleLogout}
      sx={{
        [`& .${listItemIconClasses.root}`]: {
          ml: "auto",
          minWidth: 0,
        },
      }}
    >
      <ListItemText>Logout</ListItemText>
      <ListItemIcon>
        <LogoutRoundedIcon fontSize="small" />
      </ListItemIcon>
    </MenuItem>
  );
};

export default LogoutButton;
