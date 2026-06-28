import React from "react";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ReusableDrawer = ({
  open,
  onClose,
  title,
  anchor = "right", // left, right, top, bottom
  width = 400,
  children,
}) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        sx={{
          width: anchor === "left" || anchor === "right" ? width : "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Body */}
        <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default ReusableDrawer;
