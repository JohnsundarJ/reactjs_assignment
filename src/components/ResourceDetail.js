import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, styled, Avatar, IconButton,
  InputAdornment,
  TextField,
  Typography,
  CardHeader,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getResourceDetail } from "../redux/action/resourceDetailAction.js";
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { makeStyles } from "@mui/styles";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});
const useStyles = makeStyles(() => ({
  input1: {
    width: 400,
    height: "10px"
  }
}));
const myTheme = createTheme({
  components: {
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          height: "fitContent",
        }
      }
    }
  }
})

function ResourceDetail(props) {

  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const id = state.id;
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [resourceDetail, setResourceDetail] = useState();

  const [Checked, setChecked] = useState(true);
  let [count, setCount] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let id_value;
    if (localStorage.getItem("id") === null)
      id_value = 1;
    else
      id_value = localStorage.getItem("id");
    dispatch(getResourceDetail(id_value))
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          setResourceDetail(res.data)
          setFlag(true);
        } else {
          alert("Couldn't fetch the data")
        }
      })
      .catch((err) => {
        alert(err)
      })
    
  }, []);
  const handleCheck = (val) => {
    if (val.target.checked === true)
      setCount(++count);
    else
      setCount(--count)
    if (count <= 0)
      setChecked(true)
    else {
      setChecked(false);
    }
  }
  const columns = [
    {
      name: "id",
      options: {
        customBodyRender: (data, index) => {
          return (
            <input type="checkbox" onChange={(val) => {
              handleCheck(val)
            }}></input>
          );
        }
      }
    },
    {
      name: "title",
      label: "TITLE",
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (data, index) => {
          return (
            <p > {data.substring(0, 35)}...</p>
          );
        }
      }
    },
    {
      name: "link",
      label: "LINK",
      options: {
        customBodyRender: (data, index) => {
          return (
            <a href={data} style={{ textDecoration: "none" }} > {data}</a>
          );
        }
      }
    }
  ]
  const options = {
    selectableRows: "none",
    responsive: 'standard',
    download: false,
    sort: false,
    rowsPerPage: 6,
    filter: false,
    rowsPerPageOptions: [6],
    viewColumns: false,
    delete: false,
    print: false,
    jumpToPage: false,
    search: false
  };
  return (
    <div style={{ marginLeft: "10%", marginTop: "2%", marginBottom: "15px", marginRight: "10%" }}>
      <IconButton onClick={() => { navigate("/") }}>
        <ArrowBackIosIcon sx={{ color: "grey" }} />
        <p style={{ fontSize: "12px" }}>Resources</p>
      </IconButton>
      {flag === false ? (<div>loading</div>) : (
        <div>
          <CardHeader
            avatar={<img src={resourceDetail.icon_url} alt="NXTWAVE" style={{ borderRadius: "60%", maxHeight: "60px", maxWidth: "60px" }} />}
            title={<p style={{ fontSize: "20px", fontWeight: "bold" }}>{resourceDetail.title}</p>}
            subheader={<div style={{ marginTop: "0px" }}><p>2345</p>
              <a href={resourceDetail.link} style={{ textDecoration: "none" }} > {resourceDetail.link}</a>
            </div>}
          />
          <p style={{ color: "grey", fontSize: "18px" }}>{resourceDetail.description}</p>
        </div>
      )}
      <Button variant="contained">Update</Button>
      <br></br>
      <br></br>
      {flag === false ? (<div></div>) : (
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={myTheme}>
            <MUIDataTable
              title={<div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <h3>Items</h3>
                <TextField
                  sx={{
                    marginLeft: "15%",
                    marginTop: "2%"
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
                <div style={{ display: "flex", flexDirection: "row", marginLeft: "5px" }}>
                  <IconButton onClick={(val) => { handleClick(val) }}>
                    <SortIcon sx={{ color: "black" }} />
                    <p style={{ fontSize: "15px" }}>Sort</p>
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      "color": "grey"
                    }}
                  >
                    <MenuItem onClick={handleClose}>Recently Added</MenuItem>
                    <MenuItem onClick={handleClose}>Ascending</MenuItem>
                    <MenuItem onClick={handleClose}>Descending</MenuItem>
                  </Menu>
                </div>
              </div>}
              data={resourceDetail.resource_items}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </CacheProvider>
      )
      }
       <div style={{ marginTop: "10px",marginBottom: "10px" }}>
          <Button variant="contained" sx={{
          "& button:hover": { backgroundColor: "green" },
          "& button:active": { backgroundColor:"green"},
            backgroundColor: "green", marginLeft: "10px"
        }}
        disabled={Checked ? false: true}
          onClick={() => navigate("/user", {
          state: {
              id:resourceDetail.id
            }
          })}>Add Item</Button>
        <Button variant="contained" disabled={Checked} sx={{backgroundColor:"red",color:"white", marginLeft:"10px",}}  >Delete</Button>
        </div>
    </div>
  )
};
const mapStateToProps = (state) => {
  return {
    resourceDetailRedcuer: state.ResourceDetailReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);