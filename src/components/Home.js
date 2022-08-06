import React, { useState, useEffect } from "react";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  Tab, Tabs, styled, InputBase, InputAdornment,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getResource } from "../redux/action/resourceAction.js";

const Search = styled("div")({
  backgroundColor: "#EAE7E4",
  padding: "0 10px",
  borderRadius: "5px",
  width: "50%",
  height: "40px"
});
const useStyles = makeStyles(() => ({
  input1: {
    width: 600,
    height: "10px"
  }
}));
function Home(props) {

  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const ResourceReducer = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState("/");
  const [Resources, setResources] = useState([]);
  const [Color, setColor] = useState("");
  useEffect(() => {
    dispatch(getResource())
      .then((res) => {
        // console.log(res.status)
        if (res.status === 200) {
          setResources(res.data)
        } else {
          alert("Couldn't fetch the data")
        }
      })
      .catch((err) => {
        alert(err)
      })
  }, [])
  const handleChange = (event, newValue) => {
    setPage(newValue);
    if (newValue === "/resource_detail") {
    localStorage.setItem("id",1)
      navigate(newValue, {
        state: {
          id: 1
        }
      })
    }
    else {
      navigate(newValue, {
        state: {
          id: null
        }
      })
    }
  }
  return (
    <div style={{
      marginTop: "30px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Tabs
          value={page}
          onChange={handleChange}
          TabIndicatorProps={{
            title: "indicator",
            hidden: true,
            sx: { backgroundColor: "#EAE7E4", height: 4 } //width: "25% !important"
          }}
          sx={{
            "& button": { border: "1px solid black", borderRadius: 0, height: "40px" },
            // "& button:hover": { backgroundColor: "blue", color: "white" },
            "& button:focus": { backgroundColor: "#0B69FF", color: "white" },
            "& button:active": { backgroundColor: "#0B69FF", color: "white" },
            "& button.Mui-selected": { backgroundColor: "#0B69FF", color: "white" }
          }}
          inkBarStyle={{ display: 'none' }}
        >
          {/* sx={{ border:"1px solid black",borderRadius:"2px",backgroundColor: "#EAE7E4"}} */}
          <Tab label="Resources" value="/" />
          <Tab label="Requests" value="/resource_detail" />
          <Tab label="Users" value="/user" />
        </Tabs>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <TextField
          sx={{
            marginLeft: "8%",
          }}
          variant="outlined"
          placeholder="search..."
          InputProps={{
            classes: { input: classes.input1 },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <br />
      <div style={{ marginLeft: "4%", marginRight: "4%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {
          Resources.map((item) => {
            return <div>
              <Card sx={{
                display: 'flex',
                minWidth: "360px",
                minHeight: "192px",
                maxHeight: "192px",
                margin: theme.spacing(2),
                flexDirection: 'column',
                // width: 'fixed',
                maxWidth: "360px"
              }}>
                <CardHeader

                  avatar={<img src={item.icon_url} alt="NXTWAVE" style={{ maxHeight: "44px", maxWidth: "44px" }} />
                  }
                  title={item.title}
                  subheader={item.category}
                />
                <CardContent>
                  <a href="" onClick={() => {
                    localStorage.setItem("id", item.id)
                    navigate("/resource_detail", { state: { id: item.id } })
                  }} style={{ fontSize: "17px", textDecoration: "none", color: "blue" }}>
                    {item.link}
                  </a>
                  <br />
                  <br />
                  <Typography variant="body2" >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          })
        }
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    resourceState: state.ResourceReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);