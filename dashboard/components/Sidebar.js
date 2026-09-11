import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer 
      variant="permanent" 
      anchor="left"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          backgroundColor: "#f5f7fa",
          borderRight: "1px solid #e0e0e0",
          position: "relative"
        }
      }}
    >
      <List sx={{ width: 220 }}>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Hospitals" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Model Metrics" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Blockchain Logs" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Security Alerts" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;