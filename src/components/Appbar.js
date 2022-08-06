import React from "react";
import { AppBar, Toolbar, styled, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import nxtwave from "../images/nxt-wave.png";
import profile from "../images/profile.png";

function Appbar() {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{
                height:"72px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white"
            }}>
                <img src={nxtwave} alt="NXTWAVE" style={{ maxHeight: "70px", maxWidth: "160px" }} />
                <Avatar alt="Profile" src={profile}/>
            </Toolbar>
        </AppBar>
    )
}
export default Appbar;